import { Flex, Icon, Input } from '@chakra-ui/react'
import { useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export default function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Flex
      as={'label'}
      flex={'1'}
      py={'2'}
      px={'6'}
      ml={'6'}
      maxW={400}
      alignSelf={'center'}
      color={'gray.800'}
      position={'relative'}
      bg={'gray.100'}
      borderRadius={'full'}
    >
      <Input
        color={'gray.800'}
        variant={'unstyled'}
        px={'4'}
        mr={'4'}
        placeholder={'Buscar na plataforma'}
        _placeholder={{ color: 'gray.500' }}
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize={'20'} />
    </Flex>
  )
}
