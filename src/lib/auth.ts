import GoogleProvider from "next-auth/providers/google"
import { type JWT } from "next-auth/jwt"
import type { Session } from "next-auth"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: async ({ user, token }: { user: { id: string } | undefined; token: JWT }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
}
