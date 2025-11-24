import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'
import { AppError } from '@/utils/app-error'

export interface SignInBody {
  email: string
  password: string
}

// back-end does not return any body on sign-in
export type SignInResponse = void

// PUBLIC ROUTE - No authentication required
export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/sellers/sessions', {
    email,
    password,
  })

  // Extracts only "access_token=..." before the first ";"
  const rawCookie = response.headers['set-cookie']?.[0]
  const accessToken = rawCookie ? rawCookie.split(';')[0] : null

  if (!accessToken) {
    throw new AppError('O backend não retornou o token de autenticação.')
  }

  return {
    accessToken,
  }
}

export function mapSignInErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 403) return 'Erro: Credenciais inválidas.'
  }

  return ''
}
