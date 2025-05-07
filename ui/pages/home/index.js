import React, { useState, useEffect } from 'react';
import { Loading } from '../../components/loading/index';
import { EventSelect } from '../../components/event-select/index';
import { SearchInput } from '../../components/search-input/index';
import { PersonCard } from '../../components/person-card/index';
import { PaginationControls } from '../../components/pagination-controls/index';
import { EventSummary } from '../../components/event-summary/index';
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
  const [fiveSecondsDelay, setFiveSecondsDelay] = useState({});
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
        setFiveSecondsDelay((prevState) => ({
          ...prevState,
          [personId]: true,
        }));
        fetchPeople()
        setTimeout(() => {
          setFiveSecondsDelay((prevState) => ({
            ...prevState,
            [personId]: false,
          }));
        }, 5000);
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
  })}

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
      {loading ? <Loading /> : (
        <>
          <EventSelect
            events={events}
            selectedEventId={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          />

          <SearchInput
            searchTerm={searchTerm}
            onChange={handleSearch}
          />

          {people.map((person) => (
            <PersonCard
              key={person._id}
              person={person}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              formatDate={formatDate}
              fiveSecondsDelay={fiveSecondsDelay[person._id]} 
            />
          ))}

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />

          <EventSummary
            checkedInCount={checkedInPeople.length}
            notCheckedInCount={notCheckedInCount}
            companyBreakdown={companyBreakdown}
          />
        </>
      )}
    </div>
  );
};
