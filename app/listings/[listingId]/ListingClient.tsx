"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeListing, SafeReservation, SafeUser } from '../../types'
import { categories } from '@/app/constants';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModal from '@/app/components/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
       user: SafeUser
    };
    currentUser: SafeUser | null,
}

const initilaDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations= [],
    listing,
    currentUser,
}) => {
  
  // Find the category 
  const category = useMemo(() => {
     return categories.find(item => item.label === listing.category)
  }, [listing.category]);

  const loginModel = useLoginModal(); 
  const router = useRouter();

  /* Disabled Dates */
  const disabledDates = useMemo(() => {
     let dates: Date[] = [];
     reservations.forEach((reservation) => {
       const range = eachDayOfInterval({
         start: new Date(reservation.startDate),
         end: new Date(reservation.endDate),
       })
       dates = [...dates, ...range];
     })

     return dates;
  }, [reservations])
  
  const [isloading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initilaDateRange);

  const onCreateReservation = useCallback(() => {
     if (!currentUser) {
       return loginModel.onOpen();
     }
     setIsLoading(true);

     axios.post("/api/reservations", {
       totalPrice,
       startDate: dateRange.startDate,
       endDate: dateRange.endDate,
       listingId: listing.id,
     }).then(() => {
        toast.success("Listing is reserved!");
        setIsLoading(false);
        router.push("/trips");
     }).catch(() => {
         toast.error("Something went wrong!")
     }).finally(() => {
        setIsLoading(false);
     })
  }, [
       listing.id,
       currentUser,
       totalPrice,
       router,
       dateRange,
       loginModel,
      ])

   // Update the total price   
   useEffect(() => {
       if (dateRange.startDate && dateRange.endDate) {
          const dayCount = differenceInCalendarDays(
             dateRange.endDate,
             dateRange.startDate
          );

          if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price)
          } else {
            setTotalPrice(listing.price)
          }
       }
   }, [dateRange, listing.price]);

  return (
    <Container>
       <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
             <ListingHead
                  title={listing.title}
                  imageSrc={listing.imageSrc}
                  locationValue={listing.locationValue}
                  id={listing.id}
                  currentUser={currentUser}
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
             <ListingInfo
                     user={listing.user}
                     category={category}
                     description={listing.description}
                     roomCount={listing.roomCount}
                     guestCount= {listing.guestCount}
                     bathroomCount={listing.bathroomCount}
                     locationValue={listing.locationValue}
             />

             <div className="order-first mb-10 md:order-last md:col-span-3">
               <ListingReservation
                     price={listing.price}
                     totalPrice={totalPrice}
                     onChangeDate= { (value) => setDateRange(value) }
                     dateRange={dateRange}
                     onSubmit={onCreateReservation}
                     disabled={isloading}
                     disabledDates= {disabledDates}
               />
             </div>
          </div>
       </div>
    </Container>
  )
}

export default ListingClient
