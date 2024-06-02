import React from "react";
import { useLocation } from "react-router-dom";
import { QuizProvider } from "../context/QuizContext";
import QuizForm from "./Quiz/QuizForm";
import QuizResult from "./Quiz/QuizResult";

const Quiz = () => {
  const location = useLocation();
  return (
    <QuizProvider>
      {location.pathname === "/" ? <QuizForm /> : <QuizResult />}
    </QuizProvider>
  );
};
export default Quiz;