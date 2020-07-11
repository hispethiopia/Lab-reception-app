import {
    useDataQuery
} from '@dhis2/app-runtime'

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
        },
        paging:"false"
    }
}

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,name,programStages[id,displayName],programTrackedEntityAttributes[id,searchable,displayName]',
            paging: 'false'
        },
        paging: "false"
    }
}

const useMetadata = (dataToFetch) => {
    let query = {};
    const engine = useDataQuery;
    switch (dataToFetch){
        case "programs":{
            query = programQuery
            break;
        }
        case "programStages":{
            query = stagesQuery
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
    useMetadata
}