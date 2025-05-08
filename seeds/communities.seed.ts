import { Events } from "shared/types";

export const COMMUNITIES_DATA: Omit<Events, '_id'>[] = [
    { name: 'Challenge' },
    { name: 'Great Code' },
    { name: 'I love code'}
]