import {
    useDataMutation
} from '@dhis2/app-runtime'

import {
    DATA_STORE_KEY,
    EVENT_APPROVED_DATA_ELEMENT,
    EVENT_TIME_APPROVED_DATA_ELEMENT,
    LAB_APPROVED_AT_DATA_ELEMENT
} from '../helper/constants'

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