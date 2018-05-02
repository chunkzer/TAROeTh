import React from 'react'

const TwitterShare = ({cardStr}) => {
  return (
    <div className="twitterShare">
      <button className="twitter-share-button">
        <a href={"https://twitter.com/intent/tweet?text=I%20just%20received%20my%20Crypto%20Tarot%20Spread%20from%20TAROeTh.%20https://chunkzer.github.io/TAROeTh/%20" + cardStr}>
          Share
          <i className="fa fa-twitter"></i>
        </a>
       </button>
    </div>
  )
}

export default TwitterShare
