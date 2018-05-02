import React from 'react'

const Interpretation = ({url, commentary}) => {
  return (
      <div className="interpretation">
        <div className="interpretation-section">
          <h1>Interpretation</h1>
          <iframe  className="petition-interpretation-video" src={url} frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className="interpretation-section">
          <h1>Commentary</h1>
          <p>{commentary}</p>
        </div>
      </div>
    )
}

export default Interpretation
