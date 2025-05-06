import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../../../api/collections/communities/communities'; 
import { People } from '../../../api/collections/people/people';
import { Meteor } from 'meteor/meteor';


export const Home = () => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);
  const [totalPeople, setTotalPeople] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5

  const fetchPeople = () => {
    Meteor.call('people.findAll', searchTerm, page, limit, (error, result) => {
      if (error) {
        alert('Error in people.findAll:', error);
      } else {
        setTotalPeople(result.total);
        setPeople(result.people);
        setTotalPages(result.totalPages);
      }
    });
  };


  const fetchEvents = () => {
    setLoading(true);
    Meteor.call('communities.findAll', (error, result) => {
      if (error) {
        alert('Error in communities.findAll:', error);
      } else {
        setEvents(result);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [searchTerm, page]);

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        alert(error.reason || 'Erro ao fazer check-in');
      } else {
        fetchPeople()
      }
    });
  };
  
  const handleCheckOut = (personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        alert(error.reason || 'Erro ao fazer check-out');
      } else {
        fetchPeople()
      }
    });
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'N/A';

  const checkedInPeople = people.filter((p) => !!p.checkInDate);
  const notCheckedInCount = Number(totalPeople) - Number(checkedInPeople.length)
  const companyBreakdown = checkedInPeople.reduce((acc, person) => {
    const company = person.companyName || "No associated company";
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4">
      {loading ? 
        <div class="flex items-center justify-center h-screen">
    <span class="text-2xl font-semibold text-gray-800">...Loading</span>
</div>
:  
      <div>
      <select
        className="border rounded px-3 py-2 mt-4"
        value={selectedEventId}
        onChange={(e) => setSelectedEventId(e.target.value)}
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="border px-3 py-2 mt-4 w-full"
      />


      {people.map((person) => (
        <div key={person._id} className="border p-4 my-2 rounded shadow">
          <p>
            <strong>
              {person.firstName} {person.lastName}
            </strong>
          </p>
          <p>{person.company}</p>
          <p>{person.title}</p>
          <p>Check-in: {formatDate(person.checkInDate)}</p>
          <p>Check-out: {formatDate(person.checkOutDate)}</p>
        {!person.checkInDate &&
          <button
          onClick={() => handleCheckIn(person._id)}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Check-in {person.firstName}
          </button>
          }

       {person.checkInDate && !person.checkOutDate && ( 
            <button
              onClick={() => handleCheckOut(person._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >
              Check-out {person.firstName}
            </button>
)}
        </div>
      ))}

<div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-6 p-4 border rounded">
        <h2 className="font-bold text-lg">Event Summary</h2>
        <strong>✅ Checked-in:: {checkedInPeople.length}</strong>
        {checkedInPeople.length > 0 &&
        <div>
        <strong>🏢 Checked-in by company:</strong>
        <ul>
          {Object.entries(companyBreakdown).map(([company, count]) => (
            <li key={company}>
              ⭐ {company}: {count}
            </li>
          ))}
        </ul>
          </div>
        }
        <strong>🚫 Not checked-in yet: {notCheckedInCount}</strong>
      </div>
      </div> }
    </div>
  );
};
