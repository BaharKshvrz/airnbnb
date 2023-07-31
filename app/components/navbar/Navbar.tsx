import React from 'react'
import Container from '../container/Container'
import Logo from '../Logo'

const Navbar = () => {
  return (
    <div className="fixed bg-white w-full">
       <div className="border-b-0">
         <Container>
           <Logo/>
         </Container>
       </div>
    </div>
  )
}

export default Navbar
