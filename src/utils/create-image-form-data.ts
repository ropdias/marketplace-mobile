import { Platform } from 'react-native'

// Define the shape of the object required by React Native FormData
interface FormDataImageProps {
  uri: string
  name: string
  type: string
}

/**
 * Prepares the image object for FormData upload, handling missing extensions common in iOS.
 * * @param uri - The image URI string (e.g., from selectedImage)
 * @param fileData - (Optional) The file object from expo-file-system or similar
 * @returns An object { uri, name, type } ready to be appended to FormData
 */
export const createFormDataImage = (
  uri: string,
  fileData?: any,
): FormDataImageProps => {
  // 1. Extract the filename. Try to use the fileData name first, otherwise extract from URI.
  let fileName = fileData?.name

  if (!fileName) {
    // Get the text after the last slash '/'
    const uriParts = uri.split('/')
    fileName = uriParts[uriParts.length - 1]
  }

  // 2. Handle missing file extension (common issue with iOS assets or temp files).
  // Check if the filename ends with a dot followed by characters (e.g., .jpg, .png).
  const fileTypeMatch = /\.(\w+)$/.exec(fileName)

  // Default to 'jpeg' if no extension is found, otherwise use the found extension.
  const type = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image/jpeg'

  if (!fileTypeMatch) {
    // Force append .jpg if no extension exists to ensure the backend recognizes it as an image.
    fileName += '.jpg'
  }

  // 3. Format the URI based on the Platform.
  // Android usually works fine with 'file://', but sometimes it's safer to keep it.
  // iOS often requires removing 'file://' prefix for certain upload libraries,
  // though modern React Native is more robust. We'll clean it just in case if needed.
  // For this example, we will keep the URI as is, but ensure it's a string.
  const finalUri = Platform.OS === 'android' ? uri : uri.replace('file://', '')

  return {
    uri: finalUri,
    name: fileName,
    type: type, // MIME type (e.g., 'image/jpeg')
  }
}
