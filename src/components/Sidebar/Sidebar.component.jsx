import React, { useState } from 'react'

import { OrganisationUnitTree } from '@dhis2/ui-widgets'


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrgUnit: [],
            selectedOrgUnitId: {}
        }
    }

    onOrgUnitSelect = (orgUnitSelected) => {
        console.log(orgUnitSelected);
        let test = [orgUnitSelected.path]
        console.log("new State ", test)
        this.setState({ selectedOrgUnit: [orgUnitSelected.path] })
        this.setState({ selectedOrgUnitId: orgUnitSelected })
    }

    render() {
        return (

            <div style={{ position: 'relative' }}>

                <OrganisationUnitTree
                    name="Root org unit"
                    onChange={this.onOrgUnitSelect}
                    onSelectClick={this.onOrgUnitSelect}
                    roots={[
                        'b3aCK1PTn5S'
                    ]}
                    selected={this.state.selectedOrgUnit}
                    singleSelection
                />
            </div>
        )
    }
}

export { Sidebar }