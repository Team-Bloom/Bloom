import React from 'react';

const SaveProjectForm = props => {
  console.log('showfor', props);
  return (
    <div className="popup" onClick={() => props.showForm('save')}>
      <img
        // style={styles.icon}
        name="save-btn"
        src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/32/floppy-icon.png"
        alt="save"
      />
      <form
        onClick={event => event.stopPropagation()}
        className="popuptext"
        id="save-form"
        autoComplete="off"
      >
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
        <button
          type="button"
          className="email-form-btn"
          onClick={() =>
            document.getElementById('save-form').classList.toggle('show')
          }
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default SaveProjectForm;
