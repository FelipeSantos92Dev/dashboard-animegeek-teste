import {
  Flex,
  Button,
  Stack,
  HStack,
  IconButton,
  Heading,
  Divider
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContex } from '../contexts/AuthContext'
import { useContext } from 'react'
import * as yup from 'yup'
import { Input } from '../components/Form/Input'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import withSSRGuest from '../utils/withSSRGuest'

type FormValues = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { signIn } = useContext(AuthContex)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<FormValues> = async (values) => {
    await signIn(values)
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
        <Heading size={'md'} fontWeight={'bold'}>
          Entre Com Suas Credenciais
        </Heading>
        <Divider my={'6'} borderColor={'gray.700'} />
        <Stack spacing={4}>
          <Input
            type={'email'}
            label={'E-mail'}
            error={errors.email}
            color={'inputColor'}
            _focus={{ color: 'inputColorFocus' }}
            _hover={{ bg: 'inputColorHover' }}
            {...register('email')}
          />
          <Input
            type={'password'}
            label={'Senha'}
            error={errors.password}
            color={'inputColor'}
            _focus={{ color: 'inputColorFocus' }}
            _hover={{ bg: 'inputColorHover' }}
            {...register('password')}
          />
        </Stack>

        <HStack mt={'6'} justify={'flex-end'}>
          <Button
            type={'submit'}
            colorScheme={'blue'}
            size={'lg'}
            width={'40'}
            maxW={400}
            isLoading={isSubmitting}
          >
            Entrar
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
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
