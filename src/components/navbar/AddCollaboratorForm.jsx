import React from 'react'


const AddCollaboratorForm = props => {
  return (
    <div
    className="popup"
    onClick={() => props.showForm('addCollaborator')}
  >
    <span>Add collaborator</span>
    <form className="popuptext" id="collab-form" autoComplete="off">
      <label htmlFor="recipientName">First and last name</label>
      <input
        className="recipientName"
        type="text"
        name="recipientName"
        onChange={props.handleChange}
        value={props.recipientName}
      />
      <label htmlFor="recipientEmail">Email</label>
      <input
        className="recipientEmail"
        type="text"
        name="recipientEmail"
        onChange={props.handleChange}
        value={props.recipientEmail}
      />
      <button
        name="collab-btn"
        type="submit"
        className="email-form-btn"
        onClick={props.handleSubmit}
      >
        Share
      </button>
      <div>
      { props.collabName ?
        <div>{props.collabName} is not a user</div>
        : <div />
      }
      </div>
    </form>
  </div>

  )
}

export default AddCollaboratorForm
