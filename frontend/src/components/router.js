import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import HomePage from './homepage'
import AuthRoutes from './auth/routes'
import InputDemoRouter from './inputs/demo'
import Messenger from './messenger/routes'
import Courses from './courses/routes'
import Threads from './threads/routes'
import Popular from './popular/routes'


import React from 'react';
import { useState, useCallback } from 'react'

import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';

import Popover from '@material-ui/core/Popover';


import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Popper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
list: {
    width: 250,
    },
    fullList: {
    width: 'auto',
    },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
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
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const NavBar = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [sidebarDrawerOpened, toggleSidebarDrawer] = useState(false)
  const [anchor, setAnchor] = useState()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/accounts/profile" onClick={handleMenuClose}>Profile</MenuItem>
      {/* <MenuItem component={Link} to='/accounts/profile' onClick={handleMenuClose}>My Profile</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to={"/messages"}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem component={Link} to="/notifications">
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const formatGetSecondWord = text => {
    text = text.toLowerCase()
    if (text.includes(' ')) {
      return text.replace(' ', '/')
    } else {
      return text
    }
  }

  const MenuItems = (props) => (
    <div
      role="presentation"
      onClick={e => toggleSidebarDrawer(false)}
      onKeyDown={e => toggleSidebarDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/" button key="homepage">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home Page" />
        </ListItem>
        <Divider />
        {['Courses', 'Threads', 'Popular Threads', 'Popular Courses'].map((text, index) => (
          // <Link to={`/${formatGetSecondWord(text)}`}>
          <ListItem component={Link} to={`/${formatGetSecondWord(text)}`} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          // </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['My Courses', 'My Threads', 'Messenger'].map((text, index) => (
          <ListItem component={Link} to={`/${formatGetSecondWord(text)}`} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const [toggleSearchResults, setToggleSearchResults] = useState(false)
  const [searchValue, setSearchValue] = useState(String)

  const SearchResults = props => {
    return (<Popper
      id={toggleSearchResults? undefined: 'simple-popper'}
      open={toggleSearchResults}
      anchorEl={toggleSearchResults}
      onClose={e => {setToggleSearchResults(false)}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography className={classes.typography}>The content of the Popover.</Typography>
    </Popper>)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <IconButton onClick={() => toggleSidebarDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          ><MenuIcon /></IconButton>
          <Drawer open={sidebarDrawerOpened} onClose={e => {toggleSidebarDrawer(false)}}>
            <MenuItems />
          </Drawer>

          <Typography className={classes.title} variant="h6" noWrap>
            CarrilloForum
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
              onChange={e => {
                setSearchValue(e.target.value)
              }}
            />
          </div>

          <SearchResults value={SearchResults} />
          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}



  
export default (props) => {
    const classes = useStyles()
    
    return (
        <div>
            <Router>
                <div>

                <NavBar />

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/InputsDemo" component={InputDemoRouter} />
                    <Route path="/accounts" component={AuthRoutes} />
                    <Route path="/messenger" component={Messenger} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/threads" component={Threads} />
                    <Route path="/popular/:type" component={Popular} />
                    <Route path="/my/:type" component={AuthRoutes} />
                </Switch>

                </div>
            </Router>
        </div>
    )
}