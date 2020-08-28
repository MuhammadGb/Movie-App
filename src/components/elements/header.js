import React from 'react';
import {Link} from '@reach/router';


import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';

import {StyledHeader, StyledRMDBLogo, StyledTMDBLogo} from '../styles/StyledHeader.js';


const Header = () => (
<div>
    <StyledHeader className ="header-content">
        <Link to="/">
        <StyledRMDBLogo src={RMDBLogo} alt="rmdb_logo"/>
        </Link>
        <StyledTMDBLogo src={TMDBLogo} alt="tmdb_logo"/>
    </StyledHeader>
</div>
    );

export default Header;
