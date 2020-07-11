import {
    useDataQuery
} from '@dhis2/app-runtime'

const PROGRAMS= "programs"
const PROGRAM_STAGES = "programStages"
const OPTION_SETS = "optionSets"

const trackedAttributeQuery = {
    trackedEntityAttributes: {
        resource: 'trackedEntityAttributes',
    }
}

const stagesQuery={
    programStages:{
        resource: 'programStages',
        params:{
            fields:'id,displayName,program[id]',
            paging:'false'
        }
    }
}

const optionsQuery ={
    optionSets:{
        resource: 'optionSets',
        params:{
            fields: 'id,displayName,code,options[id,displayName]',
            paging: 'false',
        }
    }
}

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,name,programStages[id,displayName],programTrackedEntityAttributes[id,searchable,displayName]',
            paging: 'false'
        }
    }
}

const useMetadata = (dataToFetch) => {
    let query = {};
    console.log(dataToFetch)
    const engine = useDataQuery;
    switch (dataToFetch){
        case PROGRAMS:{
            query = programQuery
            break;
        }
        case PROGRAM_STAGES:{
            query = stagesQuery
            break;
        }
        case OPTION_SETS:{
            query = optionsQuery
            break;
        }
    }
    const {loading,  error, data } = engine(query)
    if (error) {
        console.log(`Fetching ${dataToFetch} error: `, error)
    }
    if(data){
        console.log("data is ",data,"dataToFetch is ",dataToFetch,"query is ",query)
        makeIdIndexed(data[dataToFetch][dataToFetch])
        if(dataToFetch===OPTION_SETS){
            data[dataToFetch][dataToFetch].map(optionSet=>{makeIdIndexed(optionSet.options)})
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
    OPTION_SETS
}