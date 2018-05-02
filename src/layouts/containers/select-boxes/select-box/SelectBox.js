import React from 'react'
import './SelectBox.css'

const SelectBox = ({selected, faved, onSelect, onFave, iconClass, title}) =>  {
  return (
    <div className={"select-box" + (selected ? " selected" : "") + (faved ? " faved" : "")} onClick={onSelect}>
      {onFave ? <div className="main-topic" onClick={onFave}><i className={faved ? "fa fa-star" : "fa fa-star-o"}></i></div> : ''}
      <i className={iconClass}></i>
      <div className="box-topic">{title}</div>
    </div>
    )
}

export default SelectBox
