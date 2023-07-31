import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className="fixed bg-white w-full z-10 shadow-sm">
       <div className="border-b-0 py-4">
         <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Logo/>
              <Search/>
              <UserMenu/>
            </div>
         </Container>
       </div>
    </div>
  )
}

export default Navbar
