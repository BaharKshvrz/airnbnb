import React from 'react'

interface ContainerPops {
  children: React.ReactNode;
}

const Container: React.FC<ContainerPops> = ({children}) => {
  return (
    <div className="max-w-[2520px] m-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  )
}

export default Container
