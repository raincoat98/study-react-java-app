import { useState } from 'react';
import { useTodos, useUpdateTodo, useDeleteTodo } from '../hooks/useTodoQueries';

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useTodos(currentPage, pageSize);
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

  // 페이지 번호 배열 생성 (최대 5개 페이지 버튼)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesShown = 5;
    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, startPage + maxPagesShown - 1);

    if (endPage - startPage < maxPagesShown - 1) {
      startPage = Math.max(0, endPage - maxPagesShown + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      {/* 통계 및 페이지 크기 선택 */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          완료: {completedCount} / {todos.length} (전체 {totalElements}개)
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">표시 개수:</span>
          {[10, 50, 100].map((size) => (
            <button
              key={size}
              onClick={() => handlePageSizeChange(size)}
              className={`text-sm px-3 py-1 rounded transition duration-200 ${
                pageSize === size
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {size}개
            </button>
          ))}
          {completedCount > 0 && (
            <button
              onClick={() => {
                todos.filter(todo => todo.completed).forEach(todo => {
                  deleteTodo(todo.id);
                });
              }}
              className="text-sm bg-red-100 hover:bg-red-200 text-red-600 py-1 px-3 rounded transition duration-200 ml-2"
            >
              완료된 항목 삭제
            </button>
          )}
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition duration-200"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo({ id: todo.id, title: todo.title, completed: !todo.completed })}
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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* 이전 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            &#60;
          </button>

          {/* 페이지 번호 버튼 */}
          {pageNumbers[0] > 0 && (
            <>
              <button
                onClick={() => handlePageChange(0)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200"
              >
                1
              </button>
              {pageNumbers[0] > 1 && <span className="text-gray-400">...</span>}
            </>
          )}

          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded transition duration-200 ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pageNum + 1}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 2 && (
                <span className="text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* 다음 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
