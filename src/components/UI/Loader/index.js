import React from 'react';
import classes from './styles.css';

export const Loader = () => {
    return (
        <div className={classes.LoaderWrapper}>
            <div className={classes.Loader}>
                <div />
                <div />
            </div>
        </div>
    );
};

export default Loader;
