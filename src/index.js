import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import './index.css';
import PropTypes from 'prop-types';
import Fetch from 'react-fetch';
// import Draggable from 'react-draggable';

ReactDOM.render(<Board count={10} />, document.getElementById('root'));