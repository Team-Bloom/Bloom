import React from 'react'


const SaveProjectForm = props => {
  return (
    <div className="popup" onClick={() => props.showForm('save')}>
    <span>Save as</span>
    <form className="popuptext" id="save-form" autoComplete="off">
      <label htmlFor="projectName">Project name</label>
      <input
        className="recipientName"
        type="text"
        name="projectName"
        onChange={props.handleChange}
        value={props.projectName}
      />
      <button
        type="submit"
        name="save-btn"
        className="email-form-btn"
        onClick={props.handleSubmit}
      >
        Save
      </button>
    </form>
  </div>

  )
}

export default SaveProjectForm
