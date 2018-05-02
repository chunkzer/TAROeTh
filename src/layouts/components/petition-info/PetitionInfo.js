import React from 'react'
import Moment from 'react-moment'

const PetitionInfo = ({topicCard, topics, petition, cancellable, cancelFn}) => {
  return (
    <div className="petition-primary-section">
      <div className="petition-main-topic-img">
        <img alt={topicCard.title} src={topicCard.card}/>
      </div>
      <div className="petition-primary-info">
        <h1 className='petition-topic'>
          {topicCard.header}
        </h1>
          <label>Topics: {topics}</label>
        <ul>
          <li>Main topic requested: <b>{petition.topicData.title}</b> </li>
          <li>Petition Status:  <b>{petition.status}</b></li>
          <li>Incentive included: <b>{petition.incentive} ETH</b></li>
          {cancellable ? <li>Cancellable by: <b><Moment format="YYYY/MM/DD">{petition.turnaround}</Moment></b></li> : ''}
        </ul>
        <p className='petition-comments'>
          {petition.comments}
        </p>
        <div className={"cancel-button" + cancellable ? '' : ' hidding'}>
          <button className="petition-cancellation" onClick={cancelFn}> CANCEL </button><br/>
          <label>This will get your incentive back, though it won't refund gas fees...</label>
        </div>
      </div>
    </div>
  )
}

export default PetitionInfo
