import useTodoStore from '../store/todoStore';

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">할 일이 없습니다. 새로운 할 일을 추가하세요!</p>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          완료: {completedCount} / {todos.length}
        </div>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm bg-red-100 hover:bg-red-200 text-red-600 py-1 px-3 rounded transition duration-200"
          >
            완료된 항목 삭제
          </button>
        )}
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition duration-200"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 text-blue-500 rounded cursor-pointer"
            />
            <span
              className={`flex-1 ${
                todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold transition duration-200"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
