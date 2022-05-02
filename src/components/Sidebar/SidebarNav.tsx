import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiLineChartLine,
  RiStackLine,
  RiCoupon3Line
} from 'react-icons/ri'
import NavLink from './NavLink'
import NavSection from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing={'12'} align={'flex-start'}>
      <NavSection title={'GERAL'}>
        <NavLink icon={RiLineChartLine} href={'/dashboard'}>
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href={'/users'}>
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title={'EVENTO'}>
        <NavLink icon={RiStackLine} href={'/forms'}>
          Categoria
        </NavLink>
        <NavLink icon={RiCoupon3Line} href={'/automation'}>
          Ingressos
        </NavLink>
      </NavSection>
    </Stack>
  )
}
