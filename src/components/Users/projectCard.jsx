import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link
          onClick={() => props.selectMap(props.project.projectId)}
          to={`/map/${props.project.projectId}`}
        >
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
        </Link>
        <button
          disabled={
            props.keys.length === 1 ? 'disabled' :
            null
          }
          type="submit"
          className="delete-project-btn"
          onClick={() => props.areYouSure(props.project)}
        >
          Delete project
        </button>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ProjectCard);
