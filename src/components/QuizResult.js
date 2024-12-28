import React from "react";
import { motion } from "framer-motion";

const QuizResult = ({ score, totalQuestions, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 border rounded shadow-md bg-white text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p className="text-lg mb-4">
        You scored {score} out of {totalQuestions}
      </p>
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Restart Quiz
      </motion.button>
    </motion.div>
  );
};

export default QuizResult;
