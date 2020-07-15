import React, { useEffect } from 'react'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { useMetadata, PROGRAMS, PROGRAM_STAGES, OPTION_SETS, DATA_ELEMENTS } from './hooks/useMetadata'
import reducer from './store/reducers'

import Page from './components/page/page.component'
import Sidebar from './components/Sidebar/Sidebar.component'

import { createStore, applyMiddleware, compose } from 'redux'

import { useSelector, useDispatch, connect } from 'react-redux'

import styles from './App.module.css'
import { setPrograms, setStages, setOptionSets, setDataElements } from './store/actions'

const LAB_SITES_OPTION_SET_CODE = "Testing_sites"

const EntryPoint = (props) => {
    /*const staticDataReducer = useSelector(state=> state.staticDataReducer)
    const dispatch = useDispatch()*/
    const { loading: loadingPrograms, error: programsError, data: programs } = useMetadata(PROGRAMS);
    const { loading: loadingStages, error: stagesError, data: stages } = useMetadata(PROGRAM_STAGES)
    const { loading: loadingOptionSets, error: optionSetError, data: optionSets } = useMetadata(OPTION_SETS)
    const { loading: loadingDataElements, error: dataElementError, data: dataElements} = useMetadata(DATA_ELEMENTS)

    useEffect(() => {
        if (!loadingPrograms && programs && programs !== props.programs) {
            props.setAllPrograms(programs)
        }
        if (!loadingStages && stages && stages !== props.stages) {
            props.setAllStages(stages)
        }
        if (!loadingOptionSets && optionSets && optionSets !== props.optionSets) {
            props.setAllOptionSets(optionSets)
        }
        if(!loadingDataElements && dataElements && dataElements!== props.dataElements){
            console.log("data elements is ",dataElements)
            props.setAllDataElements(dataElements)
        }
    })

    const showApp = props.optionSets && props.optionSets.length > 0 && !loadingPrograms && !programsError && !loadingStages && !stagesError && !loadingOptionSets && !optionSetError
    return (
        <>
            <CssReset />
            {
                (loadingPrograms || loadingStages || loadingOptionSets) && (
                    <ScreenCover dataTest="app-screen-cover">
                        <CircularLoader dataTest="app-loader" />
                    </ScreenCover>
                )
            }
            {showApp && (
                <div>
                    <div className={styles.container}>
                        <div className={styles.sidebar}>
                            <Sidebar />
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
        dataElements: state.staticDataReducer.dataElements

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllPrograms: (prgs) => dispatch(setPrograms(prgs)),
        setAllStages: (stgs) => dispatch(setStages(stgs)),
        setAllOptionSets: (optnSets) => dispatch(setOptionSets(optnSets)),
        setAllDataElements: (dataElements) => dispatch(setDataElements(dataElements))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryPoint)