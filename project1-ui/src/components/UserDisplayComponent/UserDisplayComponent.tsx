import React, { FunctionComponent, SyntheticEvent } from 'react'
import { User } from '../../models/User'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Avatar, Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

interface IUserDisplayProps {
  user: User
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: red[500],
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    paper: {
      backgroundColor: '#cccccc'
    }
  }),
);

export const UserDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [spacing, setSpacing] = React.useState<GridSpacing>(2);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root}>
            <Grid item xs={6}>
            <CardHeader
              avatar={
                <Avatar alt={props.user.username} src={props.user.image} className={classes.large} />
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }

            />
            </Grid>
            {/* <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            /> */}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {props.user.firstName} {props.user.lastName}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                I can help you with: <Chip size="small" color="primary" label={props.user.specialty}/>
              </Typography>
              

              <Typography variant="body2" color="textSecondary" component="p">
                {props.user.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="contact details"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  {props.user.email}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {props.user.phone}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}