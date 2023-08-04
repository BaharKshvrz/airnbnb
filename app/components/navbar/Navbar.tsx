import React, { FC } from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Catergories from './Catergories'

interface NavbarProps {
  currentUser?: SafeUser | null,
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {

  return (
    <div className="fixed bg-white w-full z-10 shadow-sm">
       <div className="border-b py-4">
         <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Logo/>
              <Search/>
              <UserMenu currentUser={currentUser}/>
            </div>
         </Container>
       </div>
       <Catergories/>
    </div>
  )
}

export default Navbar
