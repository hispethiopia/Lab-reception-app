import React from 'react'
import { connect } from 'react-redux'

import { TableCell, TableRow, Button } from "@dhis2/ui"
import { EVENT_APPROVED_DATA_ELEMENT, FIRST_NAME, MIDDLE_NAME, LAST_NAME, PHONE_NUMBER, SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST } from '../../../helper/constants'


const VIEW_DETAILS_MSG = "View details"
const APPROVE_MSG = "Approve"
const APPROVED_MSG = "Approved"




const RequestApproveField = (props) => {
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
                {(props.errors.length === 0) &&
                    < Button
                        name="View details"
                        value="default"
                        type="button"
                        disabled={props.event.event.dataValues[EVENT_APPROVED_DATA_ELEMENT] === "true" ? true : false}
                        primary
                        onClick={
                            () => props.handleApprove(props.event)
                        } >
                        {props.event.event.dataValues[EVENT_APPROVED_DATA_ELEMENT] === "true" ? APPROVED_MSG : APPROVE_MSG}
                    </Button>
                }
                {
                    (props.errors.length > 0) &&
                    <Button
                        name="View details"
                        value="default"
                        type="button"
                        onClick={
                            () => props.handleErrorView(props.event)
                        }
                        destructive>
                        View error
                            </Button>
                }
            </TableCell>
        </TableRow>
    )
}
const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
        selectedLaboratory: state.selectedDataReducer.selectedLaboratory,
        allEvents: state.selectedDataReducer.allEvents
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RequestApproveField)
