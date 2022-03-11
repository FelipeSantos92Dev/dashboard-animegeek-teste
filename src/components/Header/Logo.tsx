import { Text } from '@chakra-ui/react'

export default function Logo() {
  return (
    <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
      ThunderGo
      <Text as="span" ml="1" color="orange.500">
        .
      </Text>
    </Text>
  )
}
