import React from 'react'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    AlertBar
} from "@dhis2/ui"
import { saveSpecimenIdInDataStore, approveEventOnServer } from '../../../hooks/useSaver'


const SaveModal = (props) => {

    const [saveMutate] = approveEventOnServer({
        eventToApprove: props.eventToApprove,
        selectedProgram: props.selectedProgram.id,
        selectedStage: props.selectedStage.id,
        selectedLaboratory: props.selectedLaboratory,
        onEventSaveSuccess: props.onEventSaveSuccess,
        onEventSaveError: props.onEventSaveError
    })
    const [mutate] = saveSpecimenIdInDataStore(props.specimenIdToSave, props.onDataStoreSaveSuccess, props.onDataStoreSaveError, saveMutate)
    if (props.dataStoreSaveSuccess) {
        //saveMutate();
        console.log("dataStore save success true")
        //props.savingEvent()
    }

    return (
        <Modal
            large
            position="top"
        >

            <ModalTitle>
                Approve?
            </ModalTitle>
            <ModalContent>
                Are you sure you want to save?
            </ModalContent>
            <ModalActions>
                <Button onClick={props.onClose} type="button" secondary>
                    Close
                </Button>
                <Button onClick={mutate} type="button" primary>
                    Approve
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default SaveModal

