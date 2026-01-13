import { useState } from 'react';
import { useCreateTodo } from '../../hooks/useTodoQueries';

const TodoForm = () => {
  const [input, setInput] = useState('');
  const { mutate: createTodo, isPending } = useCreateTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      createTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          {isPending ? '추가 중...' : '추가'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
