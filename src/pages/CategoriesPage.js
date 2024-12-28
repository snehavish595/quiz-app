import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => {
        const fetchedCategories = response.data.trivia_categories.map((category) => ({
          id: category.id,
          name: category.name,
          image: `https://picsum.photos/seed/${category.id}/300/200`, // Randomized placeholder images
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Quiz Categories</h1>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded shadow-md p-4 hover:shadow-lg transition duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{category.name}</h2>
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
        <p className="text-center text-lg">Loading categories...</p>
      )}
    </div>
  );
};

export default CategoriesPage;
