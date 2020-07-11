import React from 'react'

import { Card, SingleSelectField, SingleSelectOption } from "@dhis2/ui-core"

import styles from './page.module.css'

//import { SingleSelectField } from '../Select/SelectField'

class Page extends React.Component {
    constructor(props) {
        super(props)
        console.log("props is ", props)
        this.state = {
            selectedProgram: '',
            selectedStage: '',
            selectedLab: ''
        }
    }

    handleProgramChange = ({ selected }) => {
        this.setState({
            selectedProgram: this.props.programs[selected.value],
            selectedStage: '',
            selectedLab: ''
        })
    }

    handleStageChange = ({ selected }) => {
        this.setState({
            selectedStage: this.props.stages[selected.value],
            selectedLab: ''
        })
    }

    handleLabChange = ({ selected }) => {
        this.setState({ selectedLab: this.props.labSites.options[selected.value] })
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
                                this.state.selectedProgram ?
                                    (
                                        { label: this.state.selectedProgram.name, value: this.state.selectedProgram.id, key: this.state.selectedProgram.id }
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
                        {this.state.selectedProgram &&
                            <SingleSelectField
                                className="content"
                                onChange={this.handleStageChange}
                                selected={
                                    this.state.selectedStage ?
                                        (
                                            { label: this.state.selectedStage.displayName, value: this.state.selectedStage.id, key: this.state.selectedStage.id }
                                        ) : {}}
                                label="Stage"
                                required={true}>
                                {
                                    Array.isArray(this.props.stages) && this.props.stages.length > 0 ?
                                        this.props.stages.map(stage => {
                                            return (
                                                stage.program.id === this.state.selectedProgram.id ?
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
                        {this.state.selectedStage &&
                            <SingleSelectField
                                className="content"
                                onChange={this.handleLabChange}
                                selected={
                                    this.state.selectedLab ?
                                        (
                                            { label: this.state.selectedLab.displayName, value: this.state.selectedLab.id, key: this.state.selectedLab.id }
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
                    </div>
                </Card>
            </div >
        )
    }
}

export default Page