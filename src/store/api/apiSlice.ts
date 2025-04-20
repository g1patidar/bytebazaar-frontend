
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a base URL for your API
const baseUrl = import.meta.env.VITE_API_URL || 'https://api.example.com';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // You can get the token from the state and add it to headers here
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Project', 'Cart', 'Order'],
  endpoints: () => ({}),
});
