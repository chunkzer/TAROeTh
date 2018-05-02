import React from 'react'
import './PetitionPreview.css'

const PetitionPreview = ({topicData, incentive, petitioner, status}) => {
  return (
    <li className="card">
      <img className="card-header" alt={topicData.title} src={topicData.previewImage}/>
      <div className="card-body">
        <h1 className="preview-topic">{topicData.header}</h1>
        <h1 className="stuff">Status: {status}</h1>
        <span>Incentive: <i>{incentive} ETH</i></span>
        <span>From:<i>{petitioner}</i></span>
      </div>
    </li>
  )
}

export default PetitionPreview
