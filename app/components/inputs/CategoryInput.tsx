import React from 'react'
import { IconType } from "react-icons";

interface CategoryInputProps  {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}
const CategoryInput:React.FC<CategoryInputProps> = ({
    label,
    icon: Icon,
    selected,
    onClick,
}) => {
  return (
    <div 
       className={`
          flex items-center gap-1 border flex-col
           rounded-xl hover:border-black p-3
           cursor-pointer
           ${selected ? "border-black" : "border-neutral-300"}
         `}
         onClick={() => onClick(label)}
          >
        <Icon size={30} />
        <span className="font-semibold">{label}</span>
    </div>
  )
}

export default CategoryInput
