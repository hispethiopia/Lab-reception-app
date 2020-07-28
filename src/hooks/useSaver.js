import {
    useDataMutation
} from '@dhis2/app-runtime'

import {
    DATA_STORE_KEY,
    EVENT_APPROVED_DATA_ELEMENT,
    EVENT_TIME_APPROVED_DATA_ELEMENT,
    LAB_APPROVED_AT_DATA_ELEMENT,
    LAB_RESULT_STAGE_ID,
    ReqeustToResultMapping,
    DATE_OF_TEST_RESULT_DATA_ELEMENT_IN_RESULT,
    TESTING_LAB_DATA_ELEMENT_IN_RESULT,
    TIME_OF_TEST_RESULT_DATA_ELEMENT_IN_RESULT,
    TEST_RESULT_DATA_ELEMENT
} from '../helper/constants'

const resultEventMutationQuery={
    resource: 'events',
    type:'create'
}

const dataStoreMutationQuery = {
    resource: 'dataStore/' + DATA_STORE_KEY,
    type: 'create'
}

const eventMutationQuery = {
    resource: 'events',
    type: 'update'
}

export const saveSpecimenIdInDataStore = (specimenId = "TestKey", onComplete, onError, callback) => {
    var newQuery = {
        ...dataStoreMutationQuery
    }
    newQuery.resource = newQuery.resource + "/" + specimenId
    newQuery.data = {} //just send an empty object because it can't be null.
    return useDataMutation(newQuery, {
        onComplete: () => {
            console.log("Finished saving specimenID, continuing to Event");
            callback(this);
            onComplete(this)
        },
        onError: onError
    });
}

export const saveResultEvent = ({
    requestToSaveTo,
    selectedProgram,
    selectedLaboratory,
    resultToSave,
    onEventSaveSuccess,
    onEventSaveError
}) => {
    var data = {
        orgUnit: requestToSaveTo.event.orgUnit,
        program: selectedProgram.id,
        programStage: LAB_RESULT_STAGE_ID,
        status: "COMPLETED",
        eventDate: (new Date()).toISOString().substr(0,10),
        trackedEntityInstance: requestToSaveTo.trackedEntityInstance.trackedEntityInstance,
        dataValues: []
    }
    let requestDataValues = requestToSaveTo.event.dataValues

    data.dataValues.push({
        dataElement: ReqeustToResultMapping.specimenId.res,
        value: requestDataValues[ReqeustToResultMapping.specimenId.req]
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.dateOfSpecimenCollection.res,
        value: requestDataValues[ReqeustToResultMapping.dateOfSpecimenCollection.req].substr(0, 10)
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.timeOfSpecimenCollection.res,
        value: requestDataValues[ReqeustToResultMapping.timeOfSpecimenCollection.req].substr(11, 5)
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.tpeOfTest.res,
        value: requestDataValues[ReqeustToResultMapping.tpeOfTest.req]
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.typeOfSpecimen.res,
        value: requestDataValues[ReqeustToResultMapping.typeOfSpecimen.req]
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.dateOfSpecimenSubmission.res,
        value: requestDataValues[ReqeustToResultMapping.dateOfSpecimenSubmission.req].substr(0, 10)
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.timeOfSpecimenSubmission.res,
        value: requestDataValues[ReqeustToResultMapping.timeOfSpecimenSubmission.req].substr(11, 5)
    })

    data.dataValues.push({
        dataElement: ReqeustToResultMapping.reasonForTesting.res,
        value: requestDataValues[ReqeustToResultMapping.reasonForTesting.req]
    })
    
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.locationOfSpecimenCollection.res,
        value: requestDataValues[ReqeustToResultMapping.locationOfSpecimenCollection.req]
    })
    data.dataValues.push({
        dataElement: ReqeustToResultMapping.specificLocationOfSpecimenCollection.res,
        value: requestDataValues[ReqeustToResultMapping.specificLocationOfSpecimenCollection.req]
    })

    data.dataValues.push({
        dataElement: ReqeustToResultMapping.patientClassification.res,
        value: requestDataValues[ReqeustToResultMapping.patientClassification.req]
    })

    data.dataValues.push({
        dataElement: DATE_OF_TEST_RESULT_DATA_ELEMENT_IN_RESULT,
        value: (new Date().toISOString()).substr(0, 10)
    })
    data.dataValues.push({
        dataElement: TIME_OF_TEST_RESULT_DATA_ELEMENT_IN_RESULT,
        value: (new Date().toISOString()).substr(11, 5)
    })

    data.dataValues.push({
        dataElement: TESTING_LAB_DATA_ELEMENT_IN_RESULT,
        value: selectedLaboratory
    })


    data.dataValues.push({
        dataElement: TEST_RESULT_DATA_ELEMENT,
        value: resultToSave
    })

    var resultEventMutation = {
        ...resultEventMutationQuery
    }
    resultEventMutation.data=data
    return useDataMutation(resultEventMutation,{
        onComplete: (event)=>{onEventSaveSuccess(event,data)},
        onError: onEventSaveError
    })
}

export const approveEventOnServer = ({
    eventToApprove,
    selectedProgram,
    selectedStage,
    selectedLaboratory,
    onEventSaveSuccess,
    onEventSaveError
}) => {
    var data = {
        event: eventToApprove.event.event,
        orgUnit: eventToApprove.event.orgUnit,
        program: selectedProgram,
        programStage: selectedStage,
        status: eventToApprove.event.status,
        //completedDate: eventToApprove.event.completedDate,
        trackedEntityInstance: eventToApprove.trackedEntityInstance.trackedEntityInstance,

        dataValues: [
            ...eventToApprove.event.dataValues.filter(dataValue => {
                return dataValue.dataElement !== EVENT_APPROVED_DATA_ELEMENT &&
                    dataValue.dataElement !== EVENT_TIME_APPROVED_DATA_ELEMENT &&
                    dataValue.dataElement !== LAB_APPROVED_AT_DATA_ELEMENT
            }),
            {
                dataElement: EVENT_APPROVED_DATA_ELEMENT,
                value: "true"
            },
            {
                dataElement: EVENT_TIME_APPROVED_DATA_ELEMENT,
                //2020-07-16T11:11
                value: (new Date()).toISOString().substr(0, 16) //this removes the millisecond part
            }, {
                dataElement: LAB_APPROVED_AT_DATA_ELEMENT,
                value: selectedLaboratory.code
            }
        ]
    }

    var eventMutation = {
        ...eventMutationQuery
    }
    eventMutation.resource = eventMutation.resource + "/" + data.event //+"/"+EVENT_APPROVED_DATA_ELEMENT
    eventMutation.data = data
    return useDataMutation(eventMutation, {
        onComplete: onEventSaveSuccess,
        onError: onEventSaveError
    })
}