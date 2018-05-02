import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import _ from 'lodash'

// Layouts
import App from './App'

import About from './layouts/components/about/About.js'
import Home from './layouts/components/home/Home.js'


import LoadingContainer from './layouts/loading/LoadingContainer'
import Petition from './layouts/containers/petition/Petition.js'
import PetitionsContainer from './layouts/containers/petitions-container/PetitionsContainer.js'
import FormContainer from './layouts/containers/petition-form/FormContainer.js'

// Contracts
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
    TaroEth
  ],
  events: {
    SimpleStorage: ['StorageSet']
  }
}

ReactDOM.render((
      <DrizzleProvider options={options}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path={process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'}  component={App}>
                <IndexRoute component={Home} />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/petitions/:modifier"} component={App}>
                <IndexRoute component={PetitionsContainer} />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/about/"} component={App}>
                <IndexRoute component={About} />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/petition/new"} component={App}>
                <IndexRoute component={FormContainer} />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/petition/:id"} component={App}>
                <IndexRoute component={Petition} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
      </DrizzleProvider>
  ),
  document.getElementById('root')
);
