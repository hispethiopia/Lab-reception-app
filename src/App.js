import React from 'react'
import {CssReset, CircularLoader, ScreenCover} from '@dhis2/ui-core'

import {useMetadata, PROGRAMS, PROGRAM_STAGES, OPTION_SETS} from './hooks/useMetadata'
import Page from './components/page/page.component'
import { Sidebar } from './components/Sidebar/Sidebar.component'

import styles from './App.module.css'

const LAB_SITES_OPTION_SET_CODE = "Testing_sites"

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {

    const {loading:loadingPrograms, error:programsError, data:programs} = useMetadata(PROGRAMS);
    const {loading:loadingStages, error:stagesError, data: stages} = useMetadata(PROGRAM_STAGES)
    const {loading:loadingOptionSets, error:optionSetError, data: optionSets} = useMetadata(OPTION_SETS)
    

    const showApp = !loadingPrograms && !programsError && !loadingStages && !stagesError && !loadingOptionSets && !optionSetError
    return (
        <>
        <CssReset />
        {
            (loadingPrograms || loadingStages || loadingOptionSets) && (
                <ScreenCover dataTest="app-screen-cover">
                    <CircularLoader dataTest="app-loader"/>
                </ScreenCover>
            )
        }
        {showApp && (
            <div>
                <div className = {styles.container}>
                    <div className={styles.sidebar}>
                        <Sidebar/>
                    </div>
                    <div className={styles.content}>
                        <Page
                            programs={programs} 
                            stages={stages} 
                            optionSets={optionSets} 
                            labSites={
                                (
                                    optionSets.filter(os=>{return os.code===LAB_SITES_OPTION_SET_CODE}) //Lab sites is the option set with the code as listed above.
                                )[0]
                            }/>
                    </div>
                </div>
            </div>       
        )}
        </>
    )

}

export default MyApp
