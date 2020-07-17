import React, { FunctionComponent, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export const NavBarComponent:FunctionComponent<any> = (props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //we can programmatically build the menu items
    let menuItems = []
    //always have the login item
    if(props.user){
        //if they are logged in, add the other items
        menuItems.push(
        <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user)?props.user.user_id : '0' }`}>My Profile</Link></MenuItem>,

        <MenuItem onClick={handleClose}><Link to='/tutors'>Tutors</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to='/bookmarks'>Bookmarks</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to='/logout'>Logout</Link></MenuItem>)
    }
    else{
    menuItems.push(<MenuItem onClick={handleClose}><Link to='/login'>Login</Link></MenuItem>,
    <MenuItem onClick={handleClose}><Link to='/signup'>Sign Up</Link></MenuItem>)


    }

    if(props.user && props.user.role === 'admin'){
      menuItems.push(<MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>,)
  }


    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={handleClick}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>

              <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
              <Typography className={classes.title} variant="h6" noWrap>
                Tutorial Hub
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      )
}