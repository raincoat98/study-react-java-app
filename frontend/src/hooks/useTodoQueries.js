import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosConfig';

// Get todos for current user with pagination
export const useTodos = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['todos', page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(`/todos?page=${page}&size=${size}`);
      return response.data;
    },
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title) => {
      const response = await axiosInstance.post('/todos', {
        title,
        completed: false,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, completed }) => {
      const response = await axiosInstance.put(`/todos/${id}`, {
        title,
        completed,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
