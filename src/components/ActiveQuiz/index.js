import React from 'react';
import classes from './styles.css';
import AnswersList from './AnswersList';

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong className={classes.QuestionNumber}>
                        {props.answerNumber}.
                    </strong>
                    {props.question}
                </span>

                <small>
                    {props.answerNumber} of {props.quizLength}
                </small>
            </p>

            <AnswersList
                state={props.state}
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
            />
        </div>
    );
};

export default ActiveQuiz;
