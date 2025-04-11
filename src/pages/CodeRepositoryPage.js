import React, { useState } from 'react';
import { 
  SearchIcon, FilterIcon, PlusIcon, 
  LockClosedIcon, LockOpenIcon, TagIcon,
  ClipboardCopyIcon, TrashIcon, PencilIcon
} from '@heroicons/react/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mock data - replace with your API fetch
const codeSnippetsData = [
  {
    id: 1,
    title: 'React useState Hook Example',
    description: 'A simple example of how to use the useState hook in React',
    language: 'jsx',
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
    tags: ['React', 'Hooks', 'Frontend'],
    isPublic: true,
    createdAt: '2023-03-15',
    updatedAt: '2023-03-15',
  },
  {
    id: 2,
    title: 'Express API Route Handler',
    description: 'Basic pattern for handling API routes in Express.js',
    language: 'javascript',
    code: `const express = require('express');
const router = express.Router();

// GET all items
router.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one item
router.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;`,
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    isPublic: true,
    createdAt: '2023-02-28',
    updatedAt: '2023-03-10',
  },
  {
    id: 3,
    title: 'MongoDB Connection',
    description: 'Connect to MongoDB using Mongoose',
    language: 'javascript',
    code: `const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;`,
    tags: ['MongoDB', 'Mongoose', 'Database', 'Backend'],
    isPublic: false,
    createdAt: '2023-01-20',
    updatedAt: '2023-01-25',
  },
  {
    id: 4,
    title: 'Tailwind CSS Config',
    description: 'Custom Tailwind CSS configuration with extended theme',
    language: 'javascript',
    code: `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          700: '#6d28d9',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};`,
    tags: ['Tailwind CSS', 'Frontend', 'Configuration'],
    isPublic: true,
    createdAt: '2023-04-05',
    updatedAt: '2023-04-05',
  }
];

// Extract all unique languages and tags
const allLanguages = [...new Set(codeSnippetsData.map(snippet => snippet.language))];
const allTags = [...new Set(codeSnippetsData.flatMap(snippet => snippet.tags))];

const CodeRepositoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [snippets, setSnippets] = useState(codeSnippetsData);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  // Filter snippets based on search and filters
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = languageFilter === 'all' || snippet.language === languageFilter;
    
    const matchesTag = tagFilter === 'all' || snippet.tags.includes(tagFilter);
    
    const matchesVisibility = 
      visibilityFilter === 'all' || 
      (visibilityFilter === 'public' && snippet.isPublic) ||
      (visibilityFilter === 'private' && !snippet.isPublic);
    
    return matchesSearch && matchesLanguage && matchesTag && matchesVisibility;
  });
  
  const handleSnippetClick = (snippet) => {
    setSelectedSnippet(snippet);
  };
  
  const handleCopyCode = () => {
    if (selectedSnippet) {
      navigator.clipboard.writeText(selectedSnippet.code);
      // Could add toast notification here
    }
  };
  
  const closeSnippetDetail = () => {
    setSelectedSnippet(null);
  };
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Code Repository
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Store, organize, and share your code snippets.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              New Snippet
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="sm:flex sm:items-center sm:justify-between">
              {/* Search */}
              <div className="mt-2 sm:mt-0 w-full sm:w-1/3">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search snippets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Visibility Filter */}
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <button
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                    visibilityFilter === 'all'
                      ? 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-800'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setVisibilityFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                    visibilityFilter === 'public'
                      ? 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-800'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setVisibilityFilter('public')}
                >
                  <LockOpenIcon className="h-4 w-4 mr-1" />
                  Public
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                    visibilityFilter === 'private'
                      ? 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-800'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setVisibilityFilter('private')}
                >
                  <LockClosedIcon className="h-4 w-4 mr-1" />
                  Private
                </button>
              </div>
            </div>
            
            <div className="mt-4 sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Language Filter */}
              <div className="sm:w-1/3">
                <label htmlFor="language-filter" className="sr-only">
                  Filter by Language
                </label>
                <select
                  id="language-filter"
                  className="input"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="all">All Languages</option>
                  {allLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Tag Filter */}
              <div className="sm:w-1/3">
                <label htmlFor="tag-filter" className="sr-only">
                  Filter by Tag
                </label>
                <select
                  id="tag-filter"
                  className="input"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                >
                  <option value="all">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Reset Filters */}
              <div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchTerm('');
                    setLanguageFilter('all');
                    setTagFilter('all');
                    setVisibilityFilter('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Snippets List */}
          <div className={`${selectedSnippet ? 'hidden lg:block lg:w-1/3' : 'w-full'}`}>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSnippets.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No snippets found.</p>
                  </div>
                ) : (
                  filteredSnippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        selectedSnippet && selectedSnippet.id === snippet.id
                          ? 'bg-gray-50 dark:bg-gray-700'
                          : ''
                      }`}
                      onClick={() => handleSnippetClick(snippet)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            {snippet.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {snippet.description}
                          </p>
                        </div>
                        {snippet.isPublic ? (
                          <LockOpenIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {snippet.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {snippet.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              +{snippet.tags.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {snippet.language}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Snippet Detail View */}
          {selectedSnippet && (
            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedSnippet.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {selectedSnippet.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                      onClick={handleCopyCode}
                      title="Copy code"
                    >
                      <ClipboardCopyIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                      title="Edit snippet"
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                      title="Delete snippet"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="lg:hidden inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={closeSnippetDetail}
                      title="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-4">
                        Language: <span className="font-medium">{selectedSnippet.language}</span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-4">
                        Created: <span className="font-medium">{selectedSnippet.createdAt}</span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated: <span className="font-medium">{selectedSnippet.updatedAt}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      {selectedSnippet.isPublic ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <LockOpenIcon className="h-3 w-3 mr-1" />
                          Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          <LockClosedIcon className="h-3 w-3 mr-1" />
                          Private
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Code Display */}
                  <div className="rounded-md overflow-hidden">
                  <SyntaxHighlighter
                    language={selectedSnippet.language}
                    style={isDarkMode ? oneDark : oneLight}
                    showLineNumbers
                    customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                    >
                    {selectedSnippet.code}
                    </SyntaxHighlighter>
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSnippet.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeRepositoryPage;