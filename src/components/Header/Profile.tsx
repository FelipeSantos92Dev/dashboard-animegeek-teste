import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContex } from '../../contexts/AuthContext'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContex)

  return (
    <Flex align={'center'}>
      {showProfileData && (
        <Box mr={'4'} textAlign={'right'}>
          <Text>{user?.name}</Text>
          <Text color={'gray.600'} fontSize={'sm'}>
            {user?.email}
          </Text>
        </Box>
      )}

      <Avatar
        size={'md'}
        name={'Felipe Santos'}
        src={'https://github.com/FelipeSantos92Dev.png'}
      />
    </Flex>
  )
}
