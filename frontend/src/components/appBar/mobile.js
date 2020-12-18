import {Link} from 'react-router-dom'

import Badge from '@material-ui/core/Badge';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Drawer } from '@material-ui/core';


// the submenu
const menuId = 'primary-search-account-menu';
export const SubMenu = props => {
    return (<Menu style={{
      // top: '0',
      zIndex: '1'
    }}
        anchorEl={props.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.isSubMenuOpen}
        onClose={() => props.handleMenuClose()}
    >
        <MenuItem component={Link} to="/accounts/login" onClick={() => props.handleMenuClose()}>Login</MenuItem>
        <MenuItem component={Link} to="/accounts/register" onClick={() => props.handleMenuClose()}>Register</MenuItem>
        <MenuItem component={Link} to="/accounts/profile" onClick={() => props.handleMenuClose()}>Profile</MenuItem>
        {/* <MenuItem component={Link} to='/accounts/profile' onClick={handleMenuClose}>My Profile</MenuItem> */}
    </Menu>)
}

const mobileMenuId = 'primary-search-account-menu-mobile';

export const RenderMobileMenu = props => {
    return (<Menu
        anchorEl={props.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.isMobileMenuOpen}
        onClose={e => props.setMobileMenuOpen(false)}
        onKeyDown={e => props.setMobileMenuOpen(false)}
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
        <MenuItem onClick={e => props.handleProfileMenuOpen(e)}>
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
      </Menu>)
}

export const MobileNav = props => {
    return (
        <div>

        <div className={props.classes.sectionMobile}>
            <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={event => props.setMobileMenuOpen(true)}
            color="inherit"
            >
                <MoreIcon />
            </IconButton>
        </div>
            
            <Drawer open={props.menuOpened} onClose={e => props.setMobileMenuOpen(false)}>
                {props.children}
            </Drawer>
        </div>
      )
}