import {
    useDataEngine,
    useDataQuery
} from '@dhis2/app-runtime'

const trackedAttributeQuery = {
    trackedEntityAttributes: {
        resource: 'trackedEntityAttributes',
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

const useMetadata = () => {
    const engine = useDataQuery;
    const {
        loading,
        error,
        data
    } = engine(programQuery)

    if (error) {
        console.log("useMetadata error: ", error)
    }
    data ? makeIdIndexed(data.programs.programs) : null

    console.log("data ", data && data.programs)

    return {
        loading,
        error,
        programs: data && data.programs.programs
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