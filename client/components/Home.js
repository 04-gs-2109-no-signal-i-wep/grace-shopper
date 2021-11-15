import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  return (
    <div>
      <h3>Welcome</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    first_name: state.auth.first_name
  }
}

export default connect(mapState)(Home)
