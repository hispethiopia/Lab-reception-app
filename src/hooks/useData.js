import {
    useDataQuery,
    useDataEngine
} from '@dhis2/app-runtime'

import {
    SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST,
    SPECIMEN_ID_DATA_ELEMENT_IN_RESULT,
    EVENT_APPROVED_DATA_ELEMENT
} from '../helper/constants'


const makeIdIndexed = (objs, fieldName) => {
    objs.forEach(obj => {
        objs[obj[fieldName]] = obj
    });
}

const teiQuery = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        fields: "*",
        params: x => x
    }
}

const eventQuery = {
    events: {
        resource: 'events',
        params: x => x
    }
}

const extractEventParams = ({
    selectedOrgUnit = "",
    ouMode = "SELECTED",
    selectedProgram = "",
    selectedStage = "",
    selectedDuration
}) => {
    const params = {
        paging: "false",
        orgUnit: selectedOrgUnit,
        ouMode: ouMode,
        programStage: selectedStage,
        program: selectedProgram,
        lastUpdatedDuration: selectedDuration + 'd'
    }

    return params
}

const extractTeiParams = ({
    selectedOrgUnit = "",
    ouMode = "SELECTED",
    selectedProgram = "",
    includeAllAttributes = "true",
    selectedDuration
}) => {
    const params = {
        paging: "false",
        ou: selectedOrgUnit,
        ouMode: ouMode,
        program: selectedProgram,
        lastUpdatedDuration: selectedDuration + 'd',
        includeAllAttributes: includeAllAttributes
    }

    return params

}

const getEvents = (params, allDataElements) => {
    var engine = useDataQuery;
    var eventParams = extractEventParams(params)
    eventParams.fields = "programStage,trackedEntityInstance,event,orgUnit,completedDate,status,dataValues[dataElement,value]"

    const {
        loading,
        error,
        data
    } = engine(eventQuery, {
        variables: eventParams
    })

    if (error) {
        console.log(`Fetching events error: `, error)
    }

    if (data) {
        makeIdIndexed(data.events.events, "event");
        data.events.events.forEach(event => {
            event.dataValues.forEach(dataValue => {
                event.dataValues[dataValue.dataElement] = dataValue.value
            })
        })
    }


    return {
        loading,
        error,
        data: data && data.events.events
    }
}

const getTeis = (params, allDataElements) => {
    var engine = useDataQuery;

    var teiParams = extractTeiParams(params)
    teiParams.fields = "trackedEntityInstance,attributes[attribute,value]"

    const {
        loading,
        error,
        data
    } = engine(teiQuery, {
        variables: teiParams
    })



    if (error) {
        console.log(`Fetching TEIS error: `, error)
    }


    if (data) {
        makeIdIndexed(data.trackedEntityInstances.trackedEntityInstances, "trackedEntityInstances");
        data.trackedEntityInstances.trackedEntityInstances.forEach(tei => {
            tei.attributes.forEach(attribute => {
                tei.attributes[attribute.attribute] = attribute.value
            })
        });
    }
    return {
        loading,
        error,
        data: data && data.trackedEntityInstances.trackedEntityInstances
    }
}

const mapTeiWithEvents = (teis, events) => {
    var remappedValue = []
    teis.forEach(tei => {
        var eventsInTei = events.filter(event => {
            return event.trackedEntityInstance === tei.trackedEntityInstance
        })
        if (eventsInTei.length === 0) {
            remappedValue.push({
                trackedEntityInstance: {
                    ...tei
                },
                event: null
            })
        } else {
            eventsInTei.forEach(validEvent => {
                remappedValue.push({
                    trackedEntityInstance: {
                        ...tei
                    },
                    event: {
                        ...validEvent
                    }
                })
            })
        }
    })
    return remappedValue
}

const mapTeiWithResultAndRequest = ({
    teis,
    requests,
    results
}) => {
    //First map and get all the requests.
    let remappedValue = mapTeiWithEvents(teis, requests)

    
    //filter only the approved events and set a new field in the event called receivedResult.
    let approvedReqeusts = remappedValue.filter(request => {
        if(request.event && request.event.dataValues && request.event.dataValues[EVENT_APPROVED_DATA_ELEMENT]){
            //this means that the reqeust is an approved request, we can now look for a result for it.
            results.forEach(result =>{
                if(result.trackedEntityInstance === request.event.trackedEntityInstance && 
                    result.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_RESULT]=== request.event.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST]){
                        //This means that this specific event has a result inserted into it. so add received result field in it.
                        request.event.receivedResult = true;
                        request.resultEvent=result
                    }
            })
            if(!request.event.receivedResult){
                //This means result hasn't been received on the event.
                request.event.receivedResult=false;
            }
            return true;
        }else{
            return false;
        }
    })
    return approvedReqeusts
}

export {
    getEvents,
    getTeis,
    mapTeiWithEvents,
    mapTeiWithResultAndRequest
}