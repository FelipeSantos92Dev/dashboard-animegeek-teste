import { Box, Button, Checkbox, Flex, Heading, HStack, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBinLine, RiPencilFill } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


export default function UserList() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1" borderRadius={8} bg="gray.800" p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="orange"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">

            <Thead>
              <Tr>
                <Th px="6" color="gray.300" width="8">
                  <Checkbox colorScheme="orange"/>
                </Th>
                <Th>Usuário</Th>
                <Th>Data de Cadastro</Th>
                <Th width="8">Ações</Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="orange"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Felipe Santos</Text>
                    <Text fontSize="sm" color="gray.300">dev.felipesantos@gmail.com</Text>
                  </Box>
                </Td>
                <Td>
                  11 de Março, 2022
                </Td>
                <Td>
                  <Flex>
                    <HStack spacing={2}>
                      <Button
                        as="a"
                        size="sm"
                        colorScheme="yellow"
                      >
                        <Icon as={RiPencilFill} fontSize="lg"/>
                      </Button>

                      <Button
                        as="a"
                        size="sm"
                        colorScheme="red"
                      >
                        <Icon as={RiDeleteBinLine} fontSize="lg"/>
                      </Button>

                    </HStack>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="orange"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Felipe Santos</Text>
                    <Text fontSize="sm" color="gray.300">dev.felipesantos@gmail.com</Text>
                  </Box>
                </Td>
                <Td>
                  11 de Março, 2022
                </Td>
                <Td>
                  <Flex>
                    <HStack spacing={2}>
                      <Button
                        as="a"
                        size="sm"
                        colorScheme="yellow"
                      >
                        <Icon as={RiPencilFill} fontSize="lg"/>
                      </Button>

                      <Button
                        as="a"
                        size="sm"
                        colorScheme="red"
                      >
                        <Icon as={RiDeleteBinLine} fontSize="lg"/>
                      </Button>

                    </HStack>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="orange"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Felipe Santos</Text>
                    <Text fontSize="sm" color="gray.300">dev.felipesantos@gmail.com</Text>
                  </Box>
                </Td>
                <Td>
                  11 de Março, 2022
                </Td>
                <Td>
                  <Flex>
                    <HStack spacing={2}>
                      <Button
                        as="a"
                        size="sm"
                        colorScheme="yellow"
                      >
                        <Icon as={RiPencilFill} fontSize="lg"/>
                      </Button>

                      <Button
                        as="a"
                        size="sm"
                        colorScheme="red"
                      >
                        <Icon as={RiDeleteBinLine} fontSize="lg"/>
                      </Button>

                    </HStack>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}
