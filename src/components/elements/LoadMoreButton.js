import React from 'react';
import PropTypes from 'prop-types';

import { StyledLoadMoreBtn} from '../styles/StyledLoadMoreBtn.js';


const LoadMoreButton = ({text, callback}) => (
<StyledLoadMoreBtn type="button" onClick={callback}>
    {text}
    </StyledLoadMoreBtn>);

LoadMoreButton.propTypes = {
    callback: PropTypes.func,
    text: PropTypes.string
}


export default LoadMoreButton;