import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiLineChartLine,
  RiStackLine,
  RiCoupon3Line,
  RiHome2Line,
  RiShoppingCartLine
} from 'react-icons/ri'
import { useCan } from '../../hooks/useCan'
import NavLink from './NavLink'
import NavSection from './NavSection'

export function SidebarNav() {
  const userCanManage = useCan('Administrador')
  const userCanBuy = useCan('Geek')
  const userCanSell = useCan('Vendedor')

  return (
    <Stack spacing={'12'} align={'flex-start'}>
      <NavSection title={'GERAL'}>
        <NavLink icon={RiHome2Line} href={'/home'}>
          Home
        </NavLink>

        <NavLink icon={RiLineChartLine} href={'/dashboard'}>
          Dashboard
        </NavLink>

        <NavLink icon={RiContactsLine} href={'/users'}>
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title={'INGRESSOS - Visitante'}>
        <NavLink icon={RiShoppingCartLine} href={'/store'}>
          Comprar
        </NavLink>
        <NavLink icon={RiCoupon3Line} href={'/mine'}>
          Adquiridos
        </NavLink>
      </NavSection>

      <NavSection title={'INGRESSOS - Guichê'}>
        <NavLink icon={RiShoppingCartLine} href={'/sells'}>
          Vender
        </NavLink>
        <NavLink icon={RiCoupon3Line} href={'/sold'}>
          Vendidos
        </NavLink>
      </NavSection>
    </Stack>
  )
}
