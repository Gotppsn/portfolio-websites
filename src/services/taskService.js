import apiClient from './apiClient';

export const getTasks = async (params = {}) => {
  try {
    const response = await apiClient.get('/tasks', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch tasks' };
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch task' };
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create task' };
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update task' };
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete task' };
  }
};

export const moveTask = async (id, status, order) => {
  try {
    const response = await apiClient.patch(`/tasks/${id}/status`, { status, order });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to move task' };
  }
};

export const assignTask = async (taskId, userId) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/assign`, { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to assign task' };
  }
};

export const unassignTask = async (taskId) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/unassign`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to unassign task' };
  }
};

export const completeTask = async (taskId) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/complete`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to complete task' };
  }
};

export const reopenTask = async (taskId) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/reopen`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reopen task' };
  }
};

export const getTasksByProject = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/tasks`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch project tasks' };
  }
};

export const addTaskComment = async (taskId, comment) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/comments`, { content: comment });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add comment' };
  }
};

export const getTaskComments = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}/comments`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch task comments' };
  }
};

export const updateTaskPriority = async (taskId, priority) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/priority`, { priority });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update task priority' };
  }
};

export const updateTaskDueDate = async (taskId, dueDate) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/due-date`, { dueDate });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update task due date' };
  }
};

export const addTaskTag = async (taskId, tag) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/tags`, { tag });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add task tag' };
  }
};

export const removeTaskTag = async (taskId, tag) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}/tags/${tag}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove task tag' };
  }
};