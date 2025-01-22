import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Handle debounced search
  useEffect(() => {
    const debounced = debounce((value) => setDebouncedSearch(value), 300);
    debounced(search);
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
            image: `https://source.unsplash.com/500x300/?quiz,${encodeURIComponent(
              category.name
            )}`,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-teal-400">
          Quiz Categories
        </h1>
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400"
          />
        </div>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover opacity-90 hover:opacity-100 transition duration-300"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/500x300?text=No+Image")
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-lg font-bold text-white">{category.name}</h2>
                </div>
                <Link
                  to={`/quiz/${category.id}`}
                  className="absolute bottom-4 right-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
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
    </div>
  );
};

export default CategoriesPage;
