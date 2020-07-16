import React from 'react'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ReactFinalForm,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableRowHead,
    TableCellHead,
    TableCell
} from "@dhis2/ui"


const ErrorsModal = (props) => {
    const { Field } = ReactFinalForm;
    return (
        <Modal
            large
            position="top"
        >

            <ModalTitle>
                Errors
            </ModalTitle>
            <ModalContent>
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>
                                Errors
                        </TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>

                        {
                            props.errors.map((error,index) => {
                                return (
                                    <TableRow key={("Error"+index)}>
                                        <TableCell>
                                            {error}
                                        </TableCell>
                                    </TableRow>

                                )
                            })
                        }
                        
                    </TableBody>
                </Table>
            </ModalContent>
            <ModalActions>
                <Button onClick={props.onClose}>
                    Close
                    </Button>
            </ModalActions>

        </Modal>
    )
}

export default ErrorsModal

