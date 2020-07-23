import React from 'react'
import {connect} from 'react-redux'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    NoticeBox
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
            {
                props.dataStoreSavingError &&
                <NoticeBox error title="ERROR">
                    Specimen ID already exists
                </NoticeBox>

            }
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


const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
        selectedLaboratory: state.selectedDataReducer.selectedLaboratory
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal)

