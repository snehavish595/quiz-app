import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
  const [isFinished, setIsFinished] = useState(false); // Track if the quiz is finished
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (categoryId) {
      fetchQuestionsWithRetry(categoryId);
    }
  }, [categoryId]);

  // Function to fetch questions with retry logic for rate limits
  const fetchQuestionsWithRetry = async (categoryId, retries = 3, delay = 2000) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
      );

      if (response.data.response_code === 0) {
        const fetchedQuestions = response.data.results.map((question) => ({
          ...question,
          shuffledAnswers: shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
        setQuestions(fetchedQuestions);
      } else if (response.data.response_code === 1) {
        setError("No questions available for this category.");
      } else {
        setError("Invalid request. Please try again.");
      }
    } catch (err) {
      if (err.response?.status === 429 && retries > 0) {
        if (!error) { // Only show this once
          setError("Rate limit exceeded. Retrying...");
        }
        setTimeout(() => fetchQuestionsWithRetry(categoryId, retries - 1, delay), delay);
      } else {
        setError("An error occurred while fetching questions. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Shuffle answers to randomize the order
  const shuffleAnswers = (answers) => {
    return answers
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);
  };

  // Handle selecting an answer
  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  // Handle finish quiz
  const handleFinishQuiz = () => {
    setIsFinished(true);
    // Optionally, navigate to a results page or show results here
    navigate("/results"); // Redirect to results page after finishing
  };

  return (
    <div className="quiz-container p-6 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Time!</h1>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-lg font-semibold">Loading questions...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3
                className="font-medium text-lg mb-2"
                dangerouslySetInnerHTML={{
                  __html: `${index + 1}. ${question.question}`,
                }}
              />
              <ul className="mt-2">
                {question.shuffledAnswers.map((answer, i) => (
                  <li key={i} className="mt-2">
                    <button
                      className={`w-full p-3 rounded-lg text-left ${
                        selectedAnswers[index] === answer
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      } shadow-md`}
                      dangerouslySetInnerHTML={{ __html: answer }}
                      onClick={() => handleAnswerSelect(index, answer)} // Set selected answer
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!isFinished && questions.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleFinishQuiz}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            Finish Quiz
          </button>
        </div>
      )}

      {isFinished && (
        <div className="text-center mt-6">
          <p className="font-semibold text-xl">Quiz Completed!</p>
          <p className="text-lg">Your score is: {/* Calculate score here */}</p>
          {/* Optionally, you can display the score here */}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
