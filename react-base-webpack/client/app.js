/**
 * Created by zdliuccit on 18/11/1.
 */

import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children || "Welcome to your zdliuccit"}
      </div>
    )
  }
}

export default App