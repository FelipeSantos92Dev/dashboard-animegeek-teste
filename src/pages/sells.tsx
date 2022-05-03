import { Box, Flex, Text } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { setupAPIClient } from '../services/api'
import withSSRAuth from '../utils/withSSRAuth'

export default function Sells() {
  return (
    <Flex direction={'column'} h={'100vh'} bg={'body'} color={'text'}>
      <Header />

      <Flex w={'100%'} my={'6'} maxW={1480} mx={'auto'} px={'6'}>
        <Sidebar />

        <Box p={['4', '6']} bg={'table'} w={'100%'} borderRadius={8} pb={'4'}>
          <Text fontSize={'lg'} mb={'4'}>
            Página de Venda de Ingressos
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  setupAPIClient(ctx)

  return {
    props: {}
  }
})
