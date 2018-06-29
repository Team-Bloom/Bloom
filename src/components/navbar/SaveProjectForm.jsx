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

class SaveProjectForm extends React.Component {
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
      <div className="popup" onClick={() => this.props.showForm('save')}>
        <img
          // style={styles.icon}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          name="save-btn"
          src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/32/floppy-icon.png"
          alt="save"
        />
        <span style={{ ...styles.tooltiptext, ...hoverStyle }}>
          Save project as...
        </span>
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
            onChange={this.props.handleChange}
            value={this.props.projectName}
          />
          <button
            type="submit"
            name="save-btn"
            className="email-form-btn"
            onClick={this.props.handleSubmit}
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
  }
}

export default SaveProjectForm;
