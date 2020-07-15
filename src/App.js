import React from 'react'
import {createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './store/reducers'
import EntryPoint from './Entry'

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const MyApp = () => { 
    return ( 
        <Provider store={store}>
            <EntryPoint></EntryPoint>
        </Provider>
    )
}


export default MyApp