"use client"

import React, { useCallback, useMemo, useState } from 'react'
import useSearchModel from '../hooks/useSearchModel'
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModel = () => {
  const searchModel = useSearchModel();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.LOCATION);
  console.log("step:",step);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
     startDate: new Date(),
     endDate: new Date(),
     key: "selection"
  });

  const Map = useMemo(() => dynamic(() => import("../Map"), {
     ssr: false,
  }), [location]);

  const onBack = () => {
     setStep(value => value - 1)
  };

  const onNext = () => {
    setStep(value => value + 1)
  };

 const onSubmit = useCallback(() => {
   if (step !== STEPS.INFO) {
      return onNext();
   }
   
   // Prepate the query
   let searchParams = new URLSearchParams(window.location.search);
   if (location?.value) {
       searchParams.set("locationValue", location.value);
   } 
   searchParams.set("roomCount", roomCount.toString());
   searchParams.set("bathroomCount", bathroomCount.toString());
   searchParams.set("guestCount", guestCount.toString());
   if (dateRange.startDate) {
      searchParams.set("startDate", formatISO(dateRange.startDate));
   }
   if (dateRange.endDate) {
     searchParams.set("endDate", formatISO(dateRange.endDate));
  }

   const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
   setStep(STEPS.LOCATION);
   searchModel.onClose();
   router.push(newPathname);
   location },
  [
    onNext,
    router,
    roomCount,
    bathroomCount,
    guestCount,
    dateRange
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }
    return "Next";
  }, [step])


  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return "Back";
  }, [step]);


  let bodyContent = (
     <div className="flex flex-col gap-8">
       <Heading
          title="Where do you want to go?"
          subtitle="Find the prefect location!"
       />
       <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
       /> 
       <hr/>
       <Map center={location?.latlng} />
     </div>
     )

     if (step === STEPS.DATE) {
          bodyContent = (
             <div className="felx flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                   value={dateRange}
                   onChange={(value) => setDateRange(value.selection)}
                />
             </div>
          );
     }

     if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="More information"
              subtitle="Find your perfect place!"
            />
            <Counter 
              onChange={(value) => setGuestCount(value)}
              value={guestCount}
              title="Guests" 
              subtitle="How many guests are coming?"
            />
            <hr />
            <Counter 
              onChange={(value) => setRoomCount(value)}
              value={roomCount}
              title="Rooms" 
              subtitle="How many rooms do you need?"
            />        
            <hr />
            <Counter 
              onChange={(value) => {
                setBathroomCount(value)
              }}
              value={bathroomCount}
              title="Bathrooms"
              subtitle="How many bahtrooms do you need?"
            />
          </div>
        )
    }
  

  return (
    <Modal
       isOpen={searchModel.isOpen}
       onClose={searchModel.onClose}
       onSubmit={onSubmit}
       title="Filters"
       actionLabel={actionLabel}
       secondaryActionLabel={secondaryActionLabel}
       secondaryAction={step === STEPS.LOCATION ? undefined : onBack }
       body={bodyContent}
    />
  )
}

export default SearchModel
