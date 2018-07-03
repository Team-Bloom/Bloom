import React from 'react';
import { Link } from 'react-router-dom';
import AddCollaboratorForm from './AddCollaboratorForm.jsx';
import SaveProjectForm from './SaveProjectForm.jsx';

const UserIsLoggedIn = props => {
  return (
    <ul className="navbar-container">
      <li className="dropdown">
        <span className="dropbtn">Bloom</span>
        <div className="dropdown-content">
          <Link to="/user-page">
            <span>Profile & account</span>
          </Link>
          <span>Preferences</span>
        </div>
      </li>
      <li className="dropdown">
        <span className="dropbtn" onMouseOver={props.hideForm}>
          Projects
        </span>
        <div className="dropdown-content">
          <span>New project</span>

          <SaveProjectForm
            showForm={props.showForm}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            projectName={props.projectName}
          />

          <AddCollaboratorForm
            showForm={props.showForm}
            handleChange={props.handleChange}
            recipientName={props.recipientName}
            recipientEmail={props.recipientEmail}
            handleSubmit={props.handleSubmit}
            collabName={props.collabName}
          />
        </div>
      </li>
      <li>
        <Link to="/home">
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="logged-in" onClick={props.logOutUser}>
        <span>Sign out</span>
      </li>
    </ul>
  );
};

export default UserIsLoggedIn;
