import React, { Component } from 'react';
import classes from './styles.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import { Loader } from '../../components/UI/Loader';
import { connect } from 'react-redux';
import {
    fetchQuizById,
    quizAnswerClick,
    retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
    onAnswerClickHandler = (answerId) => {};

    isQuizFinished() {
        return this.props.activeQuestion + 1 === this.props.quiz.length;
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>
                    {this.props.loading || !this.props.quiz ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={
                                this.props.quiz[this.props.activeQuestion]
                                    .answers
                            }
                            question={
                                this.props.quiz[this.props.activeQuestion]
                                    .question
                            }
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        results: state.quiz.results,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
