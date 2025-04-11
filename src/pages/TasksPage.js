import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  PlusIcon, DotsVerticalIcon, ClockIcon, 
  UserIcon, TagIcon, CalendarIcon, XIcon
} from '@heroicons/react/outline';

// Mock task data - replace with your actual data
const initialTasks = {
  'todo': [
    {
      id: 't1',
      title: 'Design homepage mockup',
      description: 'Create wireframes and mockups for the new homepage design',
      priority: 'High',
      dueDate: '2023-04-20',
      tags: ['Design', 'Homepage'],
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 't2',
      title: 'Research API integration options',
      description: 'Evaluate different APIs for the payment gateway integration',
      priority: 'Medium',
      dueDate: '2023-04-25',
      tags: ['Research', 'API'],
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 't3',
      title: 'Write documentation for backend services',
      description: 'Create comprehensive documentation for all backend services',
      priority: 'Low',
      dueDate: '2023-05-10',
      tags: ['Documentation', 'Backend'],
      assignee: null,
    },
  ],
  'in-progress': [
    {
      id: 't4',
      title: 'Implement user authentication',
      description: 'Develop user authentication system with JWT and role-based access control',
      priority: 'High',
      dueDate: '2023-04-18',
      tags: ['Development', 'Authentication', 'Security'],
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 't5',
      title: 'Create database schema',
      description: 'Design and implement the database schema for the new project',
      priority: 'Medium',
      dueDate: '2023-04-22',
      tags: ['Database', 'Design'],
      assignee: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
      },
    },
  ],
  'review': [
    {
      id: 't6',
      title: 'Code review: Product listing component',
      description: 'Review and provide feedback on the product listing component implementation',
      priority: 'Medium',
      dueDate: '2023-04-15',
      tags: ['Code Review', 'Frontend'],
      assignee: {
        name: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/40',
      },
    },
  ],
  'done': [
    {
      id: 't7',
      title: 'Setup project repository',
      description: 'Initialize Git repository and configure CI/CD pipeline',
      priority: 'High',
      dueDate: '2023-04-10',
      tags: ['DevOps', 'Setup'],
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
      completedAt: '2023-04-09',
    },
    {
      id: 't8',
      title: 'Create project documentation',
      description: 'Write initial project documentation and setup guide',
      priority: 'Medium',
      dueDate: '2023-04-12',
      tags: ['Documentation'],
      assignee: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
      },
      completedAt: '2023-04-11',
    },
  ],
};

// Column definitions
const columns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-blue-500',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-yellow-500',
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-purple-500',
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    tags: [],
    assignee: null,
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [tagInput, setTagInput] = useState('');
  
  // Filter tasks based on search term
  const getFilteredTasks = () => {
    if (!searchTerm) return tasks;
    
    const filtered = {};
    Object.keys(tasks).forEach(columnId => {
      filtered[columnId] = tasks[columnId].filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    
    return filtered;
  };
  
  const filteredTasks = getFilteredTasks();
  
  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];
    
    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
      
      setTasks({
        ...tasks,
        [source.droppableId]: newTasks,
      });
      return;
    }
    
    // Moving to a different column
    const sourceTasks = Array.from(sourceColumn);
    const [removed] = sourceTasks.splice(source.index, 1);
    
    // If moving to "done", add completedAt
    const taskToMove = {...removed};
    if (destination.droppableId === 'done') {
      taskToMove.completedAt = new Date().toISOString().split('T')[0];
    } else {
      delete taskToMove.completedAt;
    }
    
    const destinationTasks = Array.from(destinationColumn);
    destinationTasks.splice(destination.index, 0, taskToMove);
    
    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    });
  };
  
  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const newTaskItem = {
      id: `t${Date.now()}`,
      ...newTask,
    };
    
    setTasks({
      ...tasks,
      'todo': [...tasks['todo'], newTaskItem],
    });
    
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      tags: [],
      assignee: null,
    });
    
    setShowNewTaskForm(false);
  };
  
  // Add tag to new task
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    if (!newTask.tags.includes(tagInput.trim())) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, tagInput.trim()],
      });
    }
    
    setTagInput('');
  };
  
  // Remove tag from new task
  const handleRemoveTag = (tagToRemove) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags.filter(tag => tag !== tagToRemove),
    });
  };
  
  // Show task details
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  
  // Close task details
  const closeTaskDetails = () => {
    setSelectedTask(null);
  };
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tasks
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Manage your tasks using the Kanban board.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <input
                type="text"
                className="input pr-10"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              className="ml-3 btn btn-primary flex items-center"
              onClick={() => setShowNewTaskForm(true)}
            >
              <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              New Task
            </button>
          </div>
        </div>
        
        {/* Kanban Board */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:px-0">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className={`h-2 ${column.color} rounded-t-lg`}></div>
                  <div className="p-3 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {column.title}
                      <span className="ml-2 text-xs text-gray-500">
                        ({filteredTasks[column.id]?.length || 0})
                      </span>
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                    >
                      <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        className={`p-2 min-h-[400px] ${snapshot.isDraggingOver ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        {...provided.droppableProps}
                      >
                        {filteredTasks[column.id]?.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white dark:bg-gray-800 rounded-md shadow p-3 mb-2 ${
                                  snapshot.isDragging ? 'opacity-70' : ''
                                }`}
                                onClick={() => handleTaskClick(task)}
                              >
                                <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {task.title}
                                  </h4>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                  {task.description}
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <div className="flex space-x-1">
                                    {task.tags.slice(0, 2).map((tag) => (
                                      <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {task.tags.length > 2 && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        +{task.tags.length - 2}
                                      </span>
                                    )}
                                  </div>
                                  {task.assignee && (
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-6 w-6 rounded-full"
                                        src={task.assignee.avatar}
                                        alt={task.assignee.name}
                                        title={task.assignee.name}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {column.id === 'done' && task.completedAt
                                    ? `Completed: ${task.completedAt}`
                                    : `Due: ${task.dueDate}`}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
        
        {/* New Task Form */}
        {showNewTaskForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-90"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Add New Task
                      </h3>
                      <div className="mt-4 space-y-4">
                        {/* Task Title */}
                        <div>
                          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                          </label>
                          <input
                            type="text"
                            id="task-title"
                            className="mt-1 input"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          />
                        </div>
                        
                        {/* Task Description */}
                        <div>
                          <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <textarea
                            id="task-description"
                            rows="3"
                            className="mt-1 input"
                            placeholder="Task description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          ></textarea>
                        </div>
                        
                        {/* Priority and Due Date */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Priority
                            </label>
                            <select
                              id="task-priority"
                              className="mt-1 input"
                              value={newTask.priority}
                              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Due Date
                            </label>
                            <input
                              type="date"
                              id="task-due-date"
                              className="mt-1 input"
                              value={newTask.dueDate}
                              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                            />
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div>
                          <label htmlFor="task-tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tags
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              id="task-tags"
                              className="input rounded-r-none flex-1"
                              placeholder="Add tag"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddTag();
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm"
                              onClick={handleAddTag}
                            >
                              Add
                            </button>
                          </div>
                          {newTask.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {newTask.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none dark:hover:bg-primary-800"
                                    onClick={() => handleRemoveTag(tag)}
                                  >
                                    <span className="sr-only">Remove {tag} tag</span>
                                    <svg
                                      className="h-2 w-2"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 8 8"
                                    >
                                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Task Detail View */}
        {selectedTask && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeTaskDetails}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-90"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                    onClick={closeTaskDetails}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {selectedTask.title}
                      </h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {selectedTask.description}
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Due Date: <span className="font-medium">{selectedTask.dueDate}</span>
                        </span>
                      </div>
                      
                      {selectedTask.assignee && (
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div className="flex items-center">
                            <img
                              className="h-5 w-5 rounded-full mr-2"
                              src={selectedTask.assignee.avatar}
                              alt=""
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {selectedTask.assignee.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {selectedTask.tags.length > 0 && (
                      <div className="mt-6">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Tags:
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedTask.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Edit Task
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeTaskDetails}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;