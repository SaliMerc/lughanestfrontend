import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';


const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex justify-start">
      <div className="relative w-[60%]">
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 "
        >
            <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2  bg-black text-white placeholder-gray-400"
        />
      </div>
    </form>
  );
};

export default SearchBar;
