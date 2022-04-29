import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '../components/Form/Input'

type FormValues = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<FormValues> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
  }
  return (
    <Flex
      w={'100vw'}
      h={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'body'}
      color={'text'}
    >
      <Flex
        as={'form'}
        w={'100%'}
        maxW={360}
        bg={'table'}
        p={8}
        borderRadius={8}
        flexDir={'column'}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            type={'email'}
            label={'E-mail'}
            error={errors.email}
            color={'chart'}
            {...register('email')}
            _focus={{ color: 'subtitle' }}
          />
          <Input
            type={'password'}
            label={'Senha'}
            color={'chart'}
            error={errors.password}
            {...register('password')}
            _focus={{ color: 'subtitle' }}
          />
        </Stack>

        <Button
          type={'submit'}
          mt={6}
          colorScheme={'blue'}
          size={'lg'}
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
