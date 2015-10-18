import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

@connect()
export default class HomePage extends Component {

  render() {
    return (
      <div>
        Home Page
      </div>
    )
  }
}
