import apiClient from './apiClient';

export const getProjects = async (params = {}) => {
  try {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch projects' };
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch project' };
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create project' };
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update project' };
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete project' };
  }
};

export const addProjectCollaborator = async (projectId, collaboratorData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/collaborators`, collaboratorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add collaborator' };
  }
};

export const removeProjectCollaborator = async (projectId, collaboratorId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}/collaborators/${collaboratorId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove collaborator' };
  }
};

export const updateProjectStatus = async (projectId, status) => {
  try {
    const response = await apiClient.patch(`/projects/${projectId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update project status' };
  }
};

export const addProjectMilestone = async (projectId, milestoneData) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/milestones`, milestoneData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add milestone' };
  }
};

export const updateProjectMilestone = async (projectId, milestoneId, milestoneData) => {
  try {
    const response = await apiClient.put(`/projects/${projectId}/milestones/${milestoneId}`, milestoneData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update milestone' };
  }
};

export const deleteProjectMilestone = async (projectId, milestoneId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}/milestones/${milestoneId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete milestone' };
  }
};

export const uploadProjectImage = async (projectId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.post(`/projects/${projectId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to upload project image' };
  }
};

export const setProjectVisibility = async (projectId, isPublic) => {
  try {
    const response = await apiClient.patch(`/projects/${projectId}/visibility`, { isPublic });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update project visibility' };
  }
};