import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import QuizApi from "../api/QuizApi";
import { QuizContext } from "../context/QuizContext";

const QuizFilterForm = ({isSubmitting, onSubmit }) => {

  const [categories, setCategories] =  useState([]);
  const [disableBtn, setDisableBtn] =  useState(true);
  const { setListAnswer, setQuestions } =
    useContext(QuizContext);

  const difficultyList = [
    {
      "option": "Easy",
      "value": "easy"
    },
    {
      "option": "Medium",
      "value": "medium"
    },
    {
      "option": "Hard",
      "value": "hard"
    }
  ];

  const initForm = {
    categoryId: "",
    difficulty: ""
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const data = await QuizApi.getAllCategories();
    setCategories(data.trivia_categories);
    setDisableBtn(false);
  }

  const validationForm = Yup.object({
    categoryId: Yup.number()
        .required('Required'),
    difficulty: Yup.string()
        .required('Required')
  });

  const handleSubmitForm = async(formData) => {
    try {
      setDisableBtn(true);
      // get question from api
      const data = await QuizApi.getAllQuestions(
        5,
        formData.categoryId,
        formData.difficulty
      );
      // shuffle answers
      let allQuestion = data.results.map(question => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers].sort(
          () => Math.random() - 0.5
        )
      }));
      setListAnswer([]);
      setQuestions(allQuestion);
    } catch (error) {
      alert('Something went wrong! Please try again!')
    }
    setDisableBtn(false);
  }

  return (
    <>

      <Formik
        initialValues={initForm}
        validationSchema={validationForm}
        onSubmit={handleSubmitForm}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className={"form-group" + (!!touched.categoryId && errors.categoryId ? " error" : "")}>
                  {/* Category */}
                  <select
                    id="categorySelect"
                    name="categoryId"
                    className="select"
                    value={values.categoryId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select a category</option>
                    {
                      categories.map(category =>
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    }
                  </select>
                  {!!touched.categoryId && (
                    <div className="input-feedback">
                      {errors.categoryId}
                    </div>
                  )}
                </div>
                <div className={"form-group" + (!!touched.difficulty && errors.difficulty ? " error" : "")}>
                  <select
                    id="difficultySelect"
                    className="select"
                    name="difficulty"
                    value={values.difficulty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: "block" }}
                  >
                    <option disabled value="">Select difficulty</option>
                    {
                      difficultyList.map((difficulty, index) =>
                        <option key={index} value={difficulty.value}>
                            {difficulty.option}
                        </option>
                      )
                    }
                  </select>
                  {!!touched.difficulty && (
                    <div className="input-feedback">{errors.difficulty}</div>
                  )}
                </div>

                <button
                  id="createBtn"
                  className="btn-create"
                  type="submit"
                  variant="primary"
                  disabled={disableBtn}
                >
                  Create
                </button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default QuizFilterForm;