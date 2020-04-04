import React, { Component } from 'react';
import classes from './styles.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {
    renderList = () => {
        return this.props.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    };

    componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h2>Test List</h2>

                    {this.props.loading && this.props.quizes.length !== 0 ? (
                        <Loader />
                    ) : (
                        <ul>{this.renderList()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        quizes: state.quiz.quizes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
