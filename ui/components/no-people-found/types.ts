import { Events, Person } from "shared/types";

  export interface NoPeopleProps {
    events: Events[];
    people: Person[];
    selectedEventId: string;
  }