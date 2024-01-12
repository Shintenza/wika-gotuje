import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { query } from '@utils/database';

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
        const dbUser = (
          await query('SELECT * FROM users WHERE email = $1', [profile.email])
        ).rows[0];

        if (!dbUser) {
          user.role = 'user';
          const result = await query(
            'INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING id',
            [
              profile.name == null ? profile.login : profile.name,
              profile.email,
              user.image,
            ],
          );
          user.id = result.rows[0].id;
        } else {
          user.role = 'user';
          user.id = dbUser.id;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
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

  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
