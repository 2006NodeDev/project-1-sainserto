import React, { FunctionComponent, useState } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import {Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

// import MenuItem from '@material-ui/core/MenuItem'
import { LogOutComponent } from '../LogOutComponent/LogOutComponent';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(10)
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    main: {
      backgroundColor: "#422951"
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    navColor:{
      backgroundColor: "#5A189A"
    }
  }),
);


export const NavBarComponent: FunctionComponent<any> = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let menuItems = []
  let listItems = []

  if (props.user) {

    listItems.push(
      <ListItem button component={Link} key="listItem1" to='/home'>
        <ListItemText >Find My Tutor</ListItemText>
      </ListItem>,
      <ListItem button component={Link} key="listItem2" to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>
        <ListItemText >My Profile</ListItemText>
      </ListItem>,
      <ListItem button component={Link} key="listItem3" to='/role/tutor'>
        <ListItemText >All Tutors</ListItemText>
      </ListItem>
      // <ListItem button component={Link} key="listItem4" to='/findtutor'>
      //   <ListItemText >Find A Tutor</ListItemText>
      // </ListItem>,
      // <ListItem button component={Link} key="listItem5" to='/bookmarks'>
      //   <ListItemText >Bookmarks</ListItemText>
      // </ListItem>
      // <ListItem button component={LogOutComponent} key="listItem6">
      //   <ListItemText >Log Out</ListItemText>
      // </ListItem>
    )
    menuItems.push(

      <ListItem button component={Link} key="listItem7" to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>
        <ListItemText >Hello, {props.user.username}!</ListItemText>
      </ListItem>
    )




    //if they are logged in
    // menuItems.push(
    //   <MenuItem onClick={handleClose}>
    //     <Link to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>My Profile</Link>
    //   </MenuItem>,
    //   <MenuItem onClick={handleClose}><Link to='/role/tutor'>Tutors</Link></MenuItem>,
    //   <MenuItem onClick={handleClose}><Link to='/bookmarks'>Bookmarks</Link></MenuItem>,
    //   <MenuItem onClick={handleClose}><Link to='/logout'>Logout</Link></MenuItem>)
  }
  else {
    listItems.push(
      <ListItem button component={Link} key="listItem8" to='/login'>
        <ListItemText >Sign in</ListItemText>
      </ListItem>,
      <ListItem button component={Link} key="listItem9" to='/signup'>
        <ListItemText >Sign Up</ListItemText>
      </ListItem>)
    menuItems.push(
      <Button color="inherit" key="menuItem1" href="/login">Sign In</Button>,
      <Button color="inherit" key="menuItem2" href="/signup">Sign Up</Button>)


  }

  if (props.user && props.user.role === 'admin') {
    listItems.push(
      <ListItem button component={Link} to='/users'>
        <ListItemText key="listItem10">All Users</ListItemText>
      </ListItem>)
  }


  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar className={classes.navColor}>
          {menuItems}
          <Typography variant="h6" className={classes.title}>
            
        </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
            {/* {menuItems} */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <Typography paragraph>
            WELCOME TO YOUR HOMEPAGE
          </Typography>
          <Typography paragraph>
           DO SOMETHING
          </Typography> */}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          {listItems}

          {/* {['My Profile', 'All Tutors', 'Bookmarks', 'Logout'].map((text, index) => (
              <ListItem button key={text} component={Link} to="/users">
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
        </List>
        <Divider />
        {/* <List>
          {['SQL', 'Java', 'JavaScript'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
  
    </div>
  )
}