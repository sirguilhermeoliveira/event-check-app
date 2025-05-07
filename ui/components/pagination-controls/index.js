import React from 'react';

export const PaginationControls = ({ page, totalPages, onPrev, onNext }) => (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={page <= 1}
        onClick={onPrev}
        className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page <strong>{page}</strong> of {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={onNext}
        className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );