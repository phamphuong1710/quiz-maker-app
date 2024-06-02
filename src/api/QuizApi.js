import Api from './Api';

class QuizApi {

    getAllCategories = () => {
        return Api.get("/api_category.php");
    };

    getAllQuestions = (amount, categoryId, difficulty) => {
        return Api.get(`/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
    };
}

const quizApi = new QuizApi()
export default quizApi;