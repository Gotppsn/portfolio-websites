import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/outline';

const NotFoundPage = () => {
  return (
    <div className="mt-16 flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 -mb-14">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <HomeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;