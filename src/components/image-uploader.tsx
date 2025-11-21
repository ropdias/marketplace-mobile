import * as Crypto from 'expo-crypto'
import { File } from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { ToastMessage } from './toast-message'
import { Icon, ImageUploadIcon } from './ui/icon'
import { Image } from './ui/image'
import { useToast } from './ui/toast'

export function ImageUploader() {
  const toast = useToast()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
        const file = new File(photoUri)
        if (!file.exists) return

        if (file.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            duration: 3000,
            render: ({ id }) => {
              return (
                <ToastMessage
                  id={id}
                  action="error"
                  title="Imagem muito grande!"
                  description="Escolha uma imagem de até 5MB."
                />
              )
            },
          })
        }

        setSelectedImage(photoUri)

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${Crypto.randomUUID()}.${fileExtension}`,
          uri: photoSelected.assets[0].uri,
          type: photoSelected.assets[0].mimeType || `image/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()

        userPhotoUploadForm.append('avatar', photoFile)

        // const avatarUpdtedResponse = await api.patch(
        //   '/users/avatar',
        //   userPhotoUploadForm,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   },
        // )

        // const userUpdated = user

        // userUpdated.avatar = avatarUpdtedResponse.data.avatar

        // await updateUserProfile(userUpdated)

        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({ id }) => {
            return (
              <ToastMessage
                id={id}
                title="Sucesso!"
                description="Foto atualizada"
                action="success"
              />
            )
          },
        })
      }
    } catch {
      //   const isAppError = error instanceof AppError
      //   const description = isAppError
      //     ? error.message
      //     : 'Não foi possível atualizar a imagem do perfil. Tente novamente mais tarde.'
      //   toast.show({
      //     placement: 'top',
      //     duration: 3000,
      //     render: ({ id }) => {
      //       return (
      //         <ToastMessage
      //           id={id}
      //           action="error"
      //           title="Erro ao atualizar a imagem do perfil"
      //           description={description}
      //         />
      //       )
      //     },
      //   })
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
