import React from 'react';
import { Link } from 'react-router-dom';
import { 
    HomeIcon, 
    UserIcon, 
    RectangleStackIcon as CollectionIcon, 
    CodeBracketIcon as CodeIcon, 
    ClipboardDocumentCheckIcon as ClipboardCheckIcon, 
    CalendarIcon, 
    Cog6ToothIcon as CogIcon 
  } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Sample data - replace with your actual data
const stats = [
  { name: 'Projects', value: '12', icon: CollectionIcon },
  { name: 'Code Snippets', value: '36', icon: CodeIcon },
  { name: 'Tasks', value: '8', icon: ClipboardCheckIcon },
  { name: 'Events', value: '4', icon: CalendarIcon },
];

const recentProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastUpdated: '2 days ago',
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Personal portfolio website to showcase projects and skills',
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastUpdated: 'Just now',
  },
  {
    id: 3,
    name: 'Task Management App',
    description: 'A Kanban-style task management application with drag and drop',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800',
    lastUpdated: '1 week ago',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Complete portfolio homepage',
    dueDate: 'Today',
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-800',
  },
  {
    id: 2,
    title: 'Deploy project to production',
    dueDate: 'Tomorrow',
    priority: 'Medium',
    priorityColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 3,
    title: 'Update code documentation',
    dueDate: 'Next Week',
    priority: 'Low',
    priorityColor: 'bg-green-100 text-green-800',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Client Meeting',
    date: 'Today, 2:00 PM',
    type: 'Meeting',
  },
  {
    id: 2,
    title: 'Project Deadline',
    date: 'Apr 15, 11:59 PM',
    type: 'Deadline',
  },
  {
    id: 3,
    title: 'Tech Conference',
    date: 'Apr 20 - Apr 22',
    type: 'Conference',
  },
];

const HomePage = () => {
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-8 md:py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Welcome to Your Portfolio Dashboard
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Manage your projects, code, tasks, and events all in one place.
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon 
                      className="h-6 w-6 text-primary-600 dark:text-primary-400" 
                      aria-hidden="true" 
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Projects Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Projects</h2>
              <Link
                to="/projects"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">
                            {project.name}
                          </p>
                          <div className={`ml-2 flex-shrink-0 inline-flex ${project.statusColor} px-2 py-0.5 text-xs font-medium rounded-full`}>
                            {project.status}
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                          {project.lastUpdated}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tasks and Events */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Tasks</h2>
                <Link
                  to="/tasks"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingTasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      to={`/tasks?id=${task.id}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {task.title}
                          </p>
                          <div className={`ml-2 flex-shrink-0 inline-flex ${task.priorityColor} px-2 py-0.5 text-xs font-medium rounded-full`}>
                            {task.priority}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClipboardCheckIcon 
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" 
                              aria-hidden="true" 
                            />
                            Due: {task.dueDate}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h2>
                <Link
                  to="/calendar"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <Link
                      to={`/calendar?event=${event.id}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {event.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                            {event.type}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarIcon 
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" 
                              aria-hidden="true" 
                            />
                            {event.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;