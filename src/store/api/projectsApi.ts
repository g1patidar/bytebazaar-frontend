
import { apiSlice } from './apiSlice';

export interface Project {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
      providesTags: ['Project'],
    }),
    getProjectsByCategory: builder.query<Project[], string>({
      query: (category) => `projects/category/${category}`,
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; project: Partial<Project> }>({
      query: ({ id, project }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsByCategoryQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
