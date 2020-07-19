// import React, { FunctionComponent, useState } from 'react'
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import Menu from '@material-ui/core/Menu'
// import SearchIcon from '@material-ui/icons/Search';
// import MenuItem from '@material-ui/core/MenuItem'
// import { Link } from 'react-router-dom'


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display:'flex',
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//       display: 'none',
//       [theme.breakpoints.up('sm')]: {
//         display: 'block',
//       },
//     },
//     search: {
//       position: 'relative',
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: fade(theme.palette.common.white, 0.15),
//       '&:hover': {
//         backgroundColor: fade(theme.palette.common.white, 0.25),
//       },
//       marginLeft: 0,
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto',
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: '100%',
//       position: 'absolute',
//       pointerEvents: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     inputRoot: {
//       color: 'inherit',
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
//     main: {
//       backgroundColor: "#422951"
//     },
//     menuLink:{
//       color:"white"
//     }
//   }),
// );

// export const NavBarComponent: FunctionComponent<any> = (props) => {

//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   //we can programmatically build the menu items
//   let menuItems = []
//   //always have the login item
//   if (props.user) {
//     //if they are logged in, add the other items
//     menuItems.push(
//       <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>My Profile</Link></MenuItem>,
//       <MenuItem onClick={handleClose}><Link to='/role/tutor'>Tutors</Link></MenuItem>,
//       <MenuItem onClick={handleClose}><Link to='/bookmarks'>Bookmarks</Link></MenuItem>,
//       <MenuItem onClick={handleClose}><Link to='/logout'>Logout</Link></MenuItem>)
//   }
//   else {
//     menuItems.push(<MenuItem onClick={handleClose}><Link to='/login'>Login</Link></MenuItem>,
//       <MenuItem onClick={handleClose}><Link to='/signup'>Sign Up</Link></MenuItem>)


//   }

//   if (props.user && props.user.role === 'admin') {
//     menuItems.push(<MenuItem onClick={handleClose}><Link className="menuLink" to='/users'>All Users</Link></MenuItem>,)
//   }


//   return (
//     <div className={classes.root}>






//       <AppBar position="static">
//         <Toolbar className={classes.main}>
//           <IconButton
//             onClick={handleClick}
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>

//           <Menu id="simple-menu"
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//             onClose={handleClose}>
//             {menuItems}
//           </Menu>
//           {menuItems}
//           <Typography className={classes.title} variant="h6" noWrap>
//             Tutorial Hub
//               </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   )
// }


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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Router, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem'
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
      <ListItem button component={Link} to='/home'>
        <ListItemText >Home</ListItemText>
      </ListItem>,
      <ListItem button component={Link} to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>
        <ListItemText >My Profile</ListItemText>
      </ListItem>,
      <ListItem button component={Link} to='/role/tutor'>
        <ListItemText >All Tutors</ListItemText>
      </ListItem>,
      <ListItem button component={Link} to='/findtutor'>
        <ListItemText >Find A Tutor</ListItemText>
      </ListItem>,
      <ListItem button component={Link} to='/bookmarks'>
        <ListItemText >Bookmarks</ListItemText>
      </ListItem>,
      <ListItem button component={LogOutComponent}>
        <ListItemText >Log Out</ListItemText>
      </ListItem>)
    menuItems.push(

      <ListItem button component={Link} to={`/profile/${(props.user) ? props.user.user_id : '0'}`}>
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
    <ListItem button component={Link} to='/login'>
      <ListItemText >Log in</ListItemText>
    </ListItem>,
    <ListItem button component={Link} to='/signup'>
      <ListItemText >Sign Up</ListItemText>
    </ListItem>)
  menuItems.push(
    <Button color="inherit" href="/login">Log In</Button>,
    <Button color="inherit" href="/signup">Sign Up</Button>)


}

if (props.user && props.user.role === 'admin') {
  listItems.push(
    <ListItem button component={Link} to='/users'>
      <ListItemText >All Users</ListItemText>
    </ListItem>)
}


return (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >

      <Toolbar className={classes.main}>
      {menuItems}
        <Typography variant="h6" className={classes.title}>
          TUTORIALHUB
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
      <List>
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