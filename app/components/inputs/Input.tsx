import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text", 
    disabled,
    formatPrice,
    register,
    required,
    errors
}) => {
  return ( 
    <div className="w-full relative">
       {formatPrice && (
         <BiDollar
           size={24}
           className="text-neutral-700 absolute top-5 left-2"
         />
       )}

       <input
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          className={`
                       w-full rounded-md font-light p-4
                       border-2
                       bg-white
                       pt-6 
                       ${formatPrice ? 'pl-9' : 'pl-4'}
                       ${errors[id] ? 'border-rose-500' : 'border-neutral-500'}
                       ${errors[id] ? 'focus:border-rose-500': 'focus:border-neutral-500'}
                       peer
                     `}
        />
       <label className={`
                absolute top-5 left-3 
                z-10
                -translate-y-3
                peer-focus:scale-75
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                peer-focus:-translate-y-5
                ${formatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 
           `}>
         {label}
      </label>
    </div>
  )
}

export default Input
