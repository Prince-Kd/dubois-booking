import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
import { Client } from "../../../utils/db";

export default NextAuth({
  //Configure JWT
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/auth",
  },
  //Specify Provider
  providers: [
    CredentialsProviders({
      async authorize(credentials) {
        //Connect to DB
        //console.log(credentials)
        const db = (await Client.connect()).db('dubois-admin');
        //Get all the users
        const users = db.collection("admin-users");
        //Find user with the email
        const user = await users.findOne({
          email: credentials.email,
        });

        //Not found - send error res
        if (!user) {
          Client.close();
          throw new Error("No user found with the email");
        }
        //console.log(credentials.passowrd)
        //Check hashed password with DB password
        var checkPassword = await bcrypt.compare(
          credentials["password"],
          await user["password"]
        );
        //Incorrect password - send response
        if (!checkPassword) {
          Client.close();
          throw new Error("Password doesn't match");
        }

        if (user["isAdmin"] != true) {
          Client.close();
          throw new Error("You are not authourized!");
        }
        //Else send success response
        Client.close();
        return { email: user["email"] };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
        const db = (await Client.connect()).db('dubois-admin');
      //Get all the users
      const users = db.collection("admin-users");
      //Find user with the email
      const existingUser = await users.findOne({
        email: session.user.email,
      });

      session.user = {
          ...session.user,
          name: `${existingUser['firstname']} ${existingUser['lastname']}`
      }
      user = existingUser

      return session;
    },
    
  },
});
