import React from 'react'
import TwitterShare from '../twitter-share/TwitterShare.js'
import LoadingSpinner from '../loading-spinner/LoadingSpinner.js'

const Spread = ({major, minors, shareable, topic, status}) => {
  let twitterStr = [major.twttr_url, minors[0].twttr_url, minors[1].twttr_url, minors[2].twttr_url].join('%20')
  return(
    <div className="spread-preview">
      <div className="top-preview">
        <div className="topic-preview">
          <div className="card-preview">
            <img alt={topic.title} src={topic.card} />
          </div>
        </div>
        <div className="reading-preview-text">
          <div className={"success-text" + (status !== 'success' ? ' hidden' : '')} >
            <p>Your reading is focused on <b>{topic.title}</b></p><br/>
            <p>Your spread is dominated by <b>{major.title}</b></p><br/>
            <p>{major.summary}</p><br/>
            <p><i> - {major.byline}</i></p>
          {shareable ? <TwitterShare cardStr={twitterStr} /> : ''}

          </div>
          <div className={"pending-text" + (status !== 'pending' ? ' hidden' : '')} >
            <LoadingSpinner />
            <p>Waiting for transaction to process... (this may take a bit...) </p>
          </div>
          <div className={"failure-text" + (status !== 'failure' ? ' hidden' : '')} >
            <div className="error-text">
              <p> Something went wrong with your transaction!</p>
              <p>Make sure you're providing sufficient GAS!</p>
            </div>
          </div>
        </div>
        <div className="card-preview-major">
          <img alt={major.title} src={major.card} />
        </div>
      </div>
      <div className="bottom-preview">
        <div className="card-preview-minor">
          <img alt={minors[0].title} src={minors[0].card} />
        </div>
        <div className="card-preview-minor">
          <img alt={minors[1].title} src={minors[1].card} />
        </div>
        <div className="card-preview-minor">
          <img alt={minors[2].title} src={minors[2].card} />
        </div>
      </div>
    </div>
  )
}

export default Spread
