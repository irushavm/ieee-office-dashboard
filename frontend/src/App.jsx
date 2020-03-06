import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'


import Window from './components/Window'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeCreated: false,
            store: null,
            persistor: null
        }
    }

    componentDidMount() {
        configureStore().then(({ persistor, store }) => this.setState({ persistor, store, storeCreated: true }))
    }

    render() {
        const { storeCreated, persistor, store } = this.state
        if (!storeCreated) return null
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Window />
                </PersistGate>
            </Provider>
        )
    }
}

export default (() => <App />) // eslint-disable-line
