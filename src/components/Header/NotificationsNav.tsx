import { HStack, Icon, IconButton } from '@chakra-ui/react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { signOut } from '../../contexts/AuthContext'
// import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { DarkModeSwitch } from '../DarkModeSwitch'

export default function NotificationsNav() {
  return (
    <HStack
      spacing={['1', '2']}
      mx={['6', '8']}
      pr={['6', '8']}
      py={'1'}
      color={'gray.700'}
      borderRightWidth={1}
      borderColor={'gray.400'}
    >
      {/* <Icon as={RiNotificationLine} fontSize={'20'} />
      <Icon as={RiUserAddLine} fontSize={'20'} /> */}
      <IconButton
        aria-label="Toggle theme"
        fontSize={22}
        bg={'transparent'}
        variant={'solid'}
      >
        <DarkModeSwitch />
      </IconButton>

      <IconButton
        aria-label="Toggle theme"
        fontSize={22}
        bg={'transparent'}
        variant={'solid'}
      >
        <Icon
          as={RiLogoutBoxLine}
          fontSize={'20'}
          color={'logout'}
          onClick={() => signOut()}
        />
      </IconButton>
    </HStack>
  )
}
