import React from 'react';
import { EventSelectProps } from './types';

export const EventSelect: React.FC<EventSelectProps> = ({
  events,
  selectedEventId,
  onChange,
}) => (
  <select
    className="border rounded px-3 py-2"
    value={selectedEventId}
    onChange={onChange}
  >
    <option value="">Select an event</option>
    {events.map((event) => (
      <option key={event._id} value={event._id}>
        {event.name}
      </option>
    ))}
  </select>
);