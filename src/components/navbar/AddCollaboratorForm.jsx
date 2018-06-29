import React from 'react';

const AddCollaboratorForm = props => {
  return (
    <div className="popup" onClick={() => props.showForm('addCollaborator')}>
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
        <button
          type="button"
          className="email-form-btn"
          onClick={() =>
            document.getElementById('collab-form').classList.toggle('show')
          }
        >
          Close
        </button>
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
