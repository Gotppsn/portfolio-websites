import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MailIcon } from '@heroicons/react/outline';
import { 
  CalendarIcon, ClockIcon, CodeIcon, 
  DocumentTextIcon, GlobeAltIcon, 
  LinkIcon, LockClosedIcon, LockOpenIcon,
  PencilIcon, TrashIcon, ExternalLinkIcon,
  UserGroupIcon, ChevronLeftIcon 
} from '@heroicons/react/outline';

// Sample project data - replace with your actual data fetching logic
const getProject = (id) => {
  // This would normally be an API call
  const projects = {
    '1': {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React and Node.js. Includes features such as product catalog, shopping cart, user authentication, payment processing, and admin dashboard.',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      startDate: '2023-01-15',
      estimatedEndDate: '2023-06-30',
      lastUpdated: '2 days ago',
      isPublic: true,
      githubUrl: 'https://github.com/username/ecommerce-platform',
      liveUrl: 'https://ecommerce-platform.example.com',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'JWT'],
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and checkout process',
        'Payment processing with Stripe',
        'Order tracking and history',
        'Admin dashboard for product and order management',
        'Responsive design for mobile and desktop',
      ],
      technologies: [
        { name: 'Frontend', items: ['React', 'Redux', 'Tailwind CSS', 'Axios'] },
        { name: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose'] },
        { name: 'Authentication', items: ['JWT', 'bcrypt'] },
        { name: 'Payment', items: ['Stripe API'] },
        { name: 'Deployment', items: ['Docker', 'AWS'] },
      ],
      collaborators: [
        { id: 1, name: 'John Doe', role: 'Lead Developer', avatar: 'https://via.placeholder.com/40' },
        { id: 2, name: 'Jane Smith', role: 'UX Designer', avatar: 'https://via.placeholder.com/40' },
        { id: 3, name: 'Mike Johnson', role: 'Backend Developer', avatar: 'https://via.placeholder.com/40' },
      ],
      milestones: [
        { id: 1, name: 'Project Setup', date: '2023-01-15', completed: true },
        { id: 2, name: 'Backend Development', date: '2023-03-01', completed: true },
        { id: 3, name: 'Frontend Development', date: '2023-05-15', completed: false },
        { id: 4, name: 'Testing and Bug Fixing', date: '2023-06-15', completed: false },
        { id: 5, name: 'Deployment', date: '2023-06-30', completed: false },
      ],
      images: [
        'https://via.placeholder.com/800x450',
        'https://via.placeholder.com/800x450',
        'https://via.placeholder.com/800x450',
      ],
    },
  };
  
  return projects[id] || null;
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchProject = async () => {
      try {
        const data = getProject(id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);
  
  if (loading) {
    return (
      <div className="mt-16 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Project Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          The project you are looking for does not exist or has been removed.
        </p>
        <div className="mt-6">
          <Link
            to="/projects"
            className="btn btn-primary"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="py-4">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Back to Projects
          </Link>
        </div>
        
        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img
              src={project.images[currentImage]}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-white">
                  {project.name}
                </h1>
                {!project.isPublic ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-200">
                    <LockClosedIcon className="h-3 w-3 mr-1" />
                    Private
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-200">
                    <LockOpenIcon className="h-3 w-3 mr-1" />
                    Public
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-gray-200 text-sm sm:text-base">
                Last updated {project.lastUpdated}
              </p>
            </div>
            {/* Image Navigation */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2 w-2 rounded-full ${
                      currentImage === index
                        ? 'bg-white'
                        : 'bg-gray-400 bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    onClick={() => setCurrentImage(index)}
                  ></button>
                ))}
              </div>
            )}
          </div>
          
          {/* Project Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 flex justify-between items-center">
            <div className="flex space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  Live Preview
                </a>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-red-400 dark:hover:bg-gray-600"
              >
                <TrashIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        </div>
        
        {/* Project Tabs */}
        <div className="mt-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tech'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('tech')}
              >
                Tech Stack
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'milestones'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('milestones')}
              >
                Milestones
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'team'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('team')}
              >
                Team
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Project Description
                      </h2>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {project.description}
                      </p>
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Tags
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Project Details
                      </h2>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                      <dl className="space-y-4">
                        <div className="flex items-start">
                          <dt className="flex-shrink-0">
                            <CalendarIcon
                              className="h-5 w-5 text-gray-400 dark:text-gray-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Start Date:
                            </span>{' '}
                            {new Date(project.startDate).toLocaleDateString()}
                          </dd>
                        </div>
                        <div className="flex items-start">
                          <dt className="flex-shrink-0">
                            <CalendarIcon
                              className="h-5 w-5 text-gray-400 dark:text-gray-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Estimated Completion:
                            </span>{' '}
                            {new Date(project.estimatedEndDate).toLocaleDateString()}
                          </dd>
                        </div>
                        <div className="flex items-start">
                          <dt className="flex-shrink-0">
                            <ClockIcon
                              className="h-5 w-5 text-gray-400 dark:text-gray-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Last Updated:
                            </span>{' '}
                            {project.lastUpdated}
                          </dd>
                        </div>
                        <div className="flex items-start">
                          <dt className="flex-shrink-0">
                            <UserGroupIcon
                              className="h-5 w-5 text-gray-400 dark:text-gray-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Team Size:
                            </span>{' '}
                            {project.collaborators.length} members
                          </dd>
                        </div>
                        {project.githubUrl && (
                          <div className="flex items-start">
                            <dt className="flex-shrink-0">
                              <CodeIcon
                                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Repository:
                              </span>{' '}
                              <a
                                href={project.githubUrl}
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                GitHub
                              </a>
                            </dd>
                          </div>
                        )}
                        {project.liveUrl && (
                          <div className="flex items-start">
                            <dt className="flex-shrink-0">
                              <GlobeAltIcon
                                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Live URL:
                              </span>{' '}
                              <a
                                href={project.liveUrl}
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.liveUrl.replace(/^https?:\/\//, '')}
                              </a>
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Features & Functionality
                  </h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Tech Stack Tab */}
            {activeTab === 'tech' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Technology Stack
                  </h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    {project.technologies.map((category, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {category.items.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Project Milestones
                  </h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="relative">
                    <ul className="space-y-8">
                      {project.milestones.map((milestone, index) => (
                        <li key={milestone.id} className="relative">
                          <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                            <div className={`absolute left-[-4px] top-2 w-3 h-3 rounded-full ${
                              milestone.completed
                                ? 'bg-green-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}></div>
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {milestone.name}
                              </h3>
                              <div className="flex items-center mt-1">
                                <CalendarIcon
                                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(milestone.date).toLocaleDateString()}
                                </span>
                                {milestone.completed && (
                                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    Completed
                                  </span>
                                )}
                                {!milestone.completed && new Date(milestone.date) < new Date() && (
                                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                    Overdue
                                  </span>
                                )}
                                {!milestone.completed && new Date(milestone.date) >= new Date() && (
                                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    Upcoming
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Project Team
                  </h2>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {project.collaborators.map((member) => (
                      <li key={member.id} className="col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-gray-900 text-sm font-medium truncate dark:text-white">
                                {member.name}
                              </h3>
                            </div>
                            <p className="mt-1 text-gray-500 text-sm truncate dark:text-gray-400">
                              {member.role}
                            </p>
                          </div>
                          <img
                            className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                            src={member.avatar}
                            alt={member.name}
                          />
                        </div>
                        <div>
                          <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-600">
                            <div className="w-0 flex-1 flex">
                              <button
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                              >
                                <MailIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">Email</span>
                              </button>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                              <button
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                              >
                                <LinkIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">Profile</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;