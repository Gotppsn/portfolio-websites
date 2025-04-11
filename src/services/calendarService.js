import apiClient from './apiClient';

export const getEvents = async (params = {}) => {
  try {
    const response = await apiClient.get('/events', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch events' };
  }
};

export const getEventById = async (id) => {
  try {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch event' };
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create event' };
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update event' };
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete event' };
  }
};

export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    const response = await apiClient.get('/events/range', { 
      params: { 
        startDate, 
        endDate 
      } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch events by date range' };
  }
};

export const addEventAttendee = async (eventId, attendeeData) => {
  try {
    const response = await apiClient.post(`/events/${eventId}/attendees`, attendeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add attendee' };
  }
};

export const removeEventAttendee = async (eventId, attendeeId) => {
  try {
    const response = await apiClient.delete(`/events/${eventId}/attendees/${attendeeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove attendee' };
  }
};

export const syncWithGoogleCalendar = async () => {
  try {
    const response = await apiClient.post('/events/sync/google');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to sync with Google Calendar' };
  }
};

export const syncWithOutlookCalendar = async () => {
  try {
    const response = await apiClient.post('/events/sync/outlook');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to sync with Outlook Calendar' };
  }
};

export const exportToICS = async (eventId) => {
  try {
    const response = await apiClient.get(`/events/${eventId}/export/ics`, {
      responseType: 'blob'
    });
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `event-${eventId}.ics`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to export event to ICS' };
  }
};

export const getEventTypes = async () => {
  try {
    const response = await apiClient.get('/events/types');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch event types' };
  }
};

export const setEventReminder = async (eventId, reminderData) => {
  try {
    const response = await apiClient.post(`/events/${eventId}/reminders`, reminderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to set event reminder' };
  }
};

export const removeEventReminder = async (eventId, reminderId) => {
  try {
    const response = await apiClient.delete(`/events/${eventId}/reminders/${reminderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove event reminder' };
  }
};

export const getRecurringEvents = async () => {
  try {
    const response = await apiClient.get('/events/recurring');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch recurring events' };
  }
};