import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      firstName: string
      lastName: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    name?: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    firstName: string
    lastName: string
  }
}
