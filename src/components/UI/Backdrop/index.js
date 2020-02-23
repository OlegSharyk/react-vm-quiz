import React from 'react';
import classes from './styles.css';

const Backdrop = props => (
    <div className={classes.Backdrop} onClick={props.onClick}></div>
);

export default Backdrop;
