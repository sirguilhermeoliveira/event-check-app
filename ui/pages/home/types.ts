import { Person } from "shared/types";

  export type PeopleResponse = {
    people: Person[];
    total: number;
    totalCheckIn: number;
    totalPages: number;
    totalCheckInByCompany: Record<string, number>; 
  };
  
  export type FiveSecondsDelayMap = Record<string, boolean>;
  