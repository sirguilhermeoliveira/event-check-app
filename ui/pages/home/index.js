import React, { useState, useEffect } from 'react';
import { Loading } from '../../components/loading/index';
import { EventSelect } from '../../components/event-select/index';
import { SearchInput } from '../../components/search-input/index';
import { PersonCard } from '../../components/person-card/index';
import { PaginationControls } from '../../components/pagination-controls/index';
import { EventSummary } from '../../components/event-summary/index';
import { Meteor } from 'meteor/meteor';
import { formatDate } from '../../utils/format-date';
import { NoPeopleFound } from '../../components/no-people-found';


export const Home = () => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fiveSecondsDelay, setFiveSecondsDelay] = useState({});

  const checkedInPeople = people?.totalCheckIn
  const notCheckedInCount = people?.total - people?.totalCheckIn
  const companyBreakdown = people?.totalCheckInByCompany

  const fetchPeople = (eventId) => {
    Meteor.call('people.findAllByEvent', searchTerm, page, limit=5, eventId, (error, result) => {
      if (error) {
        alert('Error in people.findAllByEvent:', error);
      } else {
        setPeople(result);
        setTotalPages(result.totalPages);
      }
    });
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchPeople(selectedEventId);
  }, [searchTerm, page]);

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

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        alert(error.reason || 'Error in check-in');
      } else {
        setFiveSecondsDelay((prevState) => ({
          ...prevState,
          [personId]: true,
        }));
        fetchPeople(selectedEventId)
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
        alert(error.reason || 'Error in check-out');
      } else {
        fetchPeople(selectedEventId)
      }
  })}

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleEventChange = (value) => {
    setPage(1)
    setSelectedEventId(value);
    fetchPeople(value);
  };
  
  return (
    <div className="p-4">
      {
        loading ? <Loading/> :
        <div>
        
                {events.length > 0 &&
                                <EventSelect
                      events={events}
                      selectedEventId={selectedEventId}
                      onChange={(e) => handleEventChange(e.target.value)}
                      />
                }
      {selectedEventId &&
        <>
<EventSummary
            checkedInCount={checkedInPeople}
            notCheckedInCount={notCheckedInCount}
            companyBreakdown={companyBreakdown}
            />
          

          <SearchInput
            searchTerm={searchTerm}
            onChange={handleSearch}
          />

<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {people?.people?.map((person) => (
            <PersonCard
            key={person._id}
            person={person}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            formatDate={formatDate}
            fiveSecondsDelay={fiveSecondsDelay[person._id]} 
            />
          ))}
          </div>
          {people?.total > 0 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />)}
        </>}
      {!loading && events.length >= 0 && <NoPeopleFound events={events} people={people?.people}  selectedEventId={selectedEventId} />}
      </div>}
    </div>
  );
};
