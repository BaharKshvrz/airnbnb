import React from 'react'

interface ContainerPops {
  chilren: React.ReactNode;
}

const Container: React.FC<ContainerPops> = ({chilren}) => {
  return (
    <div>
      {chilren}
    </div>
  )
}

export default Container
