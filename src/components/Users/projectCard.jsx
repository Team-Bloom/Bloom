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
    'font-size': '30px',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
};

const ProjectCard = props => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>
            {props.project.title}
          </Typography>
          {props.project.collaborators.map((el, index) => {
            return (
              <Typography key={index} color="textSecondary">
                {el.name}
              </Typography>
            );
          })}
        </CardContent>
        <button
          type="submit"
          className="delete-btn"
          onClick={() => props.areYouSure(props.project)}
        >
          Delete project
        </button>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ProjectCard);
