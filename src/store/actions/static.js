import * as actionTypes from './actionTypes'

export const setPrograms = (progs) =>{
    return {
        type: actionTypes.PROGRAMS,
        programs: progs
    }
}
export const setStages = (stgs) =>{
    return {
        type: actionTypes.STAGES,
        stages: stgs
    }
}
export const setOptionSets = (optionSts) =>{
    return {
        type: actionTypes.OPTION_SETS,
        optionSets: optionSts
    }
}

export const setDataElements = (dataElements) =>{
    return {
        type: actionTypes.DATA_ELEMENTS,
        dataElements: dataElements
    }
}