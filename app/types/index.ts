import { User } from "@prisma/client";

// Omit<Type, Keys>: Constructs a type by picking all properties from Type and then removing Keys.The opposite of Pick.

export type SafeUser = Omit<
       User,
       "createdAt" | "updatedAt" | "emailVerified"
   > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

