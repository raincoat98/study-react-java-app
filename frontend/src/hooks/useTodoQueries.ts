import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosConfig';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodosResponse {
  content: Todo[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

interface UpdateTodoPayload {
  id: number;
  title: string;
  completed: boolean;
}

// Get todos for current user with pagination and sorting
export const useTodos = (page: number = 0, size: number = 10, sortBy: string = 'createdAt', sortDirection: string = 'desc') => {
  return useQuery<TodosResponse>({
    queryKey: ['todos', page, size, sortBy, sortDirection],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/todos?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`
      );
      return response.data;
    },
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, string>({
    mutationFn: async (title: string) => {
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

  return useMutation<Todo, Error, UpdateTodoPayload>({
    mutationFn: async ({ id, title, completed }: UpdateTodoPayload) => {
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

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
