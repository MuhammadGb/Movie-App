import React from 'react';
import Fontawesome from 'react-fontawesome';
import PropTypes from 'prop-types';


import { StyledSearchBar, StyledSearchBarContent} from '../styles/StyledSearchBar.js';


class SearchBar extends React.Component {
    
    static propTypes = {
    callback: PropTypes.func,
}
     
    timeOut = null;
    state = {
        theValue: "",
    }

     doSearch = event => {
        const {value} = event.target;
        const {callback} = this.props

        clearTimeout(this.timeOut);
        this.setState({theValue: value});

        this.timeOut = setTimeout(() => {
            const {theValue} = this.state;
            callback(theValue);
        }, 360)
    };

    render() {
        const {theValue} = this.state;

        return(
            <StyledSearchBar>
                <StyledSearchBarContent>
                    <Fontawesome className="fa-search" name="search" size="2x"/>
                    <input
                        type="text"
                        placeholder="Search Movie"
                        onChange={this.doSearch}
                        value={theValue}
                    />
                </StyledSearchBarContent>
            </StyledSearchBar>
        )
    }
};


export default SearchBar;