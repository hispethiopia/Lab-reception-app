import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedProgram: '',
    selectedOrgUnit: '',
    selectedStage: '',
    selectedLabSite: '',
    selectedDuration: '1',
    viewData: false

}

const selectedDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_ORG_UNIT:
            return {
                ...state,
                selectedOrgUnit: action.selectedOrgUnit,
                viewData: false
            };
        case actionTypes.SELECTED_PROGRAM:
            return {
                ...state,
                selectedProgram: action.selectedProgram
            };
        case actionTypes.SELECTED_STAGE:
            return {
                ...state,
                selectedStage: action.selectedStage
            };
        case actionTypes.SELECTED_LAB_SITE:
            return {
                ...state,
                selectedLaboratory: action.selectedLaboratory
            };
        case actionTypes.DURATION:
            return {
                ...state,
                selectedDuration: action.selectedDuration
            };
        case actionTypes.VIEW_DATA:
            return {
                ...state,
                viewData: action.viewData
            };
        default:
            return state;
    }
}

export default selectedDataReducer