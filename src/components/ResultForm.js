import React from "react";

const ResultForm = ({ questions, choosedAnswers, rightAnswerCount, onCreateNewQuiz }) => {

  const getColorOfScore = () => {
    if (rightAnswerCount <= 1) {
      return "bg-danger";
    }

    if (rightAnswerCount === 2 || rightAnswerCount === 3) {
      return "bg-warning";
    }

    if (rightAnswerCount === 4 || rightAnswerCount === 5) {
      return "bg-success";
    }
  }

  return (
    <>
      {
        questions.map((question, index) =>
          <QuestionItem
            key={index}
            question={question.question}
            answers={question.answers}
            choosedAnswer={choosedAnswers.find(item => item.question === question.question).answer}
            correctAnswer={question.correct_answer}
          />
        )
      }
      <p className={`result-message text-center ${getColorOfScore()}`}>
        You scored {rightAnswerCount} out of {questions.length}
      </p>
      <CreateANewQuizItem onCreateNewQuiz={onCreateNewQuiz} />
    </>
  );
};

const QuestionItem = ({ question, answers, choosedAnswer, correctAnswer }) => {

  const getColorOfAnswer = (answer) => {
    if (answer === correctAnswer) {
      // right answer
      return "success";
    }

    if (answer === choosedAnswer) {
      // wrong answer
      return "danger";
    }

    return "outline-primary";
  }

  return (
    <>
      <div className="question-item">
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className="list-answer">
          {
            answers.map((answer, index) =>
              <button
                key={index}
                className={'btn-answer ' + getColorOfAnswer(answer)}
                variant={getColorOfAnswer(answer)}
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

export const CreateANewQuizItem = ({ onCreateNewQuiz }) => {
  return (
    <div className="submit-action">
      <button onClick={onCreateNewQuiz}>
        Create a new quiz
      </button>
    </div>
  );
}

export default ResultForm;