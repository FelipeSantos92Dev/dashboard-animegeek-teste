import {
  Flex,
  Button,
  HStack,
  IconButton,
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Divider
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '../components/Form/Input'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import withSSRGuest from '../utils/withSSRGuest'
import { queryClient } from '../services/queryClient'
// import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import { AuthContex } from '../contexts/AuthContext'
import { api } from '../services/apiClient'
import { setupAPIClient } from '../services/api'

type FormValues = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function Register() {
  const { signIn } = useContext(AuthContex)

  // const router = useRouter()
  const createUser = useMutation(
    async (user: FormValues) => {
      const response = await api.post('/users', {
        user: {
          ...user
        }
      })
      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<FormValues> = async (values) => {
    await createUser.mutateAsync(values)
    await signIn(values)

    // router.push('/dashboard')
  }
  return (
    <Flex
      direction={'column'}
      w={'100vw'}
      h={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'body'}
      color={'text'}
    >
      <Flex w={['100%', '60%']} my={'6'} maxWidth={1480} mx={'auto'} px={'6'}>
        <Box
          as={'form'}
          flex={'1'}
          borderRadius={8}
          bg={'table'}
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size={'md'} fontWeight={'bold'}>
            Cadastrar Novo Usuário
          </Heading>
          <Divider my={'6'} borderColor={'gray.700'} />

          <VStack spacing={'8'}>
            <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
              <Input
                label={'Nome'}
                error={errors.name}
                color={'inputColor'}
                _focus={{ color: 'inputColorFocus', outlineColor: 'blue.300' }}
                _hover={{ bg: 'inputColorHover' }}
                {...register('name')}
              />
              <Input
                type={'email'}
                label={'E-mail'}
                error={errors.email}
                color={'inputColor'}
                _focus={{ color: 'inputColorFocus', outlineColor: 'blue.300' }}
                _hover={{ bg: 'inputColorHover' }}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
              <Input
                type={'password'}
                label={'Senha'}
                error={errors.password}
                color={'inputColor'}
                _focus={{ color: 'inputColorFocus', outlineColor: 'blue.300' }}
                _hover={{ bg: 'inputColorHover' }}
                {...register('password')}
              />
              <Input
                type={'password'}
                label={'Confirmação da senha'}
                error={errors.password_confirmation}
                color={'inputColor'}
                _focus={{ color: 'inputColorFocus', outlineColor: 'blue.300' }}
                _hover={{ bg: 'inputColorHover' }}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>
          <HStack mt={'6'} justify={'flex-end'}>
            <Button
              type={'submit'}
              colorScheme={'blue'}
              size={'lg'}
              width={'40'}
              maxW={400}
              isLoading={isSubmitting}
            >
              Registrar
            </Button>

            <IconButton
              aria-label="Toggle theme"
              fontSize={22}
              bg={'transparent'}
              variant={'solid'}
            >
              <DarkModeSwitch />
            </IconButton>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  setupAPIClient(ctx)

  return {
    props: {}
  }
})
