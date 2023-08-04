import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
          src={src || "/images/placeholder.jpg"}
          alt="Avatar"
          width={30}
          height={30}
          className="hidden md:block cursor-pointer rounded-full"
       />
  )
}

export default Avatar
