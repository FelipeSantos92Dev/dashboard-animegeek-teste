import { useColorMode, Icon } from '@chakra-ui/react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  if (isDark) {
    return (
      <Icon
        as={RiSunLine}
        onClick={toggleColorMode}
        cursor={'pointer'}
        color={'text'}
      />
    )
  }
  return (
    <Icon
      as={RiMoonLine}
      onClick={toggleColorMode}
      cursor={'pointer'}
      color={'text'}
    />
  )
}
