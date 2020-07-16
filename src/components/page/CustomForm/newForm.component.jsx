import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {connect} from 'react-redux'

import CustomForm from './CustomForm.component'
import { getEvents, getTeis, mapTeiWithEvents } from '../../../hooks/useData'

const teiQuery = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: x => x
    }
}

const NewForm = (props) => {
    const vars = {
        selectedOrgUnit: props.selectedOrgUnit.id,
        selectedDuration: props.selectedDuration,
        selectedProgram: props.selectedProgram.id,
        selectedStage: props.selectedStage.id,
        ouMode: "SELECTED"
    } 
    var remappedTeis =null;
    const { loading, error, data } = getTeis(vars,props.dataElements)
    const { loading:eventLoading, error:eventError, data:events } = getEvents(vars,props.dataElements)
    
    if(events && data){
        remappedTeis=mapTeiWithEvents(data,events)
    }

    return (
        <>
            {
                (loading || eventLoading) &&
                <span>Loading</span>
            }
            {
                error &&
                <span>Error</span>
            }
            {
                remappedTeis &&
                <CustomForm allEvents={remappedTeis}></CustomForm>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)