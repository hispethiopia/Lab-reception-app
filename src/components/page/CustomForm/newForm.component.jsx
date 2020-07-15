import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {connect} from 'react-redux'

import CustomForm from './CustomForm.component'
import { getAllEvents } from '../../../hooks/useData'

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
        selectedProgram: props.selectedProgram,
        selectedStage: props.selectedStage,
        ouMode: "SELECTED"
    }
    const { loading, error, data } = getAllEvents(vars,props.dataElements)
    console.log(loading, error, data)

    return (
        <>
            {
                loading &&
                <span>Loading</span>
            }
            {
                error &&
                <span>Error</span>
            }
            {
                data &&
                <CustomForm allEvents={data}></CustomForm>
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