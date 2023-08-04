"use client";

import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from "react-icons";

interface CategoryBoxProps {
    label: string,
    icon: IconType,
    description: string,
    selected?: boolean,
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
     label, icon: Icon, selected
}) => {
 const router = useRouter();

 const handleClick = useCallback(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("category") === label) {
            searchParams.delete("category");
        } else {
            searchParams.set("category", label);
        }
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
 }, [label])


  return (
    <div
        onClick={handleClick}
        className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-2 border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
     >
       
       <Icon size={26} /> {selected}
       <p className="font-medium text-sm">
           {label}
       </p>
    </div>
  )
}

export default CategoryBox
