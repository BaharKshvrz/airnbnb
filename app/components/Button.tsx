import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
     label, onClick, outline, small, icon: Icon, disabled
}) => {
  return (
    <button
       onClick={(e) => {}}
       className={`
           rounded-lg
           transition
           hover:opacity-80
           disabled:opacity-70
           disabled:cursor-not-allowed
           w-full
           flex justify-center items-center
           ${small ? "py-1" : "py-3"}
           ${small ? "text-sm" : "text-lg"}
           ${small ? "border" : "border-2"}
           ${outline ? "bg-white text-black" : "bg-rose-500 text-white"}
       `}
     >
      {label}
      {Icon && 
        <Icon size={24} />
      }
    </button>
  )
}

export default Button
