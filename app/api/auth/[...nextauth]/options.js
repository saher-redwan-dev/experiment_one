import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {
        //   label: "email:",
        //   type: "text",
        //   placeholder: "your-email",
        // },
        // password: {
        //   label: "password:",
        //   type: "password",
        //   placeholder: "your-password",
        // },
      },
      async authorize(credentials) {
        console.log("credentials:::", credentials);
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      console.log("session:::::::: :: ", session);
      const nameFromDB = await User.findOne({ email: session.user.email });
      // console.log("nameFromDB:::" , nameFromDB);
      if (session.user.name != nameFromDB.name) {
        session.user.name = nameFromDB.name;
      }
      if (session.user.image != nameFromDB.image) {
        session.user.image = nameFromDB.image;
      }
      return session;
    },
    // me
    async signIn({ account, profile }) {
      if (account.provider == "google") {
        console.log("from GOOGLE Provider::: ", profile);

        const foundUser = await User.findOne({ email: profile.email })
          .lean()
          .exec();

        if (!foundUser) {
          //create(signUp) now user
          const userData = {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            SignUp_provider: "Google",
          };
          await User.create(userData);
        } else {
          //continue ragistration
          return true;
        }
      }

      // this return for other providers...
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
