
import { apiSlice } from './apiSlice';
import { loginSuccess, logout } from '../slices/authSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess({ 
            user: { 
              name: data.name, 
              email: data.email, 
              isAdmin: data.isAdmin 
            }, 
            token: data.accessToken 
          }));
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
