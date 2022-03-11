import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  InputProps as ChackraInputProps
} from '@chakra-ui/react'

interface InputProps extends ChackraInputProps {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChackraInput
        name={name}
        id={name}
        {...rest}
        focusBorderColor="pink.500"
        variant="filled"
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
      />
    </FormControl>
  )
}
