import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

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
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}

      {/* Hero Section */}
      <header className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
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

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          <div className="bg-indigo-100 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="mb-4">
              <span className="text-indigo-600 text-5xl">&#9733;</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Quizzes</h3>
            <p>Engage in dynamic quizzes that offer instant feedback.</p>
          </div>
          <div className="bg-purple-100 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="mb-4">
              <span className="text-purple-600 text-5xl">&#128218;</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Diverse Topics</h3>
            <p>Explore quizzes on history, science, technology, and more!</p>
          </div>
          <div className="bg-yellow-100 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="mb-4">
              <span className="text-yellow-600 text-5xl">&#128201;</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
            <p>Monitor your scores and improve your knowledge seamlessly.</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <div className="mb-4">
              <span className="text-green-600 text-5xl">&#127919;</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Fun Challenges</h3>
            <p>Compete with friends and challenge yourself every day!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              id="testimonial-container"
            >
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <p className="text-lg italic">
                  &ldquo;This app transformed my learning experience. It's fun
                  and effective!&rdquo;
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-sm font-bold">- Jane Doe</h3>
                    <span className="text-gray-500 text-sm">Student</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <p className="text-lg italic">
                  &ldquo;Absolutely love the diverse topics. Perfect for
                  improving my general knowledge!&rdquo;
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-sm font-bold">- John Smith</h3>
                    <span className="text-gray-500 text-sm">Professional</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <p className="text-lg italic">
                  &ldquo;The user interface is sleek, and the quizzes are super
                  engaging. Highly recommend it!&rdquo;
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-sm font-bold">- Sarah Lee</h3>
                    <span className="text-gray-500 text-sm">Educator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-6 bg-gray-800 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Quiz Master. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomePage;
