'use client';

import React from 'react'
import Container from '../Container'
import { categories } from "../../constants/index";
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

const Catergories = () => {
  const params = useSearchParams(); 
  const category = params?.get("category");
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }

  return (
      <Container>
         <div className="flex justify-between items-center gap-10 overflow-x-auto">
             { categories.map(item => (
                    <CategoryBox
                        key={item.label} 
                        label={item.label}
                        icon={item.icon}
                        description={item.description}
                        selected={category === item.label}
                    />
                ))
             }
         </div>
      </Container>
  )
}

export default Catergories
