import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import axios from 'axios'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

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

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(
    async (user: FormValues) => {
      const url = 'http://localhost:4000/users'
      const response = await axios.post(url, {
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

    router.push('/users')
  }
  return (
    <Box>
      <Header />

      <Flex w={'100%'} my={'6'} maxWidth={1480} mx={'auto'} px={'6'}>
        <Sidebar />

        <Box
          as={'form'}
          flex={'1'}
          borderRadius={8}
          bg={'gray.100'}
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size={'lg'} fontWeight={'normal'}>
            Criar Usuário
          </Heading>
          <Divider my={'6'} borderColor={'gray.700'} />

          <VStack spacing={'8'}>
            <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
              <Input label={'Nome'} error={errors.name} {...register('name')} />
              <Input
                type={'email'}
                label={'E-mail'}
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
              <Input
                type={'password'}
                label={'Senha'}
                error={errors.password}
                {...register('password')}
              />
              <Input
                type={'password'}
                label={'Confirmação da senha'}
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={'8'} justify={'flex-end'}>
            <HStack spacing={'4'}>
              <Link href={'/users'} passHref>
                <Button as={'a'} colorScheme={'purple'}>
                  Cancelar
                </Button>
              </Link>
              <Button
                type={'submit'}
                colorScheme={'twitter'}
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
