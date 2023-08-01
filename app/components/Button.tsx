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
       onClick={onClick}
       className={`
           rounded-lg
           transition
           hover:opacity-80
           disabled:opacity-70
           disabled:cursor-not-allowed
           w-full
           relative
           ${small ? "py-1" : "py-3"}
           ${small ? "text-sm" : "text-base"}
           ${small ? "border" : "border-2"}
           ${outline ? 'border-black' : 'border-rose-500'}
           ${outline ? "bg-white text-black" : "bg-rose-500 text-white"}
       `}
     >
      {Icon && 
        <Icon 
           size={24}
           className="absolute left-2"
        />
      }
      {label}
    </button>
  )
}

export default Button
