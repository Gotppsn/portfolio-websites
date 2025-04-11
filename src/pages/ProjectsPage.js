import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SearchIcon, FilterIcon, PlusIcon, 
  LockClosedIcon, LockOpenIcon 
} from '@heroicons/react/outline';

// Sample project data - replace with your actual data
const projectsData = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastUpdated: '2 days ago',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    isPublic: true,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Personal portfolio website to showcase projects and skills',
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastUpdated: 'Just now',
    tags: ['React', 'Tailwind CSS', '.NET Core', 'C#'],
    isPublic: true,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    name: 'Task Management App',
    description: 'A Kanban-style task management application with drag and drop',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800',
    lastUpdated: '1 week ago',
    tags: ['React', 'Redux', 'Firebase', 'Material UI'],
    isPublic: true,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    name: 'Weather Dashboard',
    description: 'A weather dashboard application that displays current and forecast weather data',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800',
    lastUpdated: '2 weeks ago',
    tags: ['JavaScript', 'OpenWeather API', 'Bootstrap'],
    isPublic: true,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 5,
    name: 'Client Project: CRM System',
    description: 'Custom CRM system for a client with user management and reporting',
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastUpdated: '3 days ago',
    tags: ['.NET Core', 'SQL Server', 'Angular', 'Azure'],
    isPublic: false,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 6,
    name: 'Personal Blog',
    description: 'A personal blog built with Next.js and Markdown',
    status: 'Planned',
    statusColor: 'bg-blue-100 text-blue-800',
    lastUpdated: '1 month ago',
    tags: ['Next.js', 'Markdown', 'Vercel'],
    isPublic: true,
    image: 'https://via.placeholder.com/300x200',
  },
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPublic, setShowPublic] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  
  // Extract all unique tags and statuses for filters
  const allTags = [...new Set(projectsData.flatMap(project => project.tags))].sort();
  const allStatuses = [...new Set(projectsData.map(project => project.status))].sort();
  
  // Filter projects based on search term and filters
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesVisibility = (showPublic && project.isPublic) || (showPrivate && !project.isPublic);
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    const matchesTag = tagFilter === 'all' || project.tags.includes(tagFilter);
    
    return matchesSearch && matchesVisibility && matchesStatus && matchesTag;
  });
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Manage all your public and private projects in one place.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              New Project
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="sm:flex sm:items-center sm:justify-between">
              {/* Search */}
              <div className="mt-2 flex sm:mt-0 w-full sm:w-1/3">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Visibility Filter */}
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    checked={showPublic}
                    onChange={() => setShowPublic(!showPublic)}
                  />
                  <LockOpenIcon className="ml-2 h-5 w-5 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                    Public
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    checked={showPrivate}
                    onChange={() => setShowPrivate(!showPrivate)}
                  />
                  <LockClosedIcon className="ml-2 h-5 w-5 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                    Private
                  </span>
                </label>
              </div>
            </div>
            
            <div className="mt-4 sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Status Filter */}
              <div className="sm:w-1/3">
                <label htmlFor="status-filter" className="sr-only">
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  className="input"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  {allStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                    setShowPublic(true);
                    setShowPrivate(true);
                    setStatusFilter('all');
                    setTagFilter('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                {!project.isPublic && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      <LockClosedIcon className="h-3 w-3 mr-1" />
                      Private
                    </span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {project.name}
                </Link>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 h-12 overflow-hidden">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {project.lastUpdated}
                  </span>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No projects found
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;