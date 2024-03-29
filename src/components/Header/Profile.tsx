import { Avatar, Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AuthContex, signOut } from '../../contexts/AuthContext'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContex)

  return (
    <Flex align={'center'}>
      <IconButton
        aria-label="Toggle theme"
        fontSize={22}
        bg={'transparent'}
        variant={'solid'}
        mr={6}
      >
        <Icon
          as={RiLogoutBoxLine}
          fontSize={'20'}
          color={'logout'}
          onClick={() => signOut()}
        />
      </IconButton>
      {showProfileData && (
        <Box mr={'4'} textAlign={'right'}>
          <Text>{'Usuário Teste'}</Text>
          <Text color={'gray.600'} fontSize={'sm'}>
            {'usuario@teste.com'}
          </Text>
        </Box>
      )}

      <Avatar size={'md'} name={'Usuário Teste'} src={'Usuário Teste'} />
    </Flex>
  )
}
