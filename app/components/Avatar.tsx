import Image from 'next/image'
import React from 'react'

const Avatar = () => {
  return (
    <Image
          src="/images/placeholder.jpg"
          alt="Avatar"
          width={30}
          height={30}
          className="hidden md:block cursor-pointer rounded-full"
       />
  )
}

export default Avatar
