import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Page Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;