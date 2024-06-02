import React from "react";
import QuizFilterForm from "../../components/QuizFilterForm";
import Question from "../../components/Question";

const QuizForm = () => {
  return (
    <>
      <div className="container">
        <h2 className="text-center">QUIZ MAKER</h2>
        <QuizFilterForm />
        <Question />
      </div>
    </>
  );
};
export default QuizForm;