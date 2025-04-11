import apiClient from './apiClient';

export const getCodeSnippets = async (params = {}) => {
  try {
    const response = await apiClient.get('/code-snippets', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippets' };
  }
};

export const getCodeSnippetById = async (id) => {
  try {
    const response = await apiClient.get(`/code-snippets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippet' };
  }
};

export const createCodeSnippet = async (snippetData) => {
  try {
    const response = await apiClient.post('/code-snippets', snippetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create code snippet' };
  }
};

export const updateCodeSnippet = async (id, snippetData) => {
  try {
    const response = await apiClient.put(`/code-snippets/${id}`, snippetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update code snippet' };
  }
};

export const deleteCodeSnippet = async (id) => {
  try {
    const response = await apiClient.delete(`/code-snippets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete code snippet' };
  }
};

export const getLanguages = async () => {
  try {
    const response = await apiClient.get('/code-snippets/languages');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch languages' };
  }
};

export const searchCodeSnippets = async (query) => {
  try {
    const response = await apiClient.get('/code-snippets/search', { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search code snippets' };
  }
};

export const getTags = async () => {
  try {
    const response = await apiClient.get('/code-snippets/tags');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch tags' };
  }
};

export const getCodeSnippetsByTag = async (tag) => {
  try {
    const response = await apiClient.get(`/code-snippets/tags/${tag}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippets by tag' };
  }
};

export const getCodeSnippetsByLanguage = async (language) => {
  try {
    const response = await apiClient.get(`/code-snippets/languages/${language}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippets by language' };
  }
};

export const setCodeSnippetVisibility = async (id, isPublic) => {
  try {
    const response = await apiClient.patch(`/code-snippets/${id}/visibility`, { isPublic });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update code snippet visibility' };
  }
};

export const forkCodeSnippet = async (id) => {
  try {
    const response = await apiClient.post(`/code-snippets/${id}/fork`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fork code snippet' };
  }
};

export const getCodeSnippetVersions = async (id) => {
  try {
    const response = await apiClient.get(`/code-snippets/${id}/versions`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippet versions' };
  }
};

export const getCodeSnippetVersion = async (id, versionId) => {
  try {
    const response = await apiClient.get(`/code-snippets/${id}/versions/${versionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch code snippet version' };
  }
};