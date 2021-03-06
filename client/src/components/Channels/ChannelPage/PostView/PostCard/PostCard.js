import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { primary } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    margin: 'auto',
  },
  media: {
    height: 400
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
}));

function PostCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        //title={}
        subheader={props.subheader}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        component="img"
      //title="Paella dish"
      />
      {/* <img src="http://localhost:5000/uploads/16132302542147piGl5w3LVIhcnTsUM6JRLJp4amTY9WUh6GeryYm.jpeg" className={classes.media} ></img> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <td dangerouslySetInnerHTML={{__html: props.content.length >= 100 ? props.content.substring(0, 100) + "..." : props.content }} />
        </Typography>
      </CardContent>
    </Card>
  );
}
export default PostCard