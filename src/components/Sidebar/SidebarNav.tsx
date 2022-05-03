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
        {userCanManage && (
          <NavLink icon={RiLineChartLine} href={'/dashboard'}>
            Dashboard
          </NavLink>
        )}
        {userCanManage && (
          <NavLink icon={RiContactsLine} href={'/users'}>
            Usuários
          </NavLink>
        )}
      </NavSection>

      {userCanManage && (
        <NavSection title={'EVENTO'}>
          <NavLink icon={RiStackLine} href={'/categories'}>
            Categoria
          </NavLink>
          <NavLink icon={RiCoupon3Line} href={'/tickets'}>
            Ingressos
          </NavLink>
          <NavLink icon={RiShoppingCartLine} href={'/sells'}>
            Vendas
          </NavLink>
        </NavSection>
      )}

      {userCanBuy && (
        <NavSection title={'INGRESSOS'}>
          <NavLink icon={RiShoppingCartLine} href={'/store'}>
            Comprar
          </NavLink>
          <NavLink icon={RiCoupon3Line} href={'/mine'}>
            Adquiridos
          </NavLink>
        </NavSection>
      )}

      {userCanSell && (
        <NavSection title={'INGRESSOS'}>
          <NavLink icon={RiShoppingCartLine} href={'/store'}>
            Vender
          </NavLink>
          <NavLink icon={RiCoupon3Line} href={'/mine'}>
            Vendidos
          </NavLink>
        </NavSection>
      )}
    </Stack>
  )
}
