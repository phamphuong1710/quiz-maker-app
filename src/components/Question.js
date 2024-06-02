import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";

const Question = () => {
  const navigate = useNavigate();
  const { listAnswer, questions } = useContext(QuizContext);

  const redirectToQuizResultPage = () => {
    window.scrollTo(0, 0);
    navigate("/result");
  };

  return (
    <>
      {
        questions.map((question, index) =>
          <QuestionItem
            key={index}
            question={question.question}
            answers={question.answers}
          />
        )
      }
      {
        (questions.length !== 0 && questions.length === listAnswer.length) &&
        <div className="submit-action">
          <button onClick={redirectToQuizResultPage}>
              Submit
          </button>
        </div>

      }
    </>
  );
};

const QuestionItem = ({ question, answers, choosedAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const { setListAnswer } = useContext(QuizContext);
  const handleAnswerClick = ({question, answer}) => {
    setSelectedAnswer(answer);
    // add new answer
    setListAnswer((prevAnswers) => {
      // Remove previous answer if exists
      const oldAnswerIndex = prevAnswers.findIndex(item => item.question === question);
      if (oldAnswerIndex > -1) {
          prevAnswers.splice(oldAnswerIndex, 1);
      }
      const choosedAnswer  = {
        question: question,
        answer: answer
      };
      return [...prevAnswers, choosedAnswer];
    });
  };

  return (
    <>
      <div className="question-item">
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className="list-answer">
          {
            answers.map((answer, index) =>
              <button
                key={index}
                className={`btn btn-answer ${
                  selectedAnswer === answer 
                    ? "select-item"
                    : ""
                  }
                `}
                onClick={() => handleAnswerClick({ question, answer })}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Question;