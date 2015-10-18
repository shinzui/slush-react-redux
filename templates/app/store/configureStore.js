import { combineReducers, createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import asyncMiddleware from 'redux-async'
import createLogger from 'redux-logger'

import  Immutable  from 'immutable'

import * as reducers from '../reducers'

const loggerMiddleware = createLogger(
  {
    transformer: (state) => {
      var newState = {}
      for (var i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS()
        } else {
          newState[i] = state[i]
        }
      };
      return newState
    },
    duration: true
  }
)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  asyncMiddleware,
  loggerMiddleware
)(createStore)

const appReducers = combineReducers(reducers)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(appReducers, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
