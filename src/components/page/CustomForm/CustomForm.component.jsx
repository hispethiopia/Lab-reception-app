import React from 'react'
import { connect } from 'react-redux'

import { Table, TableHead, TableRowHead, TableCellHead, TableBody, InputField } from "@dhis2/ui-core"
import DetailsModal from '../modal/DetailsModal.component'
import SaveModal from '../modal/SaveModal.component'
import { validate } from '../../../helper'
import ErrorsModal from '../modal/ErrorModal.component'
import { EVENT_APPROVED_DATA_ELEMENT, FIRST_NAME, MIDDLE_NAME, LAST_NAME, PHONE_NUMBER, SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST, LAB_REQUEST_STAGE_ID, LAB_RESULT_STAGE_ID } from '../../../helper/constants'
import RequestApprove from './RequestApproveField.component'
import ResultApprove from './ResultApprove.component'
import SaveResultModal from '../modal/SaveResultModal.component'




class CustomForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewDetails: false,
            viewErrorModal: false,
            selectedEvent: null,
            everythingSaved: props.everythingSaved ? props.everythingSaved : null,
            resultSaveSuccess: props.resultSaveSuccess ? props.resultSaveSuccess : null,
            savingResultError: props.savingResultError ? props.savingResultError : null,
            dataStoreSaveSuccess: props.dataStoreSaveSuccess ? props.dataStoreSaveSuccess : null,
            savingDataStoreError: props.savingDataStoreError ? props.savingDataStoreError : null,
            approvingEvent: props.approvingEvent ? props.approvingEvent : null,
            savingEvent: props.savingEvent ? props.savingEvent : null,
            selectedResult: props.selectedResult ? props.selectedResult : null,
            filters: {
                firstNameSearch: props.filters && props.filtersfirstNameSearch ? props.filters.firstNameSerach : '',
                middleNameSearch: props.filters && props.filtersmiddleNameSearch ? props.filters.middleNameSearch : '',
                lastNameSearch: props.filters && props.filterslastNameSearch ? props.filters.lastNameSearch : '',
                phoneSearch: props.filters && props.filtersphoneSearch ? props.filters.phoneSearch : '',
                specimenIdSearch: props.filters && props.filtersspecimenIdSearch ? props.filters.specimenIdSearch : ''
            }
        }
    }

    filterEvents = (filters) => {
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
                (filters.specimenIdSearch === "" || (event.event && event.event.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST] && event.event.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST].toLowerCase().includes(filters.specimenIdSearch.toLowerCase())))
            )
        })

        return array
    }

    onChangeFilter = (ref, fieldName) => {
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
        this.setState({ viewDetails: true, selectedEvent: e })
    }

    handleErrorView = (e) => {
        this.setState({ viewErrorModal: true, selectedEvent: e })
    }

    onResultSaveError = (e) => {
        console.error("ERROR saving result event", e)
        this.setState({ savingResultError: "ERROR: Saving result error.", resultSaveSuccess: false })
    }

    onResultSaveSuccess = (e, data) => {
        this.state.savingEvent.event.receivedResult = true;
        data.dataValues.forEach(dataValue=>{
            data.dataValues[dataValue.dataElement] = dataValue.value
        })
        this.state.savingEvent.resultEvent = data;

        var filters = { ...this.state.filters }
        filters.specimenIdSearch = ""
        this.setState({
            savingEvent: null,
            resultSaveSuccess: true,
            savingResultError: false,
            filters: filters,

        })
    }

    onEventSaveSuccess = (e) => {
        this.state.approvingEvent.event.dataValues[EVENT_APPROVED_DATA_ELEMENT] = "true"
        var filters = { ...this.state.filters }
        filters.specimenIdSearch = ""
        this.setState({
            savingDataStoreError: null,
            everythingSaved: true,
            eventSaveSuccess: true,
            approvingEvent: null,
            filters: filters
        })
    }

    onEventSaveError = (e) => {
        console.log("Event save Error ", e);
    }

    onDataStoreSaveError = (e) => {
        this.setState({ savingDataStoreError: "EROR: Specimen id already exists.", dataStoreSaveSuccess: false })
        console.log("ERROR saving in dataStore", e)
    }

    onDataStoreSaveSuccess = (e) => {
        console.log("Data store save successful", e)
        this.setState({ dataStoreSaveSuccess: true })
    }

    handleSaveModalClose = (e) => {
        this.setState({ approvingEvent: null })
    }

    handleSaveResultModalClose = (e) => {
        this.setState({ savingEvent: null })
    }

    handleApprove = (e) => {
        this.setState({ approvingEvent: e, dataStoreSaveSuccess: false })
    }

    handleResultChange = (selection, event) => {
        this.setState({ savingEvent: event, selectedResult: selection.selected })
    }


    handleSavingEvent = (e) => {
        this.setState({ dataStoreSaveSuccess: false })
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
                        specimenIdToSave={this.state.approvingEvent.event.dataValues[SPECIMEN_ID_DATA_ELEMENT_IN_REQUEST]}
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
                    this.state.savingEvent &&
                    <SaveResultModal
                        savingEvent={this.state.savingEvent}
                        onClose={this.handleSaveResultModalClose}
                        selectedLaboratory={this.props.selectedLaboratory}
                        selectedResult={this.state.selectedResult}
                        savingResultError={this.state.savingResultError}
                        onEventSaveSuccess={this.onResultSaveSuccess}
                        onEventSaveError={this.onResultSaveError}
                    />
                }

                {
                    !this.state.viewDetails && !this.state.viewErrorModal && !this.state.approvingEvent && !this.state.savingEvent &&
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
                                    <InputField onChange={(ref) => this.onChangeFilter(ref, 'firstNameSearch')} value={this.state.filters.firstNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead >
                                    <InputField onChange={(ref) => this.onChangeFilter(ref, 'middleNameSearch')} value={this.state.filters.middleNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead >
                                    <InputField onChange={(ref) => this.onChangeFilter(ref, 'lastNameSearch')} value={this.state.filters.lastNameSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                    <InputField onChange={(ref) => this.onChangeFilter(ref, 'phoneSearch')} value={this.state.filters.phoneSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                    <InputField initialFocus onChange={(ref) => this.onChangeFilter(ref, 'specimenIdSearch')} value={this.state.filters.specimenIdSearch}>
                                    </InputField>
                                </TableCellHead>
                                <TableCellHead>
                                </TableCellHead>
                                <TableCellHead>
                                </TableCellHead>
                            </TableRowHead>
                        </TableHead>
                        <TableBody>
                            {this.filterEvents(this.state.filters).map((event, mapIndex) => {
                                if (this.props.selectedStage.id === LAB_REQUEST_STAGE_ID) {
                                    var errors = validate(event, this.props.selectedProgram, this.props.selectedStage)
                                    if (mapIndex < 50) // render only the first 50 elements, because UI is very heavy
                                    {
                                        return (
                                            <RequestApprove
                                                initialFocus
                                                key={"event_" + mapIndex}
                                                event={event}
                                                handleApprove={this.handleApprove}
                                                handleErrorView={this.handleErrorView}
                                                handleDetailsClick={this.handleDetailsClick}
                                                errors={errors}
                                            />)
                                    }
                                } else if (this.props.selectedStage.id === LAB_RESULT_STAGE_ID) {
                                    return (
                                        <ResultApprove
                                            initialFocus
                                            key={"event_" + mapIndex}

                                            event={event}
                                            handleResultChange={this.handleResultChange}
                                            handleErrorView={this.handleErrorView}
                                            handleDetailsClick={this.handleDetailsClick}
                                        />
                                    )
                                }

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
