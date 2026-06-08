import { forwardRef, useId } from 'react';

const SearchBar = forwardRef(function SearchBar(
  { value, onChange, placeholder = 'Search your roast...' },
  ref
) {
  const inputId = useId();

  return (
    <div className="flex items-center bg-white dark:bg-stone-800 p-2 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
      <label htmlFor={inputId} className="sr-only">Search coffees</label>
      <input
        id={inputId}
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none focus:ring-0 bg-transparent dark:text-white px-4 py-2 w-64 outline-none text-stone-800"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="bg-primary p-2 rounded-xl text-white flex-shrink-0"
        aria-label="Search"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
});

export default SearchBar;
