import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
 
export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
              name: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
              credentials:  {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
              },
              async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                if (!credentials?.email || !credentials?.password) {
                   throw new Error("Invalid credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isCorrectPassword = await bcrypt.compare(
                     credentials.password,
                     user.hashedPassword
                )

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }

                return user;
            }
        })
       ],
    pages: {
        // if sth get wrong, redirect to "/"
        "signIn": "/"
     },
     debug: process.env.NODE_ENV === "development",
     session: {
        strategy: "jwt"
     },
     secret: process.env.NEXTAUTH_SECRET,
    }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


// NextAuth.js automatically creates simple, unbranded authentication pages for handling Sign in, Sign out,
// Email Verification and displaying error messages.
// The options displayed on the sign-up page are automatically generated based on the providers specified in the options passed to NextAuth.js.