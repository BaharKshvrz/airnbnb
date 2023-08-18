"use client"

import React, { useMemo } from 'react'
import { BiSearch } from "react-icons/bi";
import useSearchModel from '../hooks/useSearchModel';
import { useSearchParams } from 'next/navigation';
import useCountries from '../hooks/useCountries';
import { get } from 'http';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModel = useSearchModel(); 
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const locationValue = params?.get("locationValue");

  const locationLabel = useMemo(() => {
     if (locationValue) {
       return getByValue(locationValue)?.label;
     }
     return "Anywhere"
  }, [locationValue, getByValue]);


  const durationLabel = useMemo(() => {
      if (startDate && endDate) {
         const start = new Date(startDate);
         const end = new Date(endDate);
         let diff = differenceInDays(end, start);
         if (diff === 0) {
            diff =1;
         }
         return `${diff} Days`
      }

      return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
   if (guestCount) {
     return `${guestCount} Guests`;
   }

   return 'Add Guests';
 }, [guestCount]);

  return (
    <div
       onClick={searchModel.onOpen}
       className="w-full md:max-w-sm md:m-auto rounded-full border border-gray-300 shadow-sm hover:shadow-md cursor-pointer transition">
        <div className="flex justify-between items-center p-2">
           <div className="font-semibold text-sm px-2 cursor-pointer">
              {locationLabel}
           </div>
           <div className="hidden sm:block text-center font-semibold pl-4 pr-4 text-sm px-2 border-x-[1px] cursor-pointer">
              {durationLabel}
            </div>
           <div className="hidden sm:block text-center font-normal text-sm px-2 cursor-pointer">
              {guestLabel}
            </div>

            <div className="rounded-full bg-rose-500 p-2">
               <BiSearch color="white"/>
            </div>
        </div>
    </div>
  )
}

export default Search
