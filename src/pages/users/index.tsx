import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine, RiDeleteBinLine, RiPencilFill } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import useUsers from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10
      }
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size={'sm'} color={'gray.500'} ml={'4'} />
              )}
            </Heading>
            <NextLink href={'users/create'} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="orange"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify={'center'}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={'center'}>
              <Text>Falha ao carregar dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="orange" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width="8">Ações</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="orange" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color={'orange.400'}
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          <Flex>
                            <HStack spacing={2}>
                              <Button as="a" size="sm" colorScheme="yellow">
                                <Icon as={RiPencilFill} fontSize="lg" />
                              </Button>

                              <Button as="a" size="sm" colorScheme="red">
                                <Icon as={RiDeleteBinLine} fontSize="lg" />
                              </Button>
                            </HStack>
                          </Flex>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCoutnOfRegisters={Number(data?.totalCount)}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
