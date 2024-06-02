import { useState, createContext } from "react";

export const QuizContext = createContext();


export const QuizProvider = props => {
  const [listAnswer, setListAnswer] =  useState([]);
  const [questions, setQuestions] =  useState([]);

  return (
    <QuizContext.Provider
      value={{ listAnswer, questions, setListAnswer, setQuestions }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

