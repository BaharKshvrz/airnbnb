import { PrismaClient } from "@prisma/client";

// In summary, this code creates a single instance of PrismaClient throughout the application,
//  stores it in a global variable when not in production mode, and exports it to be used in other parts of the application.
//   This ensures efficient and consistent database access across different modules in the application.


//  This line declares a global variable prisma of type PrismaClient or undefined. By declaring it globally, 
//  it becomes accessible across the entire application.
declare global {
    var prisma: PrismaClient | undefined;
}

// This line creates a local variable client that either uses the existing global prisma instance (if it exists) or 
// creates a new PrismaClient instance. This approach ensures that there is only one PrismaClient instance throughout 
// the application, preventing multiple connections to the database.
// In most environments, globalThis directly refers to the global object of that environment.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
}

// This line exports the client variable as the default export of the module. 
// It means that when other modules import from this module, they will get the client instance by default.
export default client;



