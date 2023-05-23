import React from "react";

const SearchBar = () => {
  return (
    <div className="relative w-64">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        placeholder="Search"
      />
      <svg
        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.536 14.121a8 8 0 111.414-1.414l3.536 3.535a1 1 0 11-1.414 1.414l-3.536-3.535zM10 16a6 6 0 100-12 6 6 0 000 12z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
