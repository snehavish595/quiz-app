import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const features = [
  {
    icon: "\u2605",
    title: "Interactive Quizzes",
    text: "Engage in dynamic quizzes that offer instant feedback.",
    color: "indigo",
  },
  {
    icon: "\ud83d\udcda",
    title: "Diverse Topics",
    text: "Explore quizzes on history, science, technology, and more!",
    color: "purple",
  },
  {
    icon: "\ud83d\udcc9",
    title: "Track Your Progress",
    text: "Monitor your scores and improve your knowledge seamlessly.",
    color: "yellow",
  },
  {
    icon: "\ud83c\udfc3",
    title: "Fun Challenges",
    text: "Compete with friends and challenge yourself every day!",
    color: "green",
  },
];

const categories = [
  {
    name: "Science",
    description: "Dive into fascinating scientific facts.",
    color: "blue",
    path: "/quiz/science",
  },
  {
    name: "History",
    description: "Explore historic events and milestones.",
    color: "green",
    path: "/quiz/history",
  },
  {
    name: "Technology",
    description: "Test your knowledge about tech trends.",
    color: "orange",
    path: "/quiz/technology",
  },
  {
    name: "General Knowledge",
    description: "Challenge yourself with trivia questions.",
    color: "purple",
    path: "/quiz/general-knowledge",
  },
];

const HomePage = () => {
  useEffect(() => {
    gsap.fromTo(
      ".hero-heading",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(
      ".hero-button",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 1 }
    );
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 w-full">
      <header className="flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white h-[586px]">
        <h1 className="text-6xl font-extrabold mb-4 hero-heading">
          Quiz Master
        </h1>
        <p className="text-2xl max-w-2xl text-center mb-6 hero-text">
          Discover a world of knowledge with fun, interactive quizzes!
        </p>
        <Link
          to="/categories"
          className="px-8 py-4 bg-yellow-400 text-gray-800 rounded-lg font-bold shadow-lg hover:shadow-2xl hover:bg-yellow-500 transition duration-300 hero-button"
        >
          Start Exploring
        </Link>
      </header>

      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {features.map(({ icon, title, text, color }, index) => (
            <div
              key={index}
              className={`bg-${color}-100 rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-105 transition transform duration-300`}
            >
              <div className="mb-4 text-5xl text-center">{icon}</div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Explore Categories</h2>
            <Link
              to="/categories"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(({ name, description, color, path }, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Use inline styles for background color */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition duration-300 rounded-lg"
                  style={{ backgroundColor: color }}
                ></div>
                <div className="relative p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{description}</p>
                  <Link
                    to={path}
                    className="px-4 py-2 text-white rounded-md font-medium transition duration-300"
                    style={{ backgroundColor: color }}
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-lg mb-6">
          Subscribe to our newsletter for the latest quizzes and updates.
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-auto px-4 py-2 rounded-md text-gray-800"
          />
          <button
            type="submit"
            className="bg-yellow-400 px-6 py-2 rounded-md font-bold hover:bg-yellow-500 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
