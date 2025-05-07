import React from 'react';
export const PersonCard = ({ person, onCheckIn, onCheckOut, formatDate, fiveSecondsDelay }) => {
  const delay = fiveSecondsDelay || false;

  return (
    <div className="border p-4 my-2 rounded shadow">
      <p><strong>{person.firstName} {person.lastName}</strong></p>
      <p>{person.company}</p>
      <p>{person.title}</p>
      <p>Check-in: {formatDate(person.checkInDate)}</p>
      <p>Check-out: {formatDate(person.checkOutDate)}</p>
  
      {!person.checkInDate && (
        <button
          onClick={() => onCheckIn(person._id)}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Check-in {person.firstName}
        </button>
      )}
  
      {person.checkInDate && !person.checkOutDate && !delay && (
        <button
          onClick={() => onCheckOut(person._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Check-out {person.firstName}
        </button>
      )}
    </div>
  );
};
