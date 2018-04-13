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
import Footer from './layouts/footer/Footer'
import LoadingContainer from './layouts/loading/LoadingContainer'
import PetitionsContainer from './layouts/petition/petitions-container/PetitionsContainer.js'
import PetitionForm from './layouts/petition/petition-form/PetitionForm.js'
import Petition from './layouts/petition/petition/Petition.js'
import Component404 from './layouts/404/Component404.js'

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
    <div>
      <Navbar/>
      <DrizzleProvider options={options}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
              </Route>
              <Route path="/petitions/:modifier" component={App}>
                <IndexRoute component={PetitionsContainer} />
              </Route>
              <Route path="/petition/new" component={App}>
                <IndexRoute component={PetitionForm} />
              </Route>
              <Route path="/petition/:id" component={App}>
                <IndexRoute component={Petition} />
              </Route>
              <Route path="/404" component={App}>
                <IndexRoute component={Component404} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
      </DrizzleProvider>
      <Footer/>
    </div>
  ),
  document.getElementById('root')
);
