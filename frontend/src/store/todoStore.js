import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],

  // Todo 추가
  addTodo: (title) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          title,
          completed: false,
          createdAt: new Date(),
        },
      ],
    }));
  },

  // Todo 수정
  updateTodo: (id, updates) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },

  // Todo 삭제
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  // Todo 완료 토글
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  // 모든 Todo 삭제
  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },
}));

export default useTodoStore;
