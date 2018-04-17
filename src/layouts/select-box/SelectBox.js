import React, { Component } from 'react'
import './SelectBox.css'

class SelectBox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    <div className={"select-box" + (this.props.selected ? " selected" : "") + (this.props.faved ? " faved" : "")} onClick={this.props.onSelect}>
      {this.props.onFave ? <div className="main-topic" onClick={this.props.onFave}><i className={this.props.faved ? "fa fa-star" : "fa fa-star-o"}></i></div> : ''}
      <i className={this.props.iconClass}></i>
      <div className="box-topic">{this.props.title}</div>
    </div>
    )
  }
}

export default SelectBox
