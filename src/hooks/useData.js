import {
    useDataQuery,
    useDataEngine
} from '@dhis2/app-runtime'

const teiQuery = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        fields: "attributes,orgUnit,trackedEntityInstance,enrollments[*,events[*]]",
        params: x => x
    }
}

const minimizeParams = ({
    selectedOrgUnit = "",
    ouMode = "ALL",
    programStatus = "",
    includeAllAttributes="true",
    lastUpdatedDuration
}) => {
    const params = {
        ou: selectedOrgUnit,
        ouMode: ouMode,
        programStatus: programStatus,
        lastUpdatedDuration: lastUpdatedDuration,
        includeAllAttributes: includeAllAttributes
    }

    return params

}

const getAllEvents = (params, allDataElements) => {
    var engine = useDataQuery;

    var vars = minimizeParams(params)
    vars.fields = "attributes[code,value,displayName,valueType],orgUnit,trackedEntityInstance,enrollments[*,events[event,dataValues[*],programStage,trackedEntityInstance]]"
    teiQuery.trackedEntityInstances.vars = vars
    const {
        loading,
        error,
        data
    } = engine(teiQuery, {
        variables: vars
    })
    if (error) {
        console.log(`Fetching TEIS error: `, error)
    }
    if (data) {
        //now that we have ALL TEIs, extract the events.
        var allEvents = []
        data.trackedEntityInstances.trackedEntityInstances.forEach(tei => {
            //map the attribute values with the attributes, code.
            tei.attributes.forEach(attribute=>{
                tei.attributes[attribute.code] = attribute.value
            })

            tei.enrollments.forEach(enrollment => {
                enrollment.events.forEach(event => {
                    //here now we have all the events, so filter the events that are not of the selected program.
                    if (event.programStage === params.selectedStage.id) {
                        event.dataValues.forEach(dataValue=>{
                            event[allDataElements[dataValue.dataElement].code]=dataValue.value
                        })
                        allEvents.push({
                            ...tei.attributes,
                            ...event
                        })
                    }
                })
            })
        });
    }

    return {
        loading,
        error,
        data: data && allEvents
    }
}

export {
    getAllEvents
}