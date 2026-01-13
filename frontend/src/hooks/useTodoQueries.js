import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore';

const API_BASE_URL = 'http://localhost:8080/api/todos';

// Get todos for current user
export const useTodos = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      return response.json();
    },
    enabled: !!token,
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title) => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Update a todo
export const useUpdateTodo = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, completed }) => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
