import { api } from '@/lib/axios'

export interface UploadImagesBody {
  files: FormData // multipart/form-data
}

export interface UploadImagesResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export interface UploadImagesProps {
  body: UploadImagesBody
}

// PUBLIC ROUTE - No authentication required
export async function uploadImages({ body }: UploadImagesProps) {
  const { files } = body
  // We're sending FormData directly because multipart/form-data requests
  // must not be wrapped inside an object like `{ files }`.
  const response = await api.post<UploadImagesResponse>('/attachments', files)
  return response.data
}
