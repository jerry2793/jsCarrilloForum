import IconButton from '@material-ui/core/IconButton';


import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const menuId = 'primary-search-account-menu';

export default props => {
    return (<div className={props.classes.sectionDesktop}>
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
          onClick={(e) => props.setSubMenuOpen(true)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>)
}