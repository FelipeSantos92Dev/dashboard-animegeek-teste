import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
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
import axios from 'axios'
import NextLink from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { RiAddLine, RiDeleteBinLine, RiPencilFill } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { queryClient } from '../../services/queryClient'

type Profile = {
  name: string
}

type Role = {
  name: string
}

type User = {
  id: string
  email: string
  profile: Profile
  role: Role
  created_at: string
}

export default function UserList() {
  const { data, isLoading, isFetching, error } = useQuery('users', async () => {
    const url = 'http://localhost:4000/users'
    const response = await axios.get(url)

    return response.data
  })

  const [page, setPage] = useState(1)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await axios.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10
      }
    )
  }

  return (
    <Flex
      direction={'column'}
      h={'100vh'}
      bg={'body'}
      color={'text'}
      overflowY={'scroll'}
    >
      <Header />

      <Flex w={'100%'} my={'6'} maxW={1480} mx={'auto'} px={'6'}>
        <Sidebar />

        <Box flex={'1'} borderRadius={8} bg={'table'} p={'8'}>
          <Flex mb={'8'} justify={'space-between'} align={'center'}>
            <Heading size={'lg'} fontWeight={'normal'}>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size={'sm'} color={'blue.500'} ml={'4'} />
              )}
            </Heading>
            <NextLink href={'users/create'} passHref>
              <Button
                as={'a'}
                size={'sm'}
                fontSize={'sm'}
                colorScheme={'blue'}
                leftIcon={<Icon as={RiAddLine} fontSize={'lg'} />}
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
              <Table colorScheme={'subtitle'}>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} width={'8'}>
                      <Checkbox colorScheme={'blue'} />
                    </Th>
                    <Th color={'text'}>Usuário</Th>
                    {isWideVersion && <Th color={'text'}>Data de Cadastro</Th>}
                    <Th width={'8'} color={'text'}>
                      Ações
                    </Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user: User) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme={'blue'} />
                        </Td>
                        <Td>
                          <Box>
                            <Text
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                              fontWeight={'bold'}
                            >
                              {user.profile.name}
                            </Text>

                            <Text fontSize={'sm'} color={'subtitle'}>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.role.name}</Td>}
                        <Td>
                          <Flex>
                            <HStack spacing={2}>
                              <Button
                                as={'a'}
                                size={'sm'}
                                colorScheme={'yellow'}
                                cursor={'pointer'}
                              >
                                <Icon as={RiPencilFill} fontSize={'lg'} />
                              </Button>

                              <Button
                                as={'a'}
                                size={'sm'}
                                colorScheme={'red'}
                                cursor={'pointer'}
                              >
                                <Icon as={RiDeleteBinLine} fontSize={'lg'} />
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
    </Flex>
  )
}
