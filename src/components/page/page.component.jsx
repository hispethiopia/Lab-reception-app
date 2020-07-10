import React from 'react'

import { Card } from "@dhis2/ui-core"

import styles from './page.module.css'

import { SelectField } from '../Select/SelectField'

class Testing extends React.Component {

    programOptions = this.props.programs.map(prog => ({ label: prog.name, name: prog.name, value: prog.id }))

    constructor(props) {
        super(props)
        this.state = {
            selectedProgram: '',
            selectedProgramOption: '',
        }
    }

    handleChange = ({ selected }) => {
        this.setState({ selectedProgram: this.props.programs[selected.value], selectedProgramOption: selected }, () => { console.log("new State", this.state) })
        console.log("selected", this.props.programs[selected.value])
    }

    render() {
        return (
            <div className={styles.container} >
                <Card>
                    <div className={styles.content}>
                        <SelectField
                            className="content"
                            options={this.programOptions}
                            change={this.handleChange}
                            selected={this.state.selectedProgram ? this.state.selectedProgramOption : this.programOptions[0]} 
                            label="Program"
                            required={true}/>
                    </div>
                </Card>
            </div >
        )
    }
}

export default Testing