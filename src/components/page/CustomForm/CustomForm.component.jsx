import React from 'react'
import { connect } from 'react-redux'

import { Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button, InputField } from "@dhis2/ui-core"
import DetailsModal from '../modal/DetailsModal.component'
import { validate } from '../../../helper'
import ErrorsModal from '../modal/Errors.modal'


const VIEW_DETAILS_MSG = "View details"
const APPROVE_MSG = "Approve"

const FIRST_NAME = "sB1IHYu2xQT"
const MIDDLE_NAME = 'tMNem0PTfDv'
const LAST_NAME = 'ENRjVGxVL6l'
const PHONE_NUMBER = 'fctSQp5nAYl'
const SPECIMEN_ID = 'EzzNZEGoppH'


class CustomForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewDetails: false,
            viewErrorModal: false,
            selectedEvent: null,
            allEvents: props.allEvents,
            filters: {
                firstNameSearch: props.filters && props.filtersfirstNameSearch ? props.filters.firstNameSerach : '',
                middleNameSearch: props.filters && props.filtersmiddleNameSearch ? props.filters.middleNameSearch : '',
                lastNameSearch: props.filters && props.filterslastNameSearch ? props.filters.lastNameSearch : '',
                phoneSearch: props.filters && props.filtersphoneSearch ? props.filters.phoneSearch : '',
                specimenIdSearch: props.filters && props.filtersspecimenIdSearch ? props.filters.specimenIdSearch : ''
            },
            filteredEvents: props.filteredEvents ? props.filteredEvents : props.allEvents
        }
    }

    filterEvents = (allEvents, filters) => {
        if (!filters) {
            return [...allEvents]
        }
        if (!allEvents || allEvents && allEvents.length < 1) {
            return []
        }

        var array = allEvents.filter(event => {
            return (
                (filters.firstNameSearch === "" || (event.trackedEntityInstance.attributes[FIRST_NAME] && event.trackedEntityInstance.attributes[FIRST_NAME].toLowerCase().includes(filters.firstNameSearch.toLowerCase()))) &&
                (filters.middleNameSearch === "" || (event.trackedEntityInstance.attributes[MIDDLE_NAME] && event.trackedEntityInstance.attributes[MIDDLE_NAME].toLowerCase().includes(filters.middleNameSearch.toLowerCase()))) &&
                (filters.lastNameSearch === "" || (event.trackedEntityInstance.attributes[LAST_NAME] && event.trackedEntityInstance.attributes[LAST_NAME].toLowerCase().includes(filters.lastNameSearch.toLowerCase()))) &&
                (filters.phoneSearch === "" || (event.trackedEntityInstance.attributes[PHONE_NUMBER] && event.trackedEntityInstance.attributes[PHONE_NUMBER].toLowerCase().includes(filters.phoneSearch.toLowerCase()))) &&
                (filters.specimenIdSearch === "" || (event.event && event.event.dataValues[SPECIMEN_ID] && event.event.dataValues[SPECIMEN_ID].toLowerCase().includes(filters.specimenIdSearch.toLowerCase())))
            )
        })

        return array
    }

    onChange = (ref, fieldName) => {
        var filters = { ... this.state.filters }
        filters[fieldName] = ref.value
        this.setState({ filters: filters, allEvents: this.state.allEvents, filteredEvents: this.filterEvents(this.state.allEvents, filters) })
    }

    handleModalClose = () => {
        this.setState({ viewDetails: false, selectedEvent: null })
    }

    handleErrorModalClose = () => {
        this.setState({viewErrorModal: false,selectedEvent: null})
    }

    handleDetailsClick = (e) => {
        console.log("Details clicked ", e)
        this.setState({ viewDetails: true, selectedEvent: e })
    }

    handleErrorView = (e) => {
        this.setState({viewErrorModal: true, selectedEvent: e})
        console.log("Error clicked", e)
    }

    handleApprove = (e) => {
        console.log("Approve clicked", e)
    }

    clickedHead = (e) => {
        console.log("handle head click", e)
    }

    render() {
        return (
            <div>
                {
                    this.state.viewDetails &&
                    <DetailsModal selectedEvent={this.state.selectedEvent} onClose={this.handleModalClose}>

                    </DetailsModal>
                }
                {
                    this.state.viewErrorModal &&
                    <ErrorsModal errors={validate(this.state.selectedEvent, this.props.selectedProgram, this.props.selectedStage)} onClose={this.handleErrorModalClose}>

                    </ErrorsModal>
                }
                {
                    <Table>
                        <TableHead>
                            <TableRowHead>
                                <TableCellHead onClick={this.clickedHead}>
                                    <a onClick={this.clickedHead}>First Name</a>
                                </TableCellHead>
                                <TableCellHead>
                                    Middle Name
                                </TableCellHead>
                                <TableCellHead>
                                    Last Name
                                </TableCellHead>
                                <TableCellHead>
                                    Phone Number
                                </TableCellHead>
                                <TableCellHead>
                                    Specimen ID
                                </TableCellHead>
                                <TableCellHead>
                                    View Detail
                            </TableCellHead>
                                <TableCellHead>
                                    Approve
                            </TableCellHead>
                            </TableRowHead>
                            <TableRowHead>
                                <TableCellHead onClick={this.clickedHead}>
                                    <InputField onChange={(ref) => this.onChange(ref, 'firstNameSearch')} value={this.state.filters.firstNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead >
                                    <InputField onChange={(ref) => this.onChange(ref, 'middleNameSearch')} value={this.state.filters.middleNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead >
                                    <InputField onChange={(ref) => this.onChange(ref, 'lastNameSearch')} value={this.state.filters.lastNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                    <InputField onChange={(ref) => this.onChange(ref, 'phoneSearch')} value={this.state.filters.phoneSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                    <InputField onChange={(ref) => this.onChange(ref, 'specimenIdSearch')} value={this.state.filters.specimenIdSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                </TableCellHead>
                                <TableCellHead>
                                </TableCellHead>
                            </TableRowHead>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.filteredEvents.map((event, mapIndex) => {
                                    var errors = validate(event, this.props.selectedProgram, this.props.selectedStage)
                                    if (mapIndex < 50) // render only the first 50 elements, because UI is very heavy
                                        return (
                                            < TableRow key={(event.trackedEntityInstance.trackedEntityInstance + (event.event !== null ? event.event.event : ""))} >
                                                <TableCell>
                                                    {event.trackedEntityInstance.attributes[FIRST_NAME]}
                                                </TableCell>
                                                <TableCell>
                                                    {event.trackedEntityInstance.attributes[MIDDLE_NAME]}
                                                </TableCell>

                                                <TableCell>
                                                    {event.trackedEntityInstance.attributes[LAST_NAME]}
                                                </TableCell>

                                                <TableCell>
                                                    {event.trackedEntityInstance.attributes[PHONE_NUMBER]}
                                                </TableCell>

                                                <TableCell>
                                                    {event.event && event.event.dataValues[SPECIMEN_ID]}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        name="View details"
                                                        value="default"
                                                        type="button"
                                                        onClick={
                                                            () => this.handleDetailsClick(event)
                                                        } >
                                                        {VIEW_DETAILS_MSG}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>

                                                    {(errors.length === 0) &&
                                                        < Button
                                                            name="View details"
                                                            value="default"
                                                            type="button"
                                                            primary
                                                            onClick={this.handleApprove} >
                                                            {APPROVE_MSG}
                                                        </Button>
                                                    }
                                                    {
                                                        (errors.length > 0) &&
                                                        <Button
                                                            name="View details"
                                                            value="default"
                                                            type="button" 
                                                            onClick={
                                                                ()=>this.handleErrorView(event)
                                                            } 
                                                            destructive>
                                                                View error
                                                            </Button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                })
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CustomForm)