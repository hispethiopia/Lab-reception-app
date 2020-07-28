import React from 'react'
import { connect } from 'react-redux'

import { TableCell, TableRow, Button, SingleSelectOption, SingleSelectField } from "@dhis2/ui"
import { EVENT_APPROVED_DATA_ELEMENT, FIRST_NAME, MIDDLE_NAME, LAST_NAME, PHONE_NUMBER, SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST, TEST_RESULT_DATA_ELEMENT } from '../../../helper/constants'


const VIEW_DETAILS_MSG = "View details"
const APPROVE_MSG = "Approve"
const APPROVED_MSG = "Approved"




const ResultApproveField = (props) => {
    console.log("Result event in result approved",props.event,props.event.resultEvent)
    return (
        < TableRow key={(props.event.trackedEntityInstance.trackedEntityInstance + (props.event.event !== null ? props.event.event.event : ""))} >
            <TableCell>
                {props.event.trackedEntityInstance.attributes[FIRST_NAME]}
            </TableCell>
            <TableCell>
                {props.event.trackedEntityInstance.attributes[MIDDLE_NAME]}
            </TableCell>

            <TableCell>
                {props.event.trackedEntityInstance.attributes[LAST_NAME]}
            </TableCell>

            <TableCell>
                {props.event.trackedEntityInstance.attributes[PHONE_NUMBER]}
            </TableCell>

            <TableCell>
                {props.event.event && props.event.event.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST]}
            </TableCell>
            <TableCell>
                <Button
                    name="View details"
                    value="default"
                    type="button"
                    onClick={
                        () => props.handleDetailsClick(props.event)
                    } >
                    {VIEW_DETAILS_MSG}
                </Button>
            </TableCell>
            <TableCell>
                <SingleSelectField
                    className="content"
                    filterable
                    onChange={(e)=>props.handleResultChange(e,props.event)}
                    selected={props.event.resultEvent&&props.event.resultEvent.dataValues[TEST_RESULT_DATA_ELEMENT]}
                    disabled={props.event.event.receivedResult}>
                    {
                        props.labResultsOptionSet.options.map(result => {
                            return (
                                <SingleSelectOption
                                    label={result.displayName}
                                    value={result.displayName}
                                    key={result.displayName}
                                />
                            )
                        })
                    }
                </SingleSelectField>
            </TableCell>
        </TableRow>
    )
}
const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
        selectedLaboratory: state.selectedDataReducer.selectedLaboratory,
        allEvents: state.selectedDataReducer.allEvents,

        labResultsOptionSet: state.staticDataReducer.labResultsOptionSet
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ResultApproveField)
