import React from 'react'

const PetitionAdmin = ({commentary, url, onSubmit, onChange}) => {
  return (
    <div className="petition-admin-form">
      <form>
        <h2>URL for video interpretation</h2><br/>
          <div>
            <input type='text' name="url" value={url} maxLength="200" onChange={onChange} rows="5" cols="70"/>
          </div>
        <h2>Reading Commentary</h2><br/>
        <label>
          Commentary for the Reading
          <div>
            <textarea name="commentary" value={commentary} maxLength="500" onChange={onChange} rows="5" cols="70"/>
          </div>
        </label>
        <button key="submit" className="pure-button" type="button" onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default PetitionAdmin
