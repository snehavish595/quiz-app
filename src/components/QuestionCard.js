import React from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ question, options, onSelectOption }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-4 border rounded shadow-md bg-white"
    >
      <h2 className="text-lg font-bold mb-3">{question}</h2>
      {options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => onSelectOption(option)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="block w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {option}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuestionCard;