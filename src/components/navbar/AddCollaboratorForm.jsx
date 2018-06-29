import React from 'react';

const AddCollaboratorForm = props => {
  return (
    <div className="popup" onClick={() => props.showForm('addCollaborator')}>
<<<<<<< HEAD
      <span>Add collaborator</span>
      <form className="popuptext" id="collab-form" autoComplete="off">
=======
      <img
        // style={styles.icon}
        src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/24/add-icon.png"
        alt="add-collab"
      />{' '}
      <form
        onClick={event => event.stopPropagation()}
        className="popuptext"
        id="collab-form"
        autoComplete="off"
      >
>>>>>>> f4362faa4af1d3c36e392887d2ad08601f553bf1
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
<<<<<<< HEAD
=======
        <button
          type="button"
          className="email-form-btn"
          onClick={() =>
            document.getElementById('collab-form').classList.toggle('show')
          }
        >
          Close
        </button>
>>>>>>> f4362faa4af1d3c36e392887d2ad08601f553bf1
        <div>
          {props.collabName ? (
            <div>{props.collabName} is not a user</div>
          ) : (
            <div />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCollaboratorForm;
