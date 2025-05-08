import React from 'react';
import { PersonCardProps } from './types';

export const PersonCard: React.FC<PersonCardProps> = ({ person, onCheckIn, onCheckOut, formatDate, fiveSecondsDelay }) => {
  const delay = fiveSecondsDelay || false;

  return (
    <div className="border p-4 my-2 rounded shadow text-center flex flex-col justify-between">
      <div>
        <p><strong>👤 {person.firstName} {person.lastName}</strong></p>
        <div className="text-left">
          <p><strong>🏢 Company:</strong> {person.companyName || "No associated company"}</p>
          <p><strong>🎓 Title:</strong> {person.title || "No associated title"}</p>
          <p><strong>📅 Check-in:</strong> {formatDate(person?.checkInDate)}</p>
          <p><strong>📅 Check-out:</strong> {formatDate(person?.checkOutDate)}</p>
        </div>
      </div>

      <div className="mt-4">
        {!person.checkInDate && (
          <button 
            onClick={() => onCheckIn(person._id)}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2 font-bold border shadow-lg w-full"
          >
            Check-in {person.firstName}
          </button>
        )}

        {person.checkInDate && !person.checkOutDate && !delay && (
          <button
            onClick={() => onCheckOut(person._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2 font-bold w-full"
          >
            Check-out {person.firstName}
          </button>
        )}
      </div>
    </div>
  );
};
