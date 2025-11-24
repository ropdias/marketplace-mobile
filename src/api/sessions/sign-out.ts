import { api } from '@/lib/axios'

export interface signOutProps {
  accessToken: string
}

export async function signOut({ accessToken }: signOutProps) {
  await api.post(
    '/sign-out',
    {}, // no body
    {
      headers: {
        Cookie: accessToken,
      },
    },
  )
}
