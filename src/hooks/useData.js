import {
    useDataQuery,
    useDataEngine
} from '@dhis2/app-runtime'


const makeIdIndexed = (objs, fieldName) => {
    objs.forEach(obj => {
        obj[obj[fieldName]] = obj
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
    eventParams.fields = "trackedEntityInstance,event,dataValues[dataElement,value]"

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
        data.events.events.forEach(event=>{
            event.dataValues.forEach(dataValue=>{
                event.dataValues[dataValue.dataElement]=dataValue.value
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
            tei.attributes.forEach(attribute=>{
                tei.attributes[attribute.attribute]=attribute.value
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
        var eventsInTei = events.filter(event=>{
            return event.trackedEntityInstance === tei.trackedEntityInstance
        })
        if(eventsInTei.length===0){
            remappedValue.push({trackedEntityInstance:{...tei},event:null})
        }else{
            eventsInTei.forEach(validEvent=>{
                remappedValue.push({trackedEntityInstance:{...tei},event:{...validEvent}})
            })
        }
    })
    return remappedValue
}


export {
    getEvents,
    getTeis,
    mapTeiWithEvents
}