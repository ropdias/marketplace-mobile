import { zodResolver } from '@hookform/resolvers/zod'
import { File } from 'expo-file-system'
import { router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { uploadImages } from '@/api/attachments/upload-images'
import { createSeller } from '@/api/sellers/create-seller'
import Logo from '@/assets/logo.svg'
import { ImageUploader } from '@/components/image-uploader'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
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
import { useAppToast } from '@/hooks/use-app-toast'
import { AppError } from '@/utils/app-error'
import { createFormDataImage } from '@/utils/create-image-form-data'
import { phoneApplyMask } from '@/utils/phone-apply-mask'

const signUpSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => /^\d{10,11}$/.test(val), {
        message: 'Telefone inválido, insira DDD e número corretamente',
      }),
    email: z.email({ error: 'Email inválido' }),
    password: z
      .string()
      .min(6, { error: 'A senha deve ter no mínimo 6 caracteres' }),
    passwordConfirmation: z
      .string()
      .min(6, { error: 'A senha deve ter no mínimo 6 caracteres' }),
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
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function Register() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { showSuccess, showError } = useAppToast()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  function goToLogin() {
    router.navigate('/login')
  }

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
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
            // Return to avoid creating a seller without an image
            return
          }
        }

        await createSeller({
          body: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
            avatarId,
          },
        })
        showSuccess({
          title: 'Cadastro realizado com sucesso!',
          description: 'Agora é só fazer o login!',
        })
        router.replace({ pathname: '/login', params: { email: data.email } })
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Tente novamente mais tarde.'

        showError({ title: 'Erro ao realizar cadastro', description })
      }
    },
    [showError, showSuccess, selectedImage],
  )

  useEffect(() => {
    // Update the profilePicture field in the form when selectedImage changes
    if (!selectedImage) return
    const file = new File(selectedImage)
    if (!file.exists) return
    setValue('profilePicture', file, { shouldValidate: true })
  }, [selectedImage, setValue])

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack className="w-full flex-1 items-center justify-between gap-[61px] p-[40px]">
            <VStack className="w-full items-center gap-[34px]">
              <VStack className="w-full items-center gap-[32px]">
                <Logo width={64} height={48} />
                <VStack className="w-full items-center gap-[8px]">
                  <Text className="font-title-lg text-gray-500">
                    Crie sua conta
                  </Text>
                  <Text className="font-body-sm text-center text-gray-300">
                    Informe os seus dados pessoais e de acesso
                  </Text>
                </VStack>
              </VStack>
              <VStack className="w-full gap-[40px]">
                <VStack className="w-full items-center gap-[20px]">
                  <ImageUploader
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                  {errors.profilePicture?.message && (
                    <Text className="font-body-sm text-red-500">
                      {errors.profilePicture.message}
                    </Text>
                  )}
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
                          onChangeText={(text) =>
                            onChange(phoneApplyMask(text))
                          }
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
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        isFilled={value.length > 0}
                        label="Senha"
                        errorMessage={errors.password?.message}
                      >
                        <InputIcon as={AccessIcon} />
                        <InputField
                          placeholder="Sua senha"
                          value={value}
                          onChangeText={onChange}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <InputSlot
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <InputRightIcon
                            as={showPassword ? ViewOffIcon : ViewIcon}
                          />
                        </InputSlot>
                      </Input>
                    )}
                  />
                  <Controller
                    control={control}
                    name="passwordConfirmation"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        isFilled={value.length > 0}
                        label="Confirmar Senha"
                        errorMessage={errors.passwordConfirmation?.message}
                      >
                        <InputIcon as={AccessIcon} />
                        <InputField
                          placeholder="Confirme a senha"
                          value={value}
                          onChangeText={onChange}
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <InputSlot
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <InputRightIcon
                            as={showConfirmPassword ? ViewOffIcon : ViewIcon}
                          />
                        </InputSlot>
                      </Input>
                    )}
                  />
                </VStack>
                <Button variant="solid" onPress={handleSubmit(handleSignUp)}>
                  <ButtonText>Cadastrar</ButtonText>
                  <ButtonIcon as={ArrowRight02Icon} />
                </Button>
              </VStack>
            </VStack>
            <VStack className="w-full gap-[20px]">
              <Text className="font-body-md text-gray-300">
                Já tem uma conta?
              </Text>
              <Button variant="outline" onPress={goToLogin}>
                <ButtonText>Acessar</ButtonText>
                <ButtonIcon as={ArrowRight02Icon} />
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
