import React from 'react';

const NotFoundPage = () => {
  return (
    <div 
      className="h-screen bg-teal-500 flex items-center justify-center text-white"
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">Oops! Page not found.</p>
        <a 
          href="/" 
          className="mt-6 inline-block px-4 py-2 bg-white text-teal-500 font-semibold rounded hover:bg-gray-100 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;