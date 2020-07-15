import React from 'react'
import { connect } from 'react-redux'

import { OrganisationUnitTree } from '@dhis2/ui-widgets'

import {onSelectOrgUnit} from '../../store/actions'


class Sidebar extends React.Component {
    render() {
        return (

            <div style={{ position: 'relative' }}>

                <OrganisationUnitTree
                    name="Root org unit"
                    onChange={this.props.onOrgUnitSelected}
                    onSelectClick={this.props.onOrgUnitSelected}
                    roots={[
                        'b3aCK1PTn5S'
                    ]}
                    selected={this.props.selectedOrg? [this.props.selectedOrg.path]:[]}
                    singleSelection
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedOrg: state.selectedDataReducer.selectedOrgUnit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrgUnitSelected: (orgUnit) => dispatch(onSelectOrgUnit(orgUnit))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)