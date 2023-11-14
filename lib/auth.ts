import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
  ],
  callbacks: {
    session: async ({ session, token }): Promise<any> => {
      const res = await prisma.user.upsert({
        where: {
          sub: token.sub,
        },
        update: {
          // 使用token中的数据
          username: token.name as string,
          avatar: token.picture as string,
          email: token.email as string,
        },
        create: {
          // 使用token中的数据
          sub: token.sub as string,
          username: token.name as string,
          avatar: token.picture as string,
          email: token.email as string,
          platform: "github",
        },
      });
      if (res) {
        session.user = {
          sub: res.sub,
          platform: res.platform,
          username: res.username,
          avatar: res.avatar,
          email: res.email,
        } as IUserInfo;
      }
      return session.user;
    },
  },
};

export default NextAuth(authOptions);
