import { Listing, Reservation, User } from "@prisma/client";

// Omit<Type, Keys>: Constructs a type by picking all properties from Type and then removing Keys.The opposite of Pick.

export type SafeListing = Omit<
  Listing,
  "createdAt"
  > & {
    createdAt: string,
  };

export type SafeUser = Omit<
       User,
       "createdAt" | "updatedAt" | "emailVerified"
   > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeReservation = Omit<
   Reservation,
   "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: string;
}

