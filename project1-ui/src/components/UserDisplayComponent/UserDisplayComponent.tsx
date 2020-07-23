import React, { FunctionComponent, SyntheticEvent } from 'react'
import { User } from '../../models/User'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Avatar, Chip } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
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
import { EditUserComponent } from '../EditUserComponent/EditUserComponent';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Container from '@material-ui/core/Container';



interface IUserDisplayProps {
  user: User
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    marginRight: theme.spacing(2),
    color: 'rgba(255, 255, 255, 0.54)',

  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  mainButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#5A189A",
    fontSize: 16,
    color: "white",
    '&:hover': {
      backgroundColor: "#3C096C"
    },
},
chipColor:{
  backgroundColor: "#9D4EDD"
}
}));

// const cards = [1,2,3];



export const UserDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let buttonGroup = []



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [spacing, setSpacing] = React.useState<GridSpacing>(2);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const { userId } = useParams()

  if (props.user.userId == userId || props.user.role === 'admin') {
    buttonGroup.push(
      <Button key="buttonEdit" variant='contained' className={classes.mainButton} color='inherit' component={RouterLink} to={`../edit/${(props.user) ? props.user.userId : '0'}`}>Edit</Button>
    )
  }

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item key={userId} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={props.user.image}
              title="user image"
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                {props.user.firstName} {props.user.lastName}
              </Typography>

              <Typography variant="overline" display="block" gutterBottom>
                I can help you with: <Chip size="small" color="primary" className={classes.chipColor} label={props.user.specialty} />
              </Typography>


              <Typography variant="body2" color="textSecondary" component="p">
                {props.user.description}
              </Typography>


            </CardContent>
            <CardActions disableSpacing>
              {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        {buttonGroup}

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
      <Grid container>
        {/* {buttonGroup} */}
      </Grid>
    </Container>
  )
}