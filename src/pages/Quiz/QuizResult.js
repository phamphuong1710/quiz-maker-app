import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";
import ResultForm, { CreateANewQuizItem } from "../../components/ResultForm";

const QuizResult = () => {

  const navigate = useNavigate();
  const { listAnswer, questions, setListAnswer, setQuestions } =
    useContext(QuizContext);

  const getRightAnswerCount = () => {
    let count = 0;
    for (const choosedAnswer of listAnswer) {
      if (questions.find(item => item.question === choosedAnswer.question).correct_answer === choosedAnswer.answer) {
        count++;
      }
    }
    return count;
  }

  const redirectToQuizMakerPage = () => {
    setListAnswer([]);
    setQuestions([]);
    navigate("/");
  };

  if (listAnswer.length === 0) {
    return (
      <>
        <div className="container">
          <p className="text-center">You haven't been take a quiz</p>
          <CreateANewQuizItem onCreateNewQuiz={redirectToQuizMakerPage} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container">
        <div className="p-0">
          <h2 className="text-center">RESULTS</h2>
          <div className="mt-3 d-flex justify-content-center">
            <div>
              <ResultForm
                questions={questions}
                choosedAnswers={listAnswer}
                rightAnswerCount={getRightAnswerCount()}
                onCreateNewQuiz={redirectToQuizMakerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
export default QuizResult;