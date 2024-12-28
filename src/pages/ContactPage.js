import React from "react";

const ContactPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="w-full max-w-md bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input className="w-full border border-gray-300 p-2 rounded" type="text" id="name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input className="w-full border border-gray-300 p-2 rounded" type="email" id="email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
          <textarea className="w-full border border-gray-300 p-2 rounded" id="message" rows="4"></textarea>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;