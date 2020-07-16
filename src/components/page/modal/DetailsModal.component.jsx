import React from 'react'

import { connect } from 'react-redux'

import {
    Modal,
    ModalTitle,
    ModalContent,
    StackedTable,
    StackedTableHead,
    StackedTableRowHead,
    StackedTableCellHead,
    StackedTableBody,
    StackedTableRow,
    StackedTableCell,
    ModalActions,
    ReactFinalForm,
    InputField,
    Button
} from "@dhis2/ui"


const DetailsModal = (props) => {
    const { Field } = ReactFinalForm;
    return (
        <Modal
            large
            position="top"
        >
            <ModalTitle>
                Details
            </ModalTitle>
            <ModalContent>
                <h2>Tracked entity details</h2>
                <StackedTable>
                    <StackedTableHead>
                        <StackedTableRowHead>
                            {
                                props.selectedProgram.programTrackedEntityAttributes.map(attribute => {

                                    return <StackedTableCellHead key={attribute.trackedEntityAttribute.id}>
                                        {(attribute.mandatory) ? attribute.trackedEntityAttribute.displayName + "*" : attribute.trackedEntityAttribute.displayName}
                                    </StackedTableCellHead>
                                })
                            }
                        </StackedTableRowHead>
                    </StackedTableHead>
                    <StackedTableBody>
                        <StackedTableRow>
                            {
                                props.selectedProgram.programTrackedEntityAttributes.map(attribute => {
                                    return (
                                        <StackedTableCell key={props.selectedEvent.event + attribute.trackedEntityAttribute.id}>
                                            <InputField
                                                value={
                                                    props.selectedEvent.trackedEntityInstance.attributes[attribute.trackedEntityAttribute.id] ? props.selectedEvent.trackedEntityInstance.attributes[attribute.trackedEntityAttribute.id] : "-"
                                                }
                                                disabled
                                            />

                                        </StackedTableCell>)
                                })
                            }
                        </StackedTableRow>
                    </StackedTableBody>
                </StackedTable>

                <h2>Event details</h2>
                <StackedTable>
                    <StackedTableHead>
                        <StackedTableRowHead>
                            {
                                props.selectedStage.programStageDataElements.map(dataElement => {

                                    return <StackedTableCellHead key={dataElement.dataElement.id}>
                                        {dataElement.compulsory ? dataElement.dataElement.displayName + "*" : dataElement.dataElement.displayName}
                                    </StackedTableCellHead>
                                })
                            }
                        </StackedTableRowHead>
                    </StackedTableHead>
                    <StackedTableBody>
                        <StackedTableRow>
                            {
                                (props.selectedEvent && props.selectedEvent.event) && props.selectedStage.programStageDataElements.map(dataElement => {
                                    return (
                                        <StackedTableCell key={(props.selectedEvent.event + dataElement.dataElement.id)}>
                                            <InputField
                                                value={
                                                    props.selectedEvent.event.dataValues[dataElement.dataElement.id] ? props.selectedEvent.event.dataValues[dataElement.dataElement.id] : ""
                                                }
                                                disabled
                                            />

                                        </StackedTableCell>)
                                })
                            }
                        </StackedTableRow>
                    </StackedTableBody>
                </StackedTable>


            </ModalContent>
            <ModalActions>
                <Button onClick={props.onClose}>
                    Close
                    </Button>
            </ModalActions>

        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage
    }

}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)

