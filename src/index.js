import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import _ from 'lodash'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'
import Navbar from './layouts/navbar/Navbar'
import LoadingContainer from './layouts/loading/LoadingContainer'

// Contracts
import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'
import TaroEth from './../build/contracts/TaroEth.json'

import 'font-awesome/css/font-awesome.min.css';

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Set Drizzle options.
const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    ComplexStorage,
    SimpleStorage,
    TutorialToken,
    TaroEth
  ],
  events: {
    SimpleStorage: ['StorageSet']
  }
}

ReactDOM.render((
    <div>
      <Navbar/>
      <DrizzleProvider options={options}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
      </DrizzleProvider>
    </div>
  ),
  document.getElementById('root')
);
