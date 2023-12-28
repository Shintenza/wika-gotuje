import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { connectDb } from '@utils/connectDb';
import User from '@models/User';

const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      try {
        await connectDb();

        const dbUser = await User.findOne({
          email: profile.email,
        });

        if (!dbUser) {
          user.role = 'user';
          const newDbUser = new User({
            email: profile.email,
            name: profile.name,
            role: 'user',
            image: user.image,
          });
          const savedDbUser = await newDbUser.save();
          user.id = savedDbUser._id.toString();
        } else {
          user.role = dbUser.role;
          user.id = dbUser._id.toString();
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        console.log("testtt")
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
