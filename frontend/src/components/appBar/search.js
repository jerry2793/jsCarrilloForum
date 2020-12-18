import Typography from '@material-ui/core/Typography';
import { Popper } from "@material-ui/core";

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


export const SearchInputForm = props => {
    return (<div className={props.classes.search}>
        <div className={props.classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: props.classes.inputRoot,
            input: props.classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => {
            props.setSearchValue(e.target.value)
          }}
        />
      </div>)
}

export const  SearchResults = props => {
    // props.searchValue is the current search value passed in here
    
    return (<Popper
      id={props.toggleSearchResults? undefined: 'simple-popper'}
      open={props.toggleSearchResults}
      anchorEl={props.toggleSearchResults}
      onClose={e => {props.setToggleSearchResults(false)}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography className={props.classes.typography}>The content of the Popover.</Typography>
    </Popper>)
  }