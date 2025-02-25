import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const QuizPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [reviewMode, setReviewMode] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      console.log("Category ID:", categoryId);

      fetchQuestions(categoryId, difficulty);
      hasFetched.current = true;
    }
  }, [categoryId, difficulty]);

  const fetchQuestions = async (categoryId, difficulty) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      );

      if (response.data.response_code === 0) {
        setQuestions(
          response.data.results.map((question) => ({
            ...question,
            shuffledAnswers: shuffleAnswers([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
          }))
        );
      } else {
        setError("No questions available for this category and difficulty.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shuffleAnswers = (answers) => {
    return answers
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);
  };

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const handleFinishQuiz = () => {
    const calculatedScore = questions.reduce((total, question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        return total + 1;
      }
      return total;
    }, 0);

    setScore(calculatedScore);
    setQuizFinished(true);
  };

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (quizFinished && !reviewMode) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        className="quiz-results p-6 max-w-3xl mx-auto text-center mt-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          Quiz Completed!
        </h1>
        <div className="flex justify-center items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center">
            <p className="text-3xl font-bold text-green-600">
              {percentage.toFixed(0)}%
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-800 mb-6">
          You scored <span className="font-bold text-blue-500">{score}</span>{" "}
          out of <span className="font-bold">{questions.length}</span>.
        </p>
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          Retake Quiz
        </button>
        <button
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={() => setReviewMode(true)}
        >
          View Answers
        </button>

        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={() => navigate("/categories")}
        >
          Try Another Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="quiz-container p-6 max-w-3xl mx-auto mt-16">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
        Quiz Questions
      </h1>
      <label htmlFor="difficulty" className="block mb-4 text-lg font-medium">
        Select Difficulty:
      </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-8"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      {questions.map((question, index) => (
  <motion.div
    key={index}
    className="question-card p-6 mb-6 border-2 rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-indigo-200"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2
      className="text-xl font-semibold text-gray-800 mb-4"
      dangerouslySetInnerHTML={{
        __html: `${index + 1}. ${question.question}`,
      }}
    />
    <ul className="options-list space-y-4">
      {question.shuffledAnswers.map((answer, i) => {
        const isCorrect = answer === question.correct_answer;
        const isSelected = selectedAnswers[index] === answer;
        let buttonStyle = "bg-white hover:bg-blue-50"; // Default

        if (reviewMode) {
          if (isSelected && isCorrect) {
            buttonStyle = "bg-green-500 text-white"; // Correct selection (green)
          } else if (isSelected && !isCorrect) {
            buttonStyle = "bg-red-500 text-white"; // Wrong selection (red)
          } else if (!isSelected && isCorrect) {
            buttonStyle = "bg-green-300 text-white"; // Correct answer (green)
          }
        } else {
          if (isSelected) {
            buttonStyle = "bg-blue-500 text-white transform scale-105"; // Selected option
          }
        }

        return (
          <li key={i}>
            <button
              className={`w-full py-3 px-5 rounded-md shadow-lg text-left transition duration-300 ${buttonStyle}`}
              dangerouslySetInnerHTML={{ __html: answer }}
              onClick={() => !reviewMode && handleAnswerSelect(index, answer)}
            />
          </li>
        );
      })}
    </ul>
  </motion.div>
))}


      <div className="text-center mt-20">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={handleFinishQuiz}
          disabled={
            Object.keys(selectedAnswers).length !== questions.length ||
            reviewMode
          }
        >
          Finish Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
