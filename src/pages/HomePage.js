import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mt-12 mb-6"
      >
        Welcome to the Quiz App
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-lg max-w-md mb-4">
          Test your knowledge across a variety of topics with our engaging quizzes! Ready to challenge yourself?
        </p>
        <Link
          to="/categories"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Explore Categories
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto mb-12">
        <div className="p-6 bg-white rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Interactive Quizzes</h2>
          <p>Enjoy a seamless and interactive quiz experience with animations and instant feedback.</p>
        </div>
        <div className="p-6 bg-white rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Diverse Topics</h2>
          <p>Challenge yourself with quizzes on science, math, history, and more!</p>
        </div>
        <div className="p-6 bg-white rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Track Your Progress</h2>
          <p>View your scores and improve your knowledge with every attempt.</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-4 bg-blue-500 text-white text-center rounded"
      >
        <h2 className="text-2xl font-bold mb-2">Join Us Today!</h2>
        <p>Sign up and become a part of our vibrant learning community.</p>
      </motion.div>
    </div>
  );
};

export default HomePage;