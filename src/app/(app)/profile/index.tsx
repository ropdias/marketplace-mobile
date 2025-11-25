import { zodResolver } from '@hookform/resolvers/zod'
import { File } from 'expo-file-system'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { Seller } from '@/@types/seller'
import { uploadImages } from '@/api/attachments/upload-images'
import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { updateSeller } from '@/api/sellers/update-seller'
import { signOut as apiSignOut } from '@/api/sessions/sign-out'
import { ImageUploader } from '@/components/image-uploader'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  AccessIcon,
  CallIcon,
  Logout01Icon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from '@/components/ui/icon'
import {
  Input,
  InputField,
  InputIcon,
  InputRightIcon,
  InputSlot,
} from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'
import { useAppToast } from '@/hooks/use-app-toast'
import { api } from '@/lib/axios'
import { AppError } from '@/utils/app-error'
import { createFormDataImage } from '@/utils/create-image-form-data'
import { phoneApplyMask } from '@/utils/phone-apply-mask'

const updateProfileSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => /^\d{10,11}$/.test(val), {
        message: 'Telefone inválido, insira DDD e número corretamente',
      }),
    email: z.email({ error: 'Email inválido' }),
    oldPassword: z
      .string()
      .transform((val) => (val === '' ? null : val))
      .nullable(),
    newPassword: z
      .string()
      .transform((val) => (val === '' ? null : val))
      .nullable(),
    profilePicture: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'O arquivo precisa ser uma imagem',
      })
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: 'A imagem deve ter menos de 5MB',
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { oldPassword, newPassword } = data

    if (oldPassword || newPassword) {
      if (!oldPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['oldPassword'],
          message: 'Informe a senha antiga.',
        })
      }

      if (!newPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['newPassword'],
          message: 'Informe a nova senha.',
        })
      }

      if (newPassword && newPassword.length < 6) {
        ctx.addIssue({
          code: 'custom',
          path: ['newPassword'],
          message: 'A senha deve ter pelo menos 6 caracteres.',
        })
      }
    }
  })

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

export default function Profile() {
  const [seller, setSeller] = useState<Seller | null>(null)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { signOut, getAccessTokenOrEmpty } = useSession()
  const { showSuccess, showError } = useAppToast()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      oldPassword: '',
      newPassword: '',
    },
  })

  async function logout() {
    try {
      await apiSignOut({ accessToken: getAccessTokenOrEmpty() })
      showSuccess({
        title: 'Logout realizado com sucesso!',
        description: 'Volte sempre! 😊',
      })
    } catch {
      showError({
        title: 'Erro ao desconectar',
        description:
          'Não foi possível encerrar a sessão no servidor. Você será desconectado localmente.',
      })
    } finally {
      signOut()
      router.replace('/login')
    }
  }

  const fetchSellerProfile = useCallback(
    async (accessToken: string) => {
      try {
        const data = await getSellerProfile({ accessToken })
        setSeller(data.seller)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar os dados do perfil.'

        showError({ title: 'Erro ao buscar o perfil do vendedor', description })
      }
    },
    [showError],
  )

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileFormData) => {
      Keyboard.dismiss()
      try {
        let avatarId: string | null = null

        if (data.profilePicture && selectedImage) {
          // Create form data to upload the image
          const photoFile = createFormDataImage({
            uri: selectedImage,
            fileData: data.profilePicture,
          }) as any // 'as any' due to React Native FormData typings
          const userPhotoUploadForm = new FormData()
          userPhotoUploadForm.append('files', photoFile)

          try {
            const uploadImagesResponse = await uploadImages({
              body: { files: userPhotoUploadForm },
            })
            avatarId = uploadImagesResponse.attachments[0]?.id ?? null
          } catch (error) {
            const isAppError = error instanceof AppError

            const description = isAppError
              ? error.message
              : 'Tente novamente mais tarde.'

            showError({
              title: 'Erro ao realizar upload da imagem de perfil',
              description,
            })
            // Return to avoid updating a profile without an image
            return
          }
        }

        const response = await updateSeller({
          body: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.oldPassword,
            newPassword: data.newPassword,
            avatarId,
          },
          accessToken: getAccessTokenOrEmpty(),
        })
        showSuccess({
          title: 'Sucesso!',
          description: 'Seu perfil foi atualizado!',
        })

        setSelectedImage(null)
        setSeller(response.seller)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Tente novamente mais tarde.'

        showError({ title: 'Erro ao atualizar perfil', description })
      }
    },
    [showError, showSuccess, selectedImage, getAccessTokenOrEmpty],
  )

  useFocusEffect(
    useCallback(() => {
      const accessToken = getAccessTokenOrEmpty()

      fetchSellerProfile(accessToken)
    }, [fetchSellerProfile, getAccessTokenOrEmpty]),
  )

  useEffect(() => {
    // Change form fields when seller data is fetched
    if (!seller) return
    setValue('name', seller.name)
    setValue('phone', phoneApplyMask(seller.phone))
    setValue('email', seller.email)

    if (seller.avatar?.url) {
      // If the imageUri contains 'http://localhost:3333',
      // replace it with the api base URL
      const sellerAdjustedLocalUri = seller.avatar?.url.replace(
        'http://localhost:3333',
        `${api.defaults.baseURL}`,
      )
      setProfilePicture(sellerAdjustedLocalUri)
    }
  }, [seller, setValue])

  useEffect(() => {
    // Update the profilePicture field in the form when selectedImage changes
    if (!selectedImage) return
    const file = new File(selectedImage)
    if (!file.exists) return
    setValue('profilePicture', file, { shouldValidate: true })
  }, [selectedImage, setValue])

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-background"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full"
          keyboardShouldPersistTaps="handled"
        >
          <HStack className="items-center justify-center px-[40px] pb-[20px] pt-[24px]">
            <ImageUploader
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              initialImage={profilePicture}
            />
            {errors.profilePicture?.message && (
              <Text className="font-body-sm text-red-500">
                {errors.profilePicture.message}
              </Text>
            )}
            <Button
              variant="outline"
              size="small"
              className="absolute right-[40px] top-[24px] h-[40px] w-[40px] items-center justify-center p-0"
              onPress={logout}
            >
              <ButtonIcon as={Logout01Icon} />
            </Button>
          </HStack>
          <VStack className="w-full gap-[24px] px-[40px]">
            <VStack className="w-full items-center gap-[20px]">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    isFilled={value.length > 0}
                    label="Nome"
                    errorMessage={errors.name?.message}
                  >
                    <InputIcon as={UserIcon} />
                    <InputField
                      placeholder="Seu nome completo"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="default"
                    />
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    isFilled={value.length > 0}
                    label="Telefone"
                    errorMessage={errors.phone?.message}
                  >
                    <InputIcon as={CallIcon} />
                    <InputField
                      placeholder="(00) 00000-0000"
                      value={value}
                      onChangeText={(text) => onChange(phoneApplyMask(text))}
                      keyboardType="number-pad"
                    />
                  </Input>
                )}
              />
            </VStack>
            <VStack className="w-full gap-[20px]">
              <Text className="font-title-sm text-gray-500">Acesso</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    isFilled={value.length > 0}
                    label="E-mail"
                    errorMessage={errors.email?.message}
                  >
                    <InputIcon as={Mail02Icon} />
                    <InputField
                      placeholder="mail@exemplo.br"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="oldPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    isFilled={(value ?? '').length > 0}
                    label="Senha atual"
                    errorMessage={errors.oldPassword?.message}
                  >
                    <InputIcon as={AccessIcon} />
                    <InputField
                      placeholder="Sua senha"
                      value={value ?? ''}
                      onChangeText={onChange}
                      type={showOldPassword ? 'text' : 'password'}
                    />
                    <InputSlot
                      onPress={() => setShowOldPassword(!showOldPassword)}
                    >
                      <InputRightIcon
                        as={showOldPassword ? ViewOffIcon : ViewIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    isFilled={(value ?? '').length > 0}
                    label="Nova senha"
                    errorMessage={errors.newPassword?.message}
                  >
                    <InputIcon as={AccessIcon} />
                    <InputField
                      placeholder="Sua nova senha"
                      value={value ?? ''}
                      onChangeText={onChange}
                      type={showNewPassword ? 'text' : 'password'}
                    />
                    <InputSlot
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <InputRightIcon
                        as={showNewPassword ? ViewOffIcon : ViewIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
            </VStack>
            <Button
              className="justify-center"
              onPress={handleSubmit(handleUpdateProfile)}
            >
              <ButtonText>Atualizar cadastro</ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
