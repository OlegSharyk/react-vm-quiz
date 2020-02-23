import React, { Component } from 'react';
import classes from './styles.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';

class Quiz extends Component {
    state = {
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' , ''error }
        quiz: [
            {
                id: 1,
                question: 'What is colour of the sky',
                rightAnswerId: 2,
                answers: [
                    { text: 'Black', id: 1 },
                    { text: 'Blue', id: 2 },
                    { text: 'Green', id: 3 },
                    { text: 'Red', id: 4 },
                ],
            },
            {
                id: 2,
                question: 'What year of Kiyv? ',
                rightAnswerId: 4,
                answers: [
                    { text: '1234', id: 1 },
                    { text: '1233', id: 2 },
                    { text: '1231', id: 3 },
                    { text: '800', id: 4 },
                ],
            },
        ],
        results: {}, // {[id]: success, error}
    };

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];

            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                results,
                answerState: { [answerId]: 'success' },
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                results,
                answerState: { [answerId]: 'error' },
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    onRetryHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {},
        });
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {this.state.isFinished ? (
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.onRetryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={
                                this.state.quiz[this.state.activeQuestion]
                                    .answers
                            }
                            question={
                                this.state.quiz[this.state.activeQuestion]
                                    .question
                            }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
