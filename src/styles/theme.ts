import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.200',
        color: 'gray.800'
      }
    }
  },
  semanticTokens: {
    colors: {
      text: {
        default: 'gray.800',
        _dark: 'gray.200'
      },
      body: {
        default: 'gray.200',
        _dark: 'gray.900'
      },
      chart: {
        default: 'gray.100',
        _dark: 'gray.800'
      },
      table: {
        default: 'gray.100',
        _dark: 'gray.800'
      },
      tableScheme: {
        default: 'gray.700',
        _dark: 'gray.300'
      },
      subtitle: {
        default: 'gray.400',
        _dark: 'gray.600'
      },
      checkColor: {
        default: 'blue',
        _dark: 'green'
      }
    }
  }
})
