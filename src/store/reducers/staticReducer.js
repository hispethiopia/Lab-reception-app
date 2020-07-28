import * as actionTypes from '../actions/actionTypes';

const initialState = {
    programs: null,
    labSites: null,
    stages: null,
    dataElements: null,
    me: null
}

const staticDataReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PROGRAMS:
            return {
                ...state,
                programs: action.programs
            };
        case actionTypes.STAGES:
            return {
                ...state,
                stages: action.stages
            };
        case actionTypes.OPTION_SETS:
            return {
                ...state,
                optionSets: action.optionSets
            };
        case actionTypes.DATA_ELEMENTS:
            return {
                ...state,
                dataElements: action.dataElements
            };
        case actionTypes.LAB_RESULTS_OPTION_SET:
            return {
                ...state,
                labResultsOptionSet: action.labResultsOptionSet
            };
        case actionTypes.ME_VARIABLE:
            return {
                ...state,
                meVariable: action.meVariable
            };

        default:
            return state
    }
}

export default staticDataReducer