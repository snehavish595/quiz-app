import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce function
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch categories with caching
  useEffect(() => {
    const fetchCategories = async () => {
      const cachedCategories = localStorage.getItem("categories");
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
      } else {
        try {
          const response = await axios.get("https://opentdb.com/api_category.php");
          const fetchedCategories = response.data.trivia_categories.map((category) => ({
            id: category.id,
            name: category.name,
          }));
          setCategories(fetchedCategories);
          localStorage.setItem("categories", JSON.stringify(fetchedCategories));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16 pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
          Choose a Category
        </h1>
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <div
                key={category.id}
                className="relative bg-white shadow-xl rounded-2xl overflow-hidden p-6 text-center transition-transform transform hover:-translate-y-2 border-t-4 border-purple-500"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-md">
                  🏆
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">{category.name}</h2>
                <p className="text-gray-600 text-sm mb-4">Test your knowledge with this category</p>
                <Link
                  to={`/quiz/${category.id}`}
                  className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300"
                >
                  Start Quiz
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No categories found...</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;