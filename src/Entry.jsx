import React, { useEffect } from 'react'
import { CssReset, CircularLoader, ScreenCover, Button } from '@dhis2/ui-core'

import { useMetadata, PROGRAMS, PROGRAM_STAGES, OPTION_SETS, DATA_ELEMENTS, ME } from './hooks/useMetadata'
import reducer from './store/reducers'

import Page from './components/page/page.component'
import Sidebar from './components/Sidebar/Sidebar.component'
import { connect } from 'react-redux'

import styles from './App.module.css'
import { setPrograms, setStages, setOptionSets, setDataElements, setLabResultOptionSet, setMe } from './store/actions'

import {LAB_SITES_OPTION_SET_CODE, LAB_RESULTS_OPTION_SET_CODE} from './helper/constants'

const EntryPoint = (props) => {
    const { loading: loadingPrograms, error: programsError, data: programs } = useMetadata(PROGRAMS);
    const { loading: loadingStages, error: stagesError, data: stages } = useMetadata(PROGRAM_STAGES)
    const { loading: loadingOptionSets, error: optionSetError, data: optionSets } = useMetadata(OPTION_SETS)
    const { loading: loadingDataElements, error: dataElementError, data: dataElements } = useMetadata(DATA_ELEMENTS)
    const { loading: loadingMeVariable, error: meVariableError, data: meVariable } = useMetadata(ME)

    useEffect(() => {

        //var x = temp.mutate();

        if (!loadingPrograms && programs && programs !== props.programs) {
            props.setAllPrograms(programs)
        }
        if (!loadingStages && stages && stages !== props.stages) {
            props.setAllStages(stages)
        }
        if (!loadingOptionSets && optionSets && optionSets !== props.optionSets) {
            props.setAllOptionSets(optionSets)
            props.setLabResultOptionSet(optionSets.filter(os=>{return os.code===LAB_RESULTS_OPTION_SET_CODE})[0])
        }
        if (!loadingDataElements && dataElements && dataElements !== props.dataElements) {
            props.setAllDataElements(dataElements)
        }
        if(!loadingMeVariable && meVariable && meVariable!== props.meVariable){
            props.setMeVariable(meVariable)
        }
    })

    const showApp = props.optionSets &&
        props.optionSets.length > 0 &&
        !loadingPrograms &&
        !programsError &&
        !loadingStages &&
        !stagesError &&
        !loadingOptionSets &&
        !optionSetError &&
        !loadingMeVariable && 
        !meVariableError
    return (
        <>
            <CssReset />
            {
                (loadingPrograms || loadingStages || loadingOptionSets || loadingMeVariable) && (
                    <ScreenCover dataTest="app-screen-cover">
                        <CircularLoader dataTest="app-loader" />
                    </ScreenCover>
                )
            }
            {showApp && (
                <div>
                    <div className={styles.container}>
                        <div className={styles.sidebar}>
                            <Sidebar rootOrgUnits={props.meVariable.organisationUnits}/>
                        </div>
                        <div className={styles.content}>
                            <Page
                                programs={props.programs}
                                stages={props.stages}
                                optionSets={props.optionSets}
                                labSites={
                                    (
                                        props.optionSets.filter(os => { return os.code === LAB_SITES_OPTION_SET_CODE }) //Lab sites is the option set with the code as listed above.
                                    )[0]
                                } />
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

const mapStateToProps = state => {
    return {
        programs: state.staticDataReducer.programs,
        stages: state.staticDataReducer.stages,
        optionSets: state.staticDataReducer.optionSets,
        dataElements: state.staticDataReducer.dataElements,
        labResultsOptionSet: state.staticDataReducer.labResultsOptionSet,
        meVariable: state.staticDataReducer.meVariable

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllPrograms: (prgs) => dispatch(setPrograms(prgs)),
        setAllStages: (stgs) => dispatch(setStages(stgs)),
        setAllOptionSets: (optnSets) => dispatch(setOptionSets(optnSets)),
        setAllDataElements: (dataElements) => dispatch(setDataElements(dataElements)),
        setLabResultOptionSet: (labResultsOption)=>dispatch(setLabResultOptionSet(labResultsOption)),
        setMeVariable: (me)=>dispatch(setMe(me))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryPoint)