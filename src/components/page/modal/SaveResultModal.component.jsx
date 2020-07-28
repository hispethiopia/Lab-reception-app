import React from 'react'
import { connect } from 'react-redux'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    NoticeBox
} from "@dhis2/ui"
import { saveSpecimenIdInDataStore, saveResultEvent } from '../../../hooks/useSaver'


const SaveResultModal = (props) => {
    const [saveMutate]=saveResultEvent({
        requestToSaveTo: props.savingEvent,
        selectedProgram: props.selectedProgram,
        selectedLaboratory: props.selectedLaboratory.displayName,
        resultToSave: props.selectedResult,
        onEventSaveSuccess: props.onEventSaveSuccess,
        onEventSaveError: props.onEventSaveError
    })
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
                props.savingResultError &&
                <NoticeBox error title="ERROR">
                    Error saving result. {props.savingResultError}
                </NoticeBox>

            }
            <ModalActions>
                <Button onClick={props.onClose} type="button" secondary>
                    Close
                </Button>
                <Button
                    onClick={() => saveMutate()} 
                    type="button" 
                    primary={props.selectedResult==="Negative"}
                    destructive={props.selectedResult==="Positive"}
                    >
                    Save {props.selectedResult}
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveResultModal)

