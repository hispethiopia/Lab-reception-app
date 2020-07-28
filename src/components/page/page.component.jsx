import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import { Card, SingleSelectField, SingleSelectOption, InputField, Button } from "@dhis2/ui-core"

import styles from './page.module.css'

import { onSelectProgram, onSelectStage, onSelectLabSite, onSelectDuration, onSelectViewData, onAllEventsChagned } from '../../store/actions'
import RequestForm from './CustomForm/RequestForm.component'
import ResultForm from './CustomForm/ResultForm.component'
import { LAB_REQUEST_STAGE_ID, LAB_RESULT_STAGE_ID } from '../../helper/constants'

class Page extends React.Component {

    handleDayChange = (ref) => {
        /**
         * Make sure  data isn't displayed on change
         */
        this.props.setAllEvents([])
        this.props.onViewData(false)
        this.props.onDurationSelected(ref.value)
    }

    handleProgramChange = ({ selected }) => {
        /**
         * Make sure  data isn't displayed on change
         */
        this.props.setAllEvents([])
        this.props.onProgramSelected(this.props.programs[selected.value])
        //this.props.onDurationSelected('')
        this.props.onLabSiteSelected('')
        this.props.onViewData(false)
    }

    handleStageChange = ({ selected }) => {
        /**
         * Make sure  data isn't displayed on change
         */
        this.props.setAllEvents([])
        this.props.onStageSelected(this.props.selectedProgram.programStages[selected.value])
        this.props.onLabSiteSelected('')
        this.props.onViewData(false)
    }

    handleLabChange = ({ selected }) => {
        /**
         * Make sure  data isn't displayed on change
         */
        this.props.setAllEvents([])
        this.props.onLabSiteSelected(this.props.labSites.options[selected.value])
        this.props.onViewData(false)
        //this.setState({ selectedLab: this.props.labSites.options[selected.value], displayData: false })
    }

    handleLoadButton = () => {
        this.props.onViewData(true)
        //this.setState({ displayData: true })
        console.log("Buton clicked")

    }

    render() {
        return (
            <div className={styles.container} >
                <Card>
                    <div className={styles.content}>
                        <SingleSelectField
                            className="content"
                            onChange={this.handleProgramChange}
                            selected={
                                this.props.selectedProgram ?
                                    (
                                        { label: this.props.selectedProgram.name, value: this.props.selectedProgram.id, key: this.props.selectedProgram.id }
                                    ) : {}}
                            label="Program"
                            required={true}>
                            {
                                Array.isArray(this.props.programs) && this.props.programs.length > 0 ?
                                    this.props.programs.map(program => {
                                        return (
                                            <SingleSelectOption
                                                label={program.name}
                                                value={program.id}
                                                key={program.id}
                                            />
                                        )
                                    }) : <div></div>
                            }
                        </SingleSelectField>
                        {this.props.selectedProgram &&
                            <SingleSelectField
                                className="content"
                                onChange={this.handleStageChange}
                                selected={
                                    this.props.selectedStage ?
                                        (
                                            { label: this.props.selectedStage.displayName, value: this.props.selectedStage.id, key: this.props.selectedStage.id }
                                        ) : {}}
                                label="Stage"
                                required={true}>
                                {
                                    Array.isArray(this.props.stages) && this.props.stages.length > 0 ?
                                        this.props.stages.map(stage => {
                                            return (
                                                stage.program.id === this.props.selectedProgram.id && 
                                                (stage.id === LAB_REQUEST_STAGE_ID || stage.id === LAB_RESULT_STAGE_ID) &&
                                                stage.access.data.write 
                                                ?
                                                    <SingleSelectOption
                                                        label={stage.displayName}
                                                        value={stage.id}
                                                        key={stage.id}
                                                    /> : ""
                                                )
                                        }) : <div></div>
                                }
                            </SingleSelectField>
                        }
                        {this.props.selectedStage &&
                            <SingleSelectField
                                className="content"
                                onChange={this.handleLabChange}
                                selected={
                                    this.props.selectedLaboratory ?
                                        (
                                            { label: this.props.selectedLaboratory.displayName, value: this.props.selectedLaboratory.id, key: this.props.selectedLaboratory.id }
                                        ) : {}}
                                label="Laboratory"
                                required={true}>
                                {
                                    Array.isArray(this.props.labSites.options) && this.props.labSites.options.length > 0 ?
                                        this.props.labSites.options.map(site => {
                                            return (
                                                <SingleSelectOption
                                                    label={site.displayName}
                                                    value={site.id}
                                                    key={site.id}
                                                />
                                            )
                                        }) : <div></div>
                                }
                            </SingleSelectField>
                        }
                        {
                            this.props.selectedLaboratory &&
                            <>
                                <InputField
                                    label="Days"
                                    name="days"
                                    type="number"
                                    value={this.props.selectedDuration}
                                    onChange={this.handleDayChange}
                                />
                                <Button
                                    style={{ alignment: 'right' }}
                                    name="Start"
                                    small
                                    type="button"
                                    value="default"
                                    position="right"
                                    onClick={this.handleLoadButton}
                                >
                                    Load
                            </Button>
                            </>
                        }
                    </div>
                </Card>
                <Card>
                    <div className={styles.content}>
                        {
                            this.props.viewData && this.props.selectedStage.id === LAB_REQUEST_STAGE_ID &&
                            <RequestForm></RequestForm>
                        }
                        {
                            this.props.viewData && this.props.selectedStage.id === LAB_RESULT_STAGE_ID &&
                            <ResultForm></ResultForm>
                        }
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedProgram: state.selectedDataReducer.selectedProgram,
        selectedStage: state.selectedDataReducer.selectedStage,
        selectedLaboratory: state.selectedDataReducer.selectedLaboratory,
        selectedDuration: state.selectedDataReducer.selectedDuration,
        viewData: state.selectedDataReducer.viewData,

        programs: state.staticDataReducer.programs,
        stages: state.staticDataReducer.stages,
        optionSets: state.staticDataReducer.optionSets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProgramSelected: (prg) => dispatch(onSelectProgram(prg)),
        onStageSelected: (stg) => dispatch(onSelectStage(stg)),
        onLabSiteSelected: (lab) => dispatch(onSelectLabSite(lab)),
        onDurationSelected: (duration) => dispatch(onSelectDuration(duration)),
        onViewData: (value) => dispatch(onSelectViewData(value)),
        setAllEvents: (allEvents) => dispatch(onAllEventsChagned(allEvents))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Page)