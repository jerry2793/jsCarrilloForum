import {Link} from 'react-router-dom'

import React from 'react';
import { useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { SubMenu, RenderMobileMenu, MobileNav } from './mobile'
import { LeftHamburger } from './leftSidebar'
import { SearchInputForm, SearchResults } from './search'
import DesktopNav from './desktop'

import { useStyles } from './styles'


export default props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const [sidebarDrawerOpened, toggleSidebarDrawer] = useState(false)
//   const [anchor, setAnchor] = useState()

  const handleProfileMenuOpen = (event) => {
    setSubMenuOpen(true);
  };

  const handleMenuClose = () => {
    setSubMenuOpen(false);
    setMobileMenuOpen(false);
    };

    const handleMobileMenuOpen = (bool) => {
        setMobileMenuOpen(bool);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };

    

  const [toggleSearchResults, setToggleSearchResults] = useState(false)
  const [searchValue, setSearchValue] = useState(String)

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <LeftHamburger
            toggleSidebarDrawer={toggleSidebarDrawer}
            classes={classes}
            sidebarDrawerOpened={sidebarDrawerOpened}
          />

          <Typography onClick={e => window.location='/'} className={classes.title} variant="h6" noWrap>
            CarrilloForum
          </Typography>
          
          <SearchInputForm
            classes={classes}
            setSearchValue={setSearchValue}
          />

          <SearchResults 
            value={searchValue}
            toggleSearchResults={toggleSearchResults}
            setToggleSearchResults={setToggleSearchResults}
            classes={classes}
        />
          
          <div className={classes.grow} />
          
          <DesktopNav
            classes={classes}
            setSubMenuOpen={setSubMenuOpen}
           />
          
          <MobileNav
            classes={classes}
            setMobileMenuOpen={setMobileMenuOpen}
            menuOpened={isMobileMenuOpen}
          >
              <RenderMobileMenu
                setMobileMenuOpen={setMobileMenuOpen}
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                isMobileMenuOpen={isMobileMenuOpen}
                handleProfileMenuOpen={handleProfileMenuOpen}
                />
          </MobileNav>
          
        </Toolbar>
      </AppBar>
      <SubMenu
        handleMenuClose={handleMenuClose}
        isSubMenuOpen={isSubMenuOpen}
        anchorEl={anchorEl}
      />
    </div>
  );
}