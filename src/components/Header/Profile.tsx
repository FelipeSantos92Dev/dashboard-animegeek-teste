import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Felipe Santos</Text>
          <Text color="gray.300" fontSize="small">
            dev.felipesantos@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Felipe Santos"
        src="https://github.com/FelipeSantos92Dev.png"
      />
    </Flex>
  )
}
