   import React, { FC } from 'react'

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({label, onClick}) => {
  return (
    <div
       onClick ={onClick}
       className="hover:bg-neutral-100 px-4 py-3 text-sm"
     >
     {label}
   </div>
  )
}

export default MenuItem
