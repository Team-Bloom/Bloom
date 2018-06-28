import React from 'react'


const DeleteProjectPanel = (props) => {
  return (
  <div>
    <div>To delete your project, type the name of your project in the box below</div>
    <form>
      <label htmlFor="projectName">Project name</label>
      <input
        type="text"
        name="projectName"
        onChange={props.handleChange}
        value={props.nameInput}
      />
      <button
        type="submit"
        name="delete-btn"
        className="email-form-btn"
        onClick={props.handleSubmit}
      >
        Delete
      </button>
      <button
        type="submit"
        name="cancel-btn"
        className="email-form-btn"
        onClick={props.handleSubmit}
      >
        Cancel
      </button>
     </form>
  </div>
  )
}

export default DeleteProjectPanel
