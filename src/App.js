import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import {CssReset, CircularLoader, ScreenCover} from '@dhis2/ui-core'

import {useMetadata} from './hooks/useMetadata'
import { Select } from './components/Select/SelectField'
import Testing from './components/page/page.component'

const query = {
    me: {
        resource: 'me',
    },
}



const MyApp = () => {

    const {loading, error, programs} = useMetadata();
    

    const showApp = !loading && !error
    return (
        <>
        <CssReset />
        {
            loading && (
                <ScreenCover dataTest="app-screen-cover">
                    <CircularLoader dataTest="app-loader"/>
                </ScreenCover>
            )
        }
        {showApp && (
            <div>
                <Testing programs={programs}></Testing>
            </div>       
        )}
        </>
    )

}

export default MyApp
