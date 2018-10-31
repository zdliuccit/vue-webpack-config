import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: 0 }
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
  }

  // 加1
  increase() {
    let self = this
    self.setState({ number: self.state.number + 1 })
  }

  // 减一
  decrease() {
    let self = this
    self.setState({ number: self.state.number - 1 })

  }

  render() {
    return (
      <div>
        <input type="button" value="减1" onClick={this.decrease}/>
        <span> {this.state.number} </span>
        <input type="button" value="加1" onClick={this.increase}/>
      </div> )
  }
}

ReactDOM.render(<Counter/>, document.getElementById('app'))
