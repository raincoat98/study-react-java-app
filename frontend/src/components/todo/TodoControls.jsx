import SortDropdown from './SortDropdown';

const TodoControls = ({
  completedCount,
  currentPageCount,
  totalElements,
  sortBy,
  sortDirection,
  pageSize,
  onSortChange,
  onPageSizeChange,
  onDeleteCompleted,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
      {/* 통계 */}
      <div className="text-sm text-gray-600">
        완료: {completedCount} / {currentPageCount} (전체 {totalElements}개)
      </div>

      {/* 컨트롤 영역 */}
      <div className="flex gap-3 items-center flex-wrap">
        {/* 정렬 드롭다운 */}
        <SortDropdown
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
        />

        {/* 페이지 크기 선택 */}
        <span className="text-sm text-gray-600">표시:</span>
        {[10, 50, 100].map((size) => (
          <button
            key={size}
            onClick={() => onPageSizeChange(size)}
            className={`text-sm px-3 py-1 rounded transition duration-200 ${
              pageSize === size
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {size}개
          </button>
        ))}

        {/* 완료된 항목 삭제 */}
        {completedCount > 0 && (
          <button
            onClick={onDeleteCompleted}
            className="text-sm bg-red-100 hover:bg-red-200 text-red-600 py-1 px-3 rounded transition duration-200"
          >
            완료된 항목 삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoControls;
