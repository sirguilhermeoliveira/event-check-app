import React from 'react';
import { NoPeopleProps } from './types';

export const NoPeopleFound: React.FC<NoPeopleProps> = ({events, people, selectedEventId}) => (
  <div className="flex items-center justify-center h-screen">
    {!events && !people ? "No events or people found" :
    <div>
    <span className="text-2xl font-semibold text-gray-800">{!events || events.length === 0 && "No events found"}</span>
    <span className="text-2xl font-semibold text-gray-800">{!people && selectedEventId && "No people found for this event"}</span>
    <span className="text-2xl font-semibold text-gray-800">{!selectedEventId && events.length > 0 && "Select an event above"}</span>
    <span className="text-2xl font-semibold text-gray-800">{people?.length === 0 && selectedEventId && "No results found"}</span>
    </div>
    }
  </div>
);