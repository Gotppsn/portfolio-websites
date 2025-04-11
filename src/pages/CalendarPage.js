
import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, ChevronLeftIcon, ChevronRightIcon, 
  XIcon, ClockIcon, LocationMarkerIcon, UsersIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';

// Mock calendar data - replace with your actual data
const initialEvents = [
  {
    id: 1,
    title: 'Project Kickoff Meeting',
    description: 'Initial meeting to discuss project goals and timeline',
    startDate: '2023-04-15T09:00:00',
    endDate: '2023-04-15T10:30:00',
    type: 'meeting',
    location: 'Conference Room A',
    attendees: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Mike Johnson', email: 'mike@example.com' },
    ],
    color: 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  },
  {
    id: 2,
    title: 'Client Presentation',
    description: 'Present project progress to the client',
    startDate: '2023-04-18T14:00:00',
    endDate: '2023-04-18T15:00:00',
    type: 'meeting',
    location: 'Virtual - Zoom',
    attendees: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ],
    color: 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
  },
  {
    id: 3,
    title: 'Backend API Development',
    description: 'Focus time for developing backend API endpoints',
    startDate: '2023-04-17T10:00:00',
    endDate: '2023-04-17T13:00:00',
    type: 'task',
    color: 'bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  },
  {
    id: 4,
    title: 'Project Deadline',
    description: 'Final submission deadline for current project phase',
    startDate: '2023-04-21T23:59:59',
    endDate: '2023-04-21T23:59:59',
    type: 'deadline',
    color: 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200',
  },
  {
    id: 5,
    title: 'Team Lunch',
    description: 'Team building lunch',
    startDate: '2023-04-19T12:00:00',
    endDate: '2023-04-19T13:30:00',
    type: 'personal',
    location: 'Pizzeria Downtown',
    attendees: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Mike Johnson', email: 'mike@example.com' },
      { name: 'Sarah Williams', email: 'sarah@example.com' },
    ],
    color: 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  },
];

// Event type configurations
const eventTypes = {
  meeting: {
    icon: UsersIcon,
    label: 'Meeting',
    color: 'text-blue-600 dark:text-blue-400',
  },
  task: {
    icon: DocumentTextIcon,
    label: 'Task',
    color: 'text-purple-600 dark:text-purple-400',
  },
  deadline: {
    icon: ClockIcon,
    label: 'Deadline',
    color: 'text-red-600 dark:text-red-400',
  },
  personal: {
    icon: LocationMarkerIcon,
    label: 'Personal',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
};

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDateFull = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
};

const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'meeting',
    location: '',
    attendees: [],
  });
  
  // Generate calendar days for the current month
  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, viewMode]);
  
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate the number of days to show from the previous month
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate total days to display (42 = 6 rows of 7 days)
    const totalDays = 42;
    
    // Generate all calendar days
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    // Add days from current month
    const currentMonthDays = lastDay.getDate();
    const today = new Date();
    
    for (let i = 1; i <= currentMonthDays; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
      });
    }
    
    // Add days from next month
    const remainingDays = totalDays - days.length;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    setCalendarDays(days);
  };
  
  // Handle month navigation
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Get events for a specific day
  const getEventsForDay = (date) => {
    return events.filter(event => isSameDay(new Date(event.startDate), date));
  };
  
  // Handle click on a date
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  
  // Open event details
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };
  
  // Close event details
  const closeEventDetails = () => {
    setSelectedEvent(null);
  };
  
  // Open new event form
  const openNewEventForm = () => {
    // Set default start and end times for new event
    const now = new Date();
    const startHour = now.getHours();
    const roundedMinutes = Math.ceil(now.getMinutes() / 15) * 15;
    
    const startDate = selectedDate || new Date();
    startDate.setHours(startHour);
    startDate.setMinutes(roundedMinutes);
    
    const endDate = new Date(startDate);
    endDate.setHours(startHour + 1);
    
    setNewEvent({
      ...newEvent,
      startDate: startDate.toISOString().slice(0, 16),
      endDate: endDate.toISOString().slice(0, 16),
    });
    
    setShowEventForm(true);
  };
  
  // Close new event form
  const closeEventForm = () => {
    setShowEventForm(false);
  };
  
  // Add a new event
  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    
    const eventColors = [
      'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
      'bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200',
      'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
      'bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    ];
    
    const newEventItem = {
      id: Date.now(),
      ...newEvent,
      color: eventColors[Math.floor(Math.random() * eventColors.length)],
    };
    
    setEvents([...events, newEventItem]);
    setNewEvent({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      type: 'meeting',
      location: '',
      attendees: [],
    });
    
    setShowEventForm(false);
  };
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calendar
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Manage your schedule and events.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn btn-primary flex items-center"
              onClick={openNewEventForm}
            >
              <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              New Event
            </button>
          </div>
        </div>
        
        {/* Calendar Controls */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
          <div className="px-4 py-4 sm:px-6 flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="ml-4 flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                  onClick={previousMonth}
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                  onClick={nextMonth}
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="ml-2 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <div className="flex space-x-2 border border-gray-300 dark:border-gray-600 rounded-md p-0.5">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    viewMode === 'month'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setViewMode('month')}
                >
                  Month
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    viewMode === 'week'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setViewMode('week')}
                >
                  Week
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    viewMode === 'day'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setViewMode('day')}
                >
                  Day
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Month View */}
        {viewMode === 'month' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-6 h-full">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day.date);
                
                return (
                  <div
                    key={index}
                    className={`min-h-[100px] border-b border-r border-gray-200 dark:border-gray-700 ${
                      day.isCurrentMonth
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600'
                    } ${
                      day.isToday
                        ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
                        : ''
                    } ${
                      selectedDate && isSameDay(day.date, selectedDate)
                        ? 'ring-2 ring-inset ring-primary-600 dark:ring-primary-500'
                        : ''
                    }`}
                    onClick={() => handleDateClick(day.date)}
                  >
                    <div className="p-2">
                      <div className={`text-center rounded-full w-7 h-7 flex items-center justify-center mx-auto ${
                        day.isToday
                          ? 'bg-primary-600 text-white'
                          : ''
                      }`}>
                        {day.date.getDate()}
                      </div>
                      
                      {/* Events */}
                      <div className="mt-1 max-h-24 overflow-y-auto">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`px-2 py-1 mb-1.5 rounded text-xs ${event.color} truncate cursor-pointer`}
                            onClick={(e) => handleEventClick(event, e)}
                          >
                            {formatDate(event.startDate)} {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Week View (simplified) */}
        {viewMode === 'week' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Week view implementation would go here with hourly slots for each day of the week.
            </div>
          </div>
        )}
        
        {/* Day View (simplified) */}
        {viewMode === 'day' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Day view implementation would go here with hourly slots for the selected day.
            </div>
          </div>
        )}
        
        {/* New Event Form */}
        {showEventForm && (
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
                        Add New Event
                      </h3>
                      <div className="mt-4 space-y-4">
                        {/* Event Title */}
                        <div>
                          <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                          </label>
                          <input
                            type="text"
                            id="event-title"
                            className="mt-1 input"
                            placeholder="Event title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          />
                        </div>
                        
                        {/* Event Description */}
                        <div>
                          <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <textarea
                            id="event-description"
                            rows="3"
                            className="mt-1 input"
                            placeholder="Event description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          ></textarea>
                        </div>
                        
                        {/* Event Type */}
                        <div>
                          <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Type
                          </label>
                          <select
                            id="event-type"
                            className="mt-1 input"
                            value={newEvent.type}
                            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                          >
                            {Object.entries(eventTypes).map(([type, config]) => (
                              <option key={type} value={type}>
                                {config.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Start and End Date/Time */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="event-start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Start
                            </label>
                            <input
                              type="datetime-local"
                              id="event-start"
                              className="mt-1 input"
                              value={newEvent.startDate}
                              onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="event-end" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              End
                            </label>
                            <input
                              type="datetime-local"
                              id="event-end"
                              className="mt-1 input"
                              value={newEvent.endDate}
                              onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                            />
                          </div>
                        </div>
                        
                        {/* Location (for meeting and personal) */}
                        {(newEvent.type === 'meeting' || newEvent.type === 'personal') && (
                          <div>
                            <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Location
                            </label>
                            <input
                              type="text"
                              id="event-location"
                              className="mt-1 input"
                              placeholder="Event location"
                              value={newEvent.location || ''}
                              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEventForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Event Detail View */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeEventDetails}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-90"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
                    onClick={closeEventDetails}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="flex items-center">
                      {selectedEvent.type && eventTypes[selectedEvent.type] && (
                        <div className={`h-6 w-6 mr-2 ${eventTypes[selectedEvent.type].color}`}>
                          {React.createElement(eventTypes[selectedEvent.type].icon, {
                            'aria-hidden': 'true'
                          })}
                        </div>
                      )}
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {selectedEvent.title}
                      </h3>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {selectedEvent.description}
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mb-3">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>
                          {formatDateFull(selectedEvent.startDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>
                          {formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}
                        </span>
                      </div>
                      
                      {selectedEvent.location && (
                        <div className="flex items-center mb-3">
                          <LocationMarkerIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{selectedEvent.location}</span>
                        </div>
                      )}
                      
                      {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                        <div>
                          <div className="flex items-center mb-2">
                            <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span>Attendees:</span>
                          </div>
                          <ul className="ml-7 space-y-1">
                            {selectedEvent.attendees.map((attendee, index) => (
                              <li key={index} className="flex items-center">
                                <span className="text-gray-700 dark:text-gray-300">
                                  {attendee.name}
                                </span>
                                <span className="ml-2 text-gray-500">
                                  {attendee.email}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Edit Event
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEventDetails}
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

export default CalendarPage;