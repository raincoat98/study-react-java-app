import { useState } from 'react';
import { useTodos, useUpdateTodo, useDeleteTodo } from '../hooks/useTodoQueries';
import TodoControls from './TodoControls';
import TodoItem from './TodoItem';
import Pagination from './Pagination';

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const { data, isLoading } = useTodos(currentPage, pageSize, sortBy, sortDirection);
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const todos = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (option) => {
    setSortBy(option.value);
    setSortDirection(option.direction);
    setCurrentPage(0);
  };

  const handleDeleteCompleted = () => {
    todos.filter(todo => todo.completed).forEach(todo => {
      deleteTodo(todo.id);
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">할 일을 불러오는 중...</p>
      </div>
    );
  }

  if (totalElements === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">할 일이 없습니다. 새로운 할 일을 추가하세요!</p>
      </div>
    );
  }

  return (
    <div>
      {/* 컨트롤 영역 */}
      <TodoControls
        completedCount={completedCount}
        currentPageCount={todos.length}
        totalElements={totalElements}
        sortBy={sortBy}
        sortDirection={sortDirection}
        pageSize={pageSize}
        onSortChange={handleSortChange}
        onPageSizeChange={handlePageSizeChange}
        onDeleteCompleted={handleDeleteCompleted}
      />

      {/* 할 일 목록 */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={(id, title, completed) =>
              updateTodo({ id, title, completed })
            }
            onDelete={deleteTodo}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TodoList;
