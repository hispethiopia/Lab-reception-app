import React from 'react'
import { connect } from 'react-redux'

import { OrganisationUnitTree } from '@dhis2/ui-widgets'

import { onSelectOrgUnit } from '../../store/actions'


const Sidebar = (props) => {
    console.log("props",props.rootOrgUnits)
    return (

        <div style={{ position: 'relative' }}>

            <OrganisationUnitTree
                name="Root org unit"
                onChange={props.onOrgUnitSelected}
                onSelectClick={props.onOrgUnitSelected}
                roots={props.rootOrgUnits.map(orgUnit=>{return orgUnit.id})}
                selected={props.selectedOrg ? [props.selectedOrg.path] : []}
                singleSelection
            />
        </div>
    )
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