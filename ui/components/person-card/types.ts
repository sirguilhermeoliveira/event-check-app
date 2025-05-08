import { Person } from "shared/types";

  export interface PersonCardProps {
    person: Person;
    onCheckIn: (id: string) => void;
    onCheckOut: (id: string) => void;
    formatDate: (date?: string | Date | undefined | null) => string;
    fiveSecondsDelay?: boolean;
  }