import React from 'react';

export const PaginationControls = ({ page, totalPages, onPrev, onNext }) => (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={page <= 1}
        onClick={onPrev}
        className={`${page <= 1 ? "bg-gray-300" : "bg-blue-500"} ${page > 1 && "text-white"} px-3 py-1 rounded disabled:opacity-50 ${page > 1 && "font-bold"}`}
      >
        Previous
      </button>
      <span>Page <strong>{page}</strong> of {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={onNext}
        className={`${page >= totalPages ? "bg-gray-300" : "bg-blue-500"} ${page >= totalPages ? "text-black" : "text-white"} px-3 py-1 rounded disabled:opacity-50 ${page < totalPages && "font-bold"}`}
      >
        Next
      </button>
    </div>
  );