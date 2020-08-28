import React from 'react';
import {Router} from '@reach/router';

import NotFound from './NotFound';
import Movie from './Movie';

import Header from './elements/header';
import Home from './Home';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
    margin:0;
    padding:0;
    box-sizing:border-box;
}
`;

const App = () => (
<React.Fragment>
    <Header/>
    <Router>
    <Home path="/"/>
    <Movie path="/:movieId"/>
    <NotFound default/>
    </Router>
    <GlobalStyle/>
</React.Fragment>
);

export default App;
