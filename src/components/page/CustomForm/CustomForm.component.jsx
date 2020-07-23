import React from 'react'
import { connect } from 'react-redux'

import { AlertBar, Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button, InputField } from "@dhis2/ui-core"
import DetailsModal from '../modal/DetailsModal.component'
import SaveModal from '../modal/SaveModal.component'
import { validate } from '../../../helper'
import ErrorsModal from '../modal/ErrorModal.component'
import { EVENT_APPROVED_DATA_ELEMENT, EVENT_TIME_APPROVED_DATA_ELEMENT } from '../../../helper/constants'


const VIEW_DETAILS_MSG = "View details"
const APPROVE_MSG = "Approve"
const APPROVED_MSG = "Approved"
const SUCCESS_MSG = "Saved successfully"

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
            everythingSaved: props.everythingSaved?props.everythingSaved: null,
            dataStoreSaveSuccess: props.dataStoreSaveSuccess?props.dataStoreSaveSuccess: null,
            savingDataStoreError: props.savingDataStoreError ? props.savingDataStoreError : null,
            approvingEvent: props.approvingEvent ? props.approvingEvent : null,
            filters: {
                firstNameSearch: props.filters && props.filtersfirstNameSearch ? props.filters.firstNameSerach : '',
                middleNameSearch: props.filters && props.filtersmiddleNameSearch ? props.filters.middleNameSearch : '',
                lastNameSearch: props.filters && props.filterslastNameSearch ? props.filters.lastNameSearch : '',
                phoneSearch: props.filters && props.filtersphoneSearch ? props.filters.phoneSearch : '',
                specimenIdSearch: props.filters && props.filtersspecimenIdSearch ? props.filters.specimenIdSearch : ''
            }
        }
    }

    filterEvents = ( filters) => {
        if (!filters) {
            return [...this.props.allEvents]
        }
        if (!this.props.allEvents || this.props.allEvents && this.props.allEvents.length < 1) {
            return []
        }

        var array = this.props.allEvents.filter(event => {
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
        this.setState({ filters: filters })
    }

    handleModalClose = () => {
        this.setState({ viewDetails: false, selectedEvent: null })
    }

    handleErrorModalClose = () => {
        this.setState({ viewErrorModal: false, selectedEvent: null })
    }

    handleDetailsClick = (e) => {
        console.log("Details clicked ", e)
        this.setState({ viewDetails: true, selectedEvent: e })
    }

    handleErrorView = (e) => {
        this.setState({ viewErrorModal: true, selectedEvent: e })
        console.log("Error clicked", e)
    }

    onEventSaveSuccess = (e)=>{
        console.log("Event save successfull")
        this.state.approvingEvent.event.dataValues[EVENT_APPROVED_DATA_ELEMENT]="true"
        this.setState({
            savingDataStoreError: null,
            everythingSaved: true,
            eventSaveSuccess: true,
            approvingEvent: null
        })
    }

    onEventSaveError = (e) =>{
        console.log("Event save Error ",e);
    }

    onDataStoreSaveError = (e) => {
        this.setState({ savingDataStoreError: "EROR: Specimen id already exists.", dataStoreSaveSuccess:false })
        console.log("ERROR saving in dataStore", e)
    }

    onDataStoreSaveSuccess = (e) => {
        console.log("SUCCESS", e)
        this.setState({ dataStoreSaveSuccess: true })
    }

    handleSaveModalClose = (e) => {
        this.setState({ approvingEvent: null })
    }

    handleApprove = (e) => {
        this.setState({ approvingEvent: e, dataStoreSaveSuccess: false })
        console.log("theEvent", e)
        console.log("Approve clicked", e)
    }

    /**
     * This is used to limit React from calling event save infinitely
     * @param {*} e 
     */
    handleSavingEvent=(e)=>{
        this.setState({dataStoreSaveSuccess: false})
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
                    this.state.approvingEvent &&
                    <SaveModal
                        specimenIdToSave={this.state.approvingEvent.event.dataValues[SPECIMEN_ID]}
                        eventToApprove={this.state.approvingEvent}
                        dataStoreSaveSuccess={this.state.dataStoreSaveSuccess}
                        onEventSaveSuccess={this.onEventSaveSuccess}
                        onEventSaveError={this.onEventSaveError}
                        onDataStoreSaveSuccess={this.onDataStoreSaveSuccess}
                        onDataStoreSaveError={this.onDataStoreSaveError}
                        onClose={this.handleSaveModalClose}
                        selectedProgram={this.props.selectedProgram}
                        selectedStage={this.props.selectedStage}
                        selectedLaboratory={this.props.selectedLaboratory}
                        savingEvent={this.handleSavingEvent}
                        dataStoreSavingError={this.state.savingDataStoreError}
                    >

                    </SaveModal>
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
                                this.filterEvents(this.state.filters).map((event, mapIndex) => {
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
                                                            disabled={ event.event.dataValues[EVENT_APPROVED_DATA_ELEMENT]==="true"?true:false}
                                                            primary
                                                            onClick={
                                                                () => this.handleApprove(event)
                                                            } >
                                                            {event.event.dataValues[EVENT_APPROVED_DATA_ELEMENT]==="true"?APPROVED_MSG: APPROVE_MSG}
                                                        </Button>
                                                    }
                                                    {
                                                        (errors.length > 0) &&
                                                        <Button
                                                            name="View details"
                                                            value="default"
                                                            type="button"
                                                            onClick={
                                                                () => this.handleErrorView(event)
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
        selectedLaboratory: state.selectedDataReducer.selectedLaboratory,
        allEvents: state.selectedDataReducer.allEvents
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CustomForm)
