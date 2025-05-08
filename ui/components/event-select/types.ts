import { Events } from "shared/types";

export interface EventSelectProps {
  events: Events[];
  selectedEventId: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}