import React, { Component, Fragment } from 'react';
import classes from './styles.css';
import Backdrop from '../../UI/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
    {
        to: '/',
        label: 'List',
        exact: true,
    },
    {
        to: '/auth',
        label: 'Auth',
        exact: false,
    },
    {
        to: '/quiz-creator',
        label: 'Create Test',
        exact: false,
    },
];

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        exact={link.exact}
                        to={link.to}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <Fragment>
                <nav className={cls.join(' ')}>
                    <ul>{this.renderLinks()}</ul>
                </nav>
                {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
            </Fragment>
        );
    }
}

export default Drawer;
