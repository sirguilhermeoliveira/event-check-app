import React from 'react';
import { SearchInputProps } from './types';

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onChange,
}) => (
    <input
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={onChange}
      className="border px-3 py-2 mt-2 w-full"
    />
  );