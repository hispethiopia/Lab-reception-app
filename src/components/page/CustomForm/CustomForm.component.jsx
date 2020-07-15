import React from 'react'

import { Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button, InputField } from "@dhis2/ui-core"
import { DetailsModal } from '../DetailsModal/DetailsModal.component'

const VIEW_DETAILS_MSG = "View details"
const APPROVE_MSG = "Approve"


class CustomForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewDetails: false,
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
        if(!allEvents || allEvents && allEvents.length <1){
            return []
        }

        var array = allEvents.filter(event => {
            return (
                event['first_name'].includes(filters.firstNameSearch) &&
                event['middle_name'].includes(filters.middleNameSearch) && 
                event['last_name'].includes(filters.lastNameSearch) &&
                event['phone_local'].includes(filters.phoneSearch) &&
                event['specimen_id'].includes(filters.specimenIdSearch) 
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
        this.setState({ viewDetails: false })
    }

    handleDetailsClick = (e) => {
        console.log("Details clicked ", e)
        this.setState({ viewDetails: true })
    }

    handleErrorView = (e) => {
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
                    <DetailsModal onClose={this.handleModalClose}>

                    </DetailsModal>
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
                                this.state.filteredEvents.map(event => {
                                    return (
                                        <TableRow key={event.event}>
                                            <TableCell>
                                                {event.first_name}
                                            </TableCell>
                                            <TableCell>
                                                {event.middle_name}
                                            </TableCell>

                                            <TableCell>
                                                {event.last_name}
                                            </TableCell>

                                            <TableCell>
                                                {event.phone_local}
                                            </TableCell>

                                            <TableCell>
                                                {event.specimen_id}
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
                                                <Button
                                                    name="View details"
                                                    value="default"
                                                    type="button"
                                                    primary
                                                    onClick={this.handleApprove} >
                                                    {APPROVE_MSG}
                                                </Button>

                                                {/*event % 5 === 0 &&
                                                    <Button name="View details" value="default" type="button" onClick={this.handleErrorView} destructive >View error</Button>*/
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

export default CustomForm
