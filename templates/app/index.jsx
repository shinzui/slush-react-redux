import 'babel-core/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router'

import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import App from './containers/App'
import HomePage from './containers/HomePage'

const history = createBrowserHistory()
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRoute component={HomePage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
