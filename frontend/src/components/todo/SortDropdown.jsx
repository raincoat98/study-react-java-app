const SORT_OPTIONS = [
  { label: '최신순', value: 'createdAt', direction: 'desc' },
  { label: '오래된순', value: 'createdAt', direction: 'asc' },
  { label: '제목 가나다순', value: 'title', direction: 'asc' },
  { label: '제목 역순', value: 'title', direction: 'desc' },
  { label: '최근 수정순', value: 'updatedAt', direction: 'desc' },
  { label: '오래된 수정순', value: 'updatedAt', direction: 'asc' },
  { label: '완료되지 않은 것 먼저', value: 'completed', direction: 'asc' },
  { label: '완료된 것 먼저', value: 'completed', direction: 'desc' },
];

const SortDropdown = ({ sortBy, sortDirection, onSortChange }) => {
  const getCurrentLabel = () => {
    const current = SORT_OPTIONS.find(
      (opt) => opt.value === sortBy && opt.direction === sortDirection
    );
    return current ? current.label : '최신순';
  };

  return (
    <div className="relative group">
      <button className="text-sm px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200 flex items-center gap-1">
        정렬: {getCurrentLabel()} ▼
      </button>
      <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-300 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        {SORT_OPTIONS.map((option) => (
          <button
            key={`${option.value}-${option.direction}`}
            onClick={() => onSortChange(option)}
            className={`w-full text-left px-4 py-2 text-sm transition duration-200 ${
              sortBy === option.value && sortDirection === option.direction
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;
