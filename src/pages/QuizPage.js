import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchQuestions(categoryId);
      hasFetched.current = true;
    }
  }, [categoryId]);

  const fetchQuestions = async (categoryId) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
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
        setError("No questions available for this category.");
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Rate limit hit. Please try again later.");
      } else {
        setError("Failed to fetch questions. Please try again.");
      }
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

  if (quizFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="quiz-results p-6 max-w-3xl mx-auto text-center mt-20"> {/* Added mt-20 */}
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">Quiz Completed!</h1>
        <div className="flex justify-center items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center">
            <p className="text-3xl font-bold text-green-600">{percentage.toFixed(0)}%</p>
          </div>
        </div>
        <p className="text-xl text-gray-800 mb-6">
          You scored <span className="font-bold text-blue-500">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>.
        </p>
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container p-6 max-w-3xl mx-auto mt-16">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
        Quiz Questions
      </h1>
      {questions.map((question, index) => (
        <div
          key={index}
          className="question-card p-6 mb-6 border-2 rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-indigo-200"
        >
          <h2
            className="text-xl font-semibold text-gray-800 mb-4"
            dangerouslySetInnerHTML={{
              __html: `${index + 1}. ${question.question}`,
            }}
          />
          <ul className="options-list space-y-4">
            {question.shuffledAnswers.map((answer, i) => (
              <li key={i}>
                <button
                  className={`w-full py-3 px-5 rounded-md shadow-lg text-left transition duration-300 ${
                    selectedAnswers[index] === answer
                      ? "bg-blue-500 text-white transform scale-105"
                      : "bg-white hover:bg-blue-50"
                  }`}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => handleAnswerSelect(index, answer)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-center mt-20">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={handleFinishQuiz}
          disabled={Object.keys(selectedAnswers).length !== questions.length}
        >
          Finish Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
