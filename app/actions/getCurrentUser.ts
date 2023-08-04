import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
       const session = await getSession();
       if (!session?.user?.email) {
         return null;
       }

       const currentUser = await prisma?.user.findUnique({
         where: {
            email: session.user.email,
         }
       })
       console.log("currentUser")

       console.log(currentUser)

       if (!currentUser) {
         return null;
       }
       
       return {
         ...currentUser,
         createdAt: currentUser.createdAt.toISOString(),
         updatedAt: currentUser.updatedAt.toISOString(),
         emailVerified: currentUser.emailVerified?.toISOString() || null,
       };

    } catch (error) {
        return null;
    }
}

/*
toISOString(): The toISOString() method of Date instances returns a string representing 
this date in the date time string format.

const event = new Date();
console.log(event.toISOString());   //"2023-08-03T07:01:32.491Z"
*/