import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface GetViewsByProductLast7DaysPathParams {
  id: string
}

export interface GetViewsByProductLast7DaysResponse {
  amount: number
}

export interface GetViewsByProductLast7DaysProps {
  path: GetViewsByProductLast7DaysPathParams
  accessToken: string
}

export async function getViewsByProductLast7Days({
  path,
  accessToken,
}: GetViewsByProductLast7DaysProps) {
  const { id } = path
  const response = await api.get<GetViewsByProductLast7DaysResponse>(
    `/products/${id}/metrics/views`,
    {
      headers: {
        Cookie: accessToken,
      },
    },
  )
  return response.data
}

export function mapGetViewsByProductLast7DaysErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O produto não foi encontrado.'
  }

  return ''
}
