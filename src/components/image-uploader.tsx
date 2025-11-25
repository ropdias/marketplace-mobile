import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'

import { useAppToast } from '@/hooks/use-app-toast'
import { AppError } from '@/utils/app-error'

import { Icon, ImageUploadIcon } from './ui/icon'
import { Image } from './ui/image'

interface ImageUploaderProps {
  initialImage?: string | null
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
}

export function ImageUploader({
  initialImage,
  selectedImage,
  setSelectedImage,
}: ImageUploaderProps) {
  const { showError } = useAppToast()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoUri = photoSelected.assets[0].uri

      if (photoUri) {
        setSelectedImage(photoUri)
      } else {
        throw new AppError('Não foi possível selecionar a imagem.')
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const description = isAppError
        ? error.message
        : 'Não foi possível atualizar a imagem do perfil. Tente novamente mais tarde.'
      showError({
        title: 'Erro ao selecionar a imagem do perfil',
        description,
      })
    }
  }

  return (
    <TouchableOpacity
      className="h-[120px] w-[120px] items-center justify-center rounded-[12px] bg-shape"
      onPress={handleUserPhotoSelect}
    >
      <Icon
        as={ImageUploadIcon}
        size="imageUploaderIcon"
        className="fill-orange-base"
      />
      {initialImage && !selectedImage && (
        <Image
          source={{ uri: initialImage }}
          alt="profile-picture"
          className="absolute h-full w-full rounded-[12px]"
        />
      )}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          alt="profile-picture"
          className="absolute h-full w-full rounded-[12px]"
        />
      )}
    </TouchableOpacity>
  )
}
