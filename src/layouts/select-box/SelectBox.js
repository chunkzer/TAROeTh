import React, { Component } from 'react'

class SelectBox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    <div className={"select-box" + (this.props.selected ? " selected" : "")} onClick={this.props.onClick}>
      <i className={this.props.iconClass}></i>
    <div className="box-topic">{this.props.title}</div>
    </div>
    )
  }
}

export default SelectBox
