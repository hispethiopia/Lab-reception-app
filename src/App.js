import React from 'react'
import {CssReset, CircularLoader, ScreenCover} from '@dhis2/ui-core'

import {useMetadata} from './hooks/useMetadata'
import Page from './components/page/page.component'
import { Sidebar } from './components/Sidebar/Sidebar.component'

import styles from './App.module.css'

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {

    const {loading:loadingPrograms, error:programsError, data:programs} = useMetadata("programs");
    const {loading:loadingStages, error:stagesError, data: stages} = useMetadata("programStages")
    

    const showApp = !loadingPrograms && !programsError && !loadingStages && !stagesError
    return (
        <>
        <CssReset />
        {
            (loadingPrograms || loadingStages) && (
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
                        <Page programs={programs} stages={stages} />
                    </div>
                </div>
            </div>       
        )}
        </>
    )

}

export default MyApp
