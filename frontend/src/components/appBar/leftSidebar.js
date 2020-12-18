import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';

// import MenuItems from './menuItems'

import {Link} from 'react-router-dom'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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
      onClick={e => props.toggleSidebarDrawer(false)}
      onKeyDown={e => props.toggleSidebarDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/" button key="homepage">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home Page" />
        </ListItem>
        <Divider />
        {['Courses', 'Threads', 'Popular Courses', 'Popular Threads'].map((text, index) => (
          // <Link to={`/${formatGetSecondWord(text)}`}>
          <ListItem component={Link} to={`/${formatGetSecondWord(text)}`} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AssignmentIndIcon /> : <AssignmentIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          // </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['My Courses', 'My Threads', 'Messenger'].map((text, index) => (
          <ListItem component={Link} to={`/${formatGetSecondWord(text)}`} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AssignmentIndIcon /> : <AssignmentIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

export const LeftHamburger = props => {
    return (<div>
        <IconButton onClick={() => props.toggleSidebarDrawer(true)}
            edge="start"
            className={props.classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          ><MenuIcon /></IconButton>
          <Drawer open={props.sidebarDrawerOpened} onClose={e => {props.toggleSidebarDrawer(false)}}>
            <MenuItems toggleSidebarDrawer={props.toggleSidebarDrawer} />
          </Drawer>
    </div>)
}