"use client"

import React from 'react'
import { BiSearch } from "react-icons/bi";
import useSearchModel from '../hooks/useSearchModel';

const Search = () => {
  const searchModel = useSearchModel(); 
  return (
    <div
       onClick={searchModel.onOpen}
       className="w-full md:max-w-sm md:m-auto rounded-full border border-gray-300 shadow-sm hover:shadow-md cursor-pointer transition">
        <div className="flex justify-between items-center p-2">
           <div className="font-semibold text-sm px-2 cursor-pointer">
              Anywhree
           </div>
           <div className="hidden sm:block text-center font-semibold pl-4 pr-4 text-sm px-2 border-x-[1px] cursor-pointer">
              Any Week
            </div>
           <div className="hidden sm:block text-center font-normal text-sm px-2 cursor-pointer">
              Add Guests
            </div>

            <div className="rounded-full bg-rose-500 p-2">
               <BiSearch color="white"/>
            </div>
        </div>
    </div>
  )
}

export default Search
