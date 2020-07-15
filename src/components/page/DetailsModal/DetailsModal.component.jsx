import React from 'react'

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
    ButtonStrip,
    Button
} from "@dhis2/ui"


const DetailsModal = ({ onClose }) => {


    return (
        <Modal
            large
            position="top"
        >
            <ModalTitle>
                This is a title
            </ModalTitle>
            <ModalContent>
                <StackedTable>
                    <StackedTableHead>
                        <StackedTableRowHead>
                            <StackedTableCellHead>
                                FirstName
                            </StackedTableCellHead>
                            <StackedTableCellHead>
                                MiddleName
                            </StackedTableCellHead>
                        </StackedTableRowHead>
                    </StackedTableHead>
                    <StackedTableBody>
                        <StackedTableRow>
                            <StackedTableCell>
                                Melaeke
                            </StackedTableCell>
                            <StackedTableCell>
                                Serawit
                            </StackedTableCell>
                        </StackedTableRow>
                    </StackedTableBody>
                </StackedTable>
            </ModalContent>
            <ModalActions>
                <Button onClick={onClose}>
                    Close
                    </Button>
            </ModalActions>

        </Modal>
    )
}

export { DetailsModal }

