import React from 'react'

import { Card, SingleSelectField, SingleSelectOption } from "@dhis2/ui-core"

import styles from './page.module.css'

//import { SingleSelectField } from '../Select/SelectField'

class Page extends React.Component {

    programOptions = this.props.programs.map(prog => ({ label: prog.name, name: prog.name, value: prog.id }))

    constructor(props) {
        super(props)
        this.state = {
            selectedProgram: '',
            selectedStage: '',
        }
    }

    handleProgramChange = ({ selected }) => {
        this.setState({ selectedProgram: this.props.programs[selected.value] })
    }

    handleStageChange = ({ selected }) => {
        this.setState({ selectedStage: this.props.stages[selected.value]})
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
                                                />:""
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