import { HStack, IconButton } from '@chakra-ui/react'
// import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { DarkModeSwitch } from '../DarkModeSwitch'

export default function NotificationsNav() {
  return (
    <HStack
      spacing={['6', '8']}
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
    </HStack>
  )
}
