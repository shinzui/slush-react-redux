import { Map } from 'immutable'

const initialState = Map()

export function sample(state = initialState, action) {

  switch(action.type) {
    default:
      return state
  }
}
