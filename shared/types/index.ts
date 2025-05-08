export interface Events {
    _id: string;
    name: string;
  }

  export interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    companyName?: string | null;
    title?: string | null;
    checkInDate?: string | Date | null;
    checkOutDate?: string | Date | null;
    communityId?: string
  }
  