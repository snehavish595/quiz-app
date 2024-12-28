import React, { useState } from "react";
import {motion} from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import QuizResult from "../components/QuizResult";

const QuizPage = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Berlin"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Homer"],
      answer: "William Shakespeare",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (option) => {
    if (isAnswered) return;

    setIsAnswered(true);
    if (option === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }

    setTimeout(() => {
      setFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowResult(true);
      }
      setIsAnswered(false);
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setFeedback(null);
    setIsAnswered(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {showResult ? (
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <div className="text-center">
          <QuestionCard
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onSelectOption={handleOptionSelect}
          />
          {feedback && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold mt-4"
            >
              {feedback}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;