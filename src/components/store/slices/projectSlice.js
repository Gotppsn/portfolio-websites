import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as projectService from '../../services/projectService';

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params, { rejectWithValue }) => {
    try {
      const projects = await projectService.getProjects(params);
      return projects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const project = await projectService.getProjectById(id);
      return project;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const newProject = await projectService.createProject(projectData);
      return newProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const updatedProject = await projectService.updateProject(id, projectData);
      return updatedProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await projectService.deleteProject(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProjectCollaborator = createAsyncThunk(
  'projects/addCollaborator',
  async ({ projectId, collaboratorData }, { rejectWithValue }) => {
    try {
      const result = await projectService.addProjectCollaborator(projectId, collaboratorData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProjectCollaborator = createAsyncThunk(
  'projects/removeCollaborator',
  async ({ projectId, collaboratorId }, { rejectWithValue }) => {
    try {
      await projectService.removeProjectCollaborator(projectId, collaboratorId);
      return { projectId, collaboratorId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProjectStatus = createAsyncThunk(
  'projects/updateStatus',
  async ({ projectId, status }, { rejectWithValue }) => {
    try {
      const result = await projectService.updateProjectStatus(projectId, status);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProjectMilestone = createAsyncThunk(
  'projects/addMilestone',
  async ({ projectId, milestoneData }, { rejectWithValue }) => {
    try {
      const result = await projectService.addProjectMilestone(projectId, milestoneData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProjectMilestone = createAsyncThunk(
  'projects/updateMilestone',
  async ({ projectId, milestoneId, milestoneData }, { rejectWithValue }) => {
    try {
      const result = await projectService.updateProjectMilestone(projectId, milestoneId, milestoneData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProjectMilestone = createAsyncThunk(
  'projects/deleteMilestone',
  async ({ projectId, milestoneId }, { rejectWithValue }) => {
    try {
      await projectService.deleteProjectMilestone(projectId, milestoneId);
      return { projectId, milestoneId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadProjectImage = createAsyncThunk(
  'projects/uploadImage',
  async ({ projectId, imageFile }, { rejectWithValue }) => {
    try {
      const result = await projectService.uploadProjectImage(projectId, imageFile);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setProjectVisibility = createAsyncThunk(
  'projects/setVisibility',
  async ({ projectId, isPublic }, { rejectWithValue }) => {
    try {
      const result = await projectService.setProjectVisibility(projectId, isPublic);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
    clearCurrentProject: (state) => {
      state.project = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Project By Id
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.project && state.project.id === action.payload) {
          state.project = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Project Collaborator
      .addCase(addProjectCollaborator.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          if (!state.project.collaborators) {
            state.project.collaborators = [];
          }
          state.project.collaborators.push(action.payload.collaborator);
        }
      })
      
      // Remove Project Collaborator
      .addCase(removeProjectCollaborator.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          state.project.collaborators = state.project.collaborators.filter(
            c => c.id !== action.payload.collaboratorId
          );
        }
      })
      
      // Update Project Status
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.id) {
          state.project.status = action.payload.status;
        }
        
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index].status = action.payload.status;
        }
      })
      
      // Add Project Milestone
      .addCase(addProjectMilestone.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          if (!state.project.milestones) {
            state.project.milestones = [];
          }
          state.project.milestones.push(action.payload.milestone);
        }
      })
      
      // Update Project Milestone
      .addCase(updateProjectMilestone.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          const index = state.project.milestones.findIndex(
            m => m.id === action.payload.milestone.id
          );
          if (index !== -1) {
            state.project.milestones[index] = action.payload.milestone;
          }
        }
      })
      
      // Delete Project Milestone
      .addCase(deleteProjectMilestone.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          state.project.milestones = state.project.milestones.filter(
            m => m.id !== action.payload.milestoneId
          );
        }
      })
      
      // Upload Project Image
      .addCase(uploadProjectImage.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.projectId) {
          if (!state.project.images) {
            state.project.images = [];
          }
          state.project.images.push(action.payload.imageUrl);
        }
      })
      
      // Set Project Visibility
      .addCase(setProjectVisibility.fulfilled, (state, action) => {
        if (state.project && state.project.id === action.payload.id) {
          state.project.isPublic = action.payload.isPublic;
        }
        
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index].isPublic = action.payload.isPublic;
        }
      });
  }
});

export const { clearProjectError, clearCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;