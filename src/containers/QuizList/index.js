import React, { Component } from 'react';
import classes from './styles.css';
import { NavLink } from 'react-router-dom';

export default class QuizList extends Component {
    renderList = () => {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>Test {quiz}</NavLink>
                </li>
            );
        });
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h2>Test List</h2>
                    <ul>{this.renderList()}</ul>
                </div>
            </div>
        );
    }
}
