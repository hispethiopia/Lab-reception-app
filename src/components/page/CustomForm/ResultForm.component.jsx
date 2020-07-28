import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {connect} from 'react-redux'

import CustomForm from './CustomForm.component'
import { getEvents, getTeis, mapTeiWithResultAndRequest } from '../../../hooks/useData'
import {onAllEventsChagned} from '../../../store/actions'
import { LAB_REQUEST_STAGE_ID, LAB_RESULT_STAGE_ID } from '../../../helper/constants'

const teiQuery = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: x => x
    }
}

const ResultForm = (props) => {
    const teiVars = {
        selectedOrgUnit: props.selectedOrgUnit.id,
        selectedDuration: props.selectedDuration,
        selectedProgram: props.selectedProgram.id,
        ouMode: "SELECTED"
    }
    const requestVars = {
        selectedOrgUnit: props.selectedOrgUnit.id,
        selectedDuration: props.selectedDuration,
        selectedProgram: props.selectedProgram.id,
        selectedStage: LAB_REQUEST_STAGE_ID,
        ouMode: "SELECTED"
    }
    
    const resultVars = {
        selectedOrgUnit: props.selectedOrgUnit.id,
        selectedDuration: props.selectedDuration,
        selectedProgram: props.selectedProgram.id,
        selectedStage: LAB_RESULT_STAGE_ID,
        ouMode: "SELECTED"
    }
    const { loading: loadingTeis, error: teisError, data: teis } = getTeis(teiVars)
    const { loading:loadingRequests, error:requestsError, data:requests } = getEvents(requestVars)
    const { loading:loadingResults, error:resultsError, data:results } = getEvents(resultVars)


    if(results && teis && requests){
        var allEvents=mapTeiWithResultAndRequest({teis:teis,requests:requests,results:results})
        props.setAllEvents(allEvents)

    }

    return (
        <>
            {
                (loadingTeis || loadingRequests || loadingResults) &&
                <span>Loading</span>
            }
            {
                (teisError || requestsError || resultsError) &&
                <span>Error</span>
            }
            {
                results && requests && teis &&
                <CustomForm />
            }
        </>
    )

}
const mapStateToProps = state => {
    return {
        selectedOrgUnit: state.selectedDataReducer.selectedOrgUnit,
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
        selectedDuration: state.selectedDataReducer.selectedDuration,
        
        dataElements: state.staticDataReducer.dataElements
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllEvents: (allEvents) => dispatch(onAllEventsChagned(allEvents))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm)