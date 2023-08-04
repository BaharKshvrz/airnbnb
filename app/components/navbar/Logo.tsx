import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
     <Link href="/">
        <Image
                  src="/images/logo.png"
                  alt="Airbnb Logo"
                  width={100}
                  height={100}
                  className="hidden md:block cursor-pointer"
              /> 
     </Link>
   )
}

export default Logo
