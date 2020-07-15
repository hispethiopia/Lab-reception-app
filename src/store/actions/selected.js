import * as actionTypes from './actionTypes'

export const onSelectOrgUnit = (orgUnit) =>{
    return {
        type: actionTypes.SELECTED_ORG_UNIT,
        selectedOrgUnit: orgUnit,
        viewData: false
    }
}

export const onSelectProgram = (prgrm) =>{
    return {
        type: actionTypes.SELECTED_PROGRAM,
        selectedProgram: prgrm
    }
}

export const onSelectStage = (stg) =>{
    return {
        type: actionTypes.SELECTED_STAGE,
        selectedStage: stg
    }
}

export const onSelectLabSite = (labSite) =>{
    return {
        type: actionTypes.SELECTED_LAB_SITE,
        selectedLaboratory: labSite
    }
}

export const onSelectDuration = (duration) =>{
    return {
        type: actionTypes.DURATION,
        selectedDuration: duration
    }
}

export const onSelectViewData = (viewData) =>{
    return {
        type: actionTypes.VIEW_DATA,
        viewData: viewData
    }
}