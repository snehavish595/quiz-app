import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => {
        const fetchedCategories = response.data.trivia_categories.map(
          (category) => ({
            id: category.id,
            name: category.name,
            image: `https://source.unsplash.com/300x200/?${encodeURIComponent(
              category.name
            )}`,
          })
        );
        setCategories(fetchedCategories);
        gsap.fromTo(
          ".category-card",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
        );
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Quiz Categories</h1>
      <div className="container mx-auto px-4 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 category-card"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                {category.name}
              </h2>
              <Link
                to={`/quiz/${category.id}`}
                className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No categories found...</p>
      )}
    </div>
  );
};

export default CategoriesPage;
