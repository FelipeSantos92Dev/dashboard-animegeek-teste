import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Felipe Santos</Text>
        <Text color="gray.300" fontSize="small">
          dev.felipesantos@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Felipe Santos"
        src="https://github.com/FelipeSantos92Dev.png"
      />
    </Flex>
  )
}
