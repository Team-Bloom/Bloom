import React from 'react';

const styles = {
  tooltiptext: {
    visibility: 'hidden',
    width: '120px',
    'background-color': 'black',
    color: '#fff',
    'text-align': 'center',
    padding: '5px 0;',
    'border-radius': '6px',

    /* Position the tooltip text - see examples below! */
    position: 'absolute',
    'z-index': '1',
  },
};
class AddCollaboratorForm extends React.Component {
  state = {
    hover: false,
  };
  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  render() {
    let hoverStyle;
    if (this.state.hover) {
      hoverStyle = { visibility: 'visible' };
    } else {
      hoverStyle = { visibility: 'hidden' };
    }
    return (
      <div
        className="popup"
        onClick={() => this.props.showForm('addCollaborator')}
      >
        <img
          // style={styles.icon}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/24/add-icon.png"
          alt="add-collab"
        />{' '}
        <span style={{ ...styles.tooltiptext, ...hoverStyle }}>
          Add Collaborator{' '}
        </span>
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
            onChange={this.props.handleChange}
            value={this.props.recipientEmail}
          />
          <button
            id="add-collab-btn"
            name="collab-btn"
            type="submit"
            disabled={!this.props.recipientEmail ? 'disabled' : null}
            className="email-form-btn"
            onClick={this.props.handleSubmit}
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
            {this.props.collabName ? (
              <div>{this.props.collabName} is not a user</div>
            ) : (
              <div />
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AddCollaboratorForm;
