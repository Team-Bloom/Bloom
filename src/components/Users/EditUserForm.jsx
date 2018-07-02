import React from 'react';

const EditUserForm = props => {
  return (
    <div className="edit-user-form">
      <form id="user-form" autoComplete="off">
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          name="userName"
          onChange={props.handleChange}
          value={props.userName}
        />
        <label htmlFor="userEmail">Email</label>
        <input
          type="text"
          name="userEmail"
          onChange={props.handleChange}
          value={props.userEmail}
        />
        <button type="submit" className="edit-user-btn"
          onClick={props.handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
