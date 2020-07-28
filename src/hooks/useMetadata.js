import {
    useDataQuery
} from '@dhis2/app-runtime'
import {
    LAB_REQUEST_STAGE_ID,
    LAB_RESULT_STAGE_ID
} from '../helper/constants'

const PROGRAMS = "programs"
const PROGRAM_STAGES = "programStages"
const OPTION_SETS = "optionSets"
const DATA_ELEMENTS = 'dataElements'
const ME = 'me'

const meQuery = {
    me: {
        resource: 'me'
    }
}

const trackedAttributeQuery = {
    trackedEntityAttributes: {
        resource: 'trackedEntityAttributes',
    }
}

const stagesQuery = {
    programStages: {
        resource: 'programStages',
        params: {
            fields: 'id,displayName,program[id],programStageDataElements[dataElement[id,code,displayName,valueType]],access[data[write]]',
            paging: 'false'
        }
    }
}

const optionsQuery = {
    optionSets: {
        resource: 'optionSets',
        params: {
            fields: 'id,displayName,code,options[id,code,displayName]',
            paging: 'false',
        }
    }
}

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,name,programStages[id,displayName,programStageDataElements[compulsory,dataElement[id,code,displayName,valueType]]],programTrackedEntityAttributes[mandatory,id,searchable,displayName,*,trackedEntityAttribute[id,code,displayName]]',
            paging: 'false'
        }
    }
}

const dataElementQuery = {
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: 'id,displayName,code',
            paging: false
        }
    }
}

const useMetadata = (dataToFetch) => {
    let query = {};
    const engine = useDataQuery;
    switch (dataToFetch) {
        case PROGRAMS: {
            query = programQuery
            break;
        }
        case PROGRAM_STAGES: {
            query = stagesQuery
            break;
        }
        case OPTION_SETS: {
            query = optionsQuery
            break;
        }
        case DATA_ELEMENTS: {
            query = dataElementQuery
            break;
        }
        case ME: {
            query = meQuery
            break;
        }
    }
    const {
        loading,
        error,
        data
    } = engine(query)
    if (error) {
        console.log(`Fetching ${dataToFetch} error: `, error)
    }
    if (data) {
        if (dataToFetch !== ME) { //if fething is me don't do anything
            makeIdIndexed(data[dataToFetch][dataToFetch])
            if (dataToFetch === OPTION_SETS) {
                data[dataToFetch][dataToFetch].map(optionSet => {
                    makeIdIndexed(optionSet.options)
                })
            }
            if (dataToFetch === PROGRAMS) {
                data[dataToFetch][dataToFetch].map(program => {
                    makeIdIndexed(program.programStages)
                    program.programStages.map(stage => {
                        stage.programStageDataElements.forEach(dataStageElement => {
                            stage.programStageDataElements[dataStageElement.dataElement.id] = dataStageElement.dataElement
                        })
                    })

                })
            }
        }else{
            return {
                loading,
                error,
                data: data && data[dataToFetch]
            }
        }
    }
    return {
        loading,
        error,
        data: data && data[dataToFetch][dataToFetch]
    }
}

const makeIdIndexed = objs => {
    objs.forEach(obj => {
        objs[obj.id] = obj
    });
}


export {
    useMetadata,
    PROGRAMS,
    PROGRAM_STAGES,
    OPTION_SETS,
    DATA_ELEMENTS,
    ME
}