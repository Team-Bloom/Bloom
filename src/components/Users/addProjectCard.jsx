import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import React from 'react';

const styles = {
  card: {
    maxWidth: 250,
    minHeight: 250,
    margin: '40px',
    padding: '40px',
  },
  title: {
    display: 'inline-block',
    textAlign: 'center',
    'font-size': '42px',
    margin: '0 2px',
    transform: 'scale(0.8)',
    color: 'darkblue',
  },
  pos: {
    marginBottom: 12,
  },
};

const AddProjectCard = props => {
  const { classes } = props;
  return (
    <div className="project-cards">
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>New Project</Typography>
        </CardContent>
        <button
          onClick={() => props.addProject(props.user)}
          type="submit"
          style={{ cursor: 'pointer' }}
          className="add-project-btn"
        >
          Add New Project
        </button>
      </Card>
    </div>
  );
};

export default withStyles(styles)(AddProjectCard);
