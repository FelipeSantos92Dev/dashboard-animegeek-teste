import { Box, Flex, Text } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useCan } from '../hooks/useCan'
import { setupAPIClient } from '../services/api'
import withSSRAuth from '../utils/withSSRAuth'

export default function Profile() {
  const userCanSeeMetrics = useCan('Geek')

  return (
    <Flex direction={'column'} h={'100vh'} bg={'body'} color={'text'}>
      <Header />

      <Flex w={'100%'} my={'6'} maxW={1480} mx={'auto'} px={'6'}>
        <Sidebar />

        <Box p={['4', '6']} bg={'table'} w={'100%'} borderRadius={8} pb={'4'}>
          <Text fontSize={'lg'} mb={'4'}>
            Página Inicial
          </Text>
          {userCanSeeMetrics && <Text>Métricas</Text>}
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
