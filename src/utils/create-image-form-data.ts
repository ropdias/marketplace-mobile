import { Platform } from 'react-native'

// Define the shape of the object required by React Native FormData
interface FormDataImageResponse {
  uri: string
  name: string
  type: string
}

interface FormDataImageProps {
  uri: string
  fileData?: any
}

/**
 * Prepares the image object for FormData upload, handling missing extensions common in iOS.
 * * @param uri - The image URI string (e.g., from selectedImage)
 * @param fileData - (Optional) The file object from expo-file-system or similar
 * @returns An object { uri, name, type } ready to be appended to FormData
 */
export const createFormDataImage = ({
  uri,
  fileData,
}: FormDataImageProps): FormDataImageResponse => {
  // 1. Determine the file extension
  let extension = ''

  // Try to get extension from the URI first
  // If not in URI, try to get from fileData name (if available)
  const uriExtensionMatch = /\.(\w+)$/.exec(uri)
  if (uriExtensionMatch) {
    extension = uriExtensionMatch[1]
  } else if (fileData?.name) {
    const fileDataMatch = /\.(\w+)$/.exec(fileData.name)
    if (fileDataMatch) {
      extension = fileDataMatch[1]
    }
  }

  // Default fallback if no extension found (common in iOS temp files)
  if (!extension) {
    extension = 'jpg'
  }

  // 2. Create a unique file name
  // We use a generic name or timestamp since the Back-end will change it anyway.
  // Ex: "upload-1701234567.jpg"
  const uniqueName = `upload-${Date.now()}.${extension}`

  // 3. Determine MIME type based on the extension
  // If it's explicitly png, use png, otherwise default to jpeg for safety.
  const type = extension.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg'

  // 4. Format the URI based on the Platform.
  // Android usually works fine with 'file://', but sometimes it's safer to keep it.
  // iOS often requires removing 'file://' prefix for certain upload libraries,
  // though modern React Native is more robust. We'll clean it just in case if needed.
  // For this example, we will keep the URI as is, but ensure it's a string.
  const finalUri = Platform.OS === 'android' ? uri : uri.replace('file://', '')

  return {
    uri: finalUri,
    name: uniqueName,
    type,
  }
}
