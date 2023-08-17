"use client"

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import Image from 'next/image'
import React, { useCallback, useMemo } from 'react'
import useCountries from '../hooks/useCountries'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import HeartButton from '../HeartButton'
import Button from '../Button'

interface ListingCardProps {
    data: SafeListing,
    reservation?: SafeReservation,
    onAction?: (id: string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser: SafeUser | null,
}

const ListingCard: React.FC<ListingCardProps> = ({
   data,
   currentUser,
   disabled,
   reservation,
   onAction,
   actionLabel,
   actionId= ""
}) => {
  const router = useRouter();
  const {getByValue} = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation();
     if (disabled) {
        return;
     }
     onAction?.(actionId);
  }, [onAction, disabled, actionId]);

  const price = useMemo(() => {
    return reservation ? reservation.totalPrice : data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

    return (
    <div className="group col-span-1 cursor-pointer" onClick={() => router.push(`/listings/${data.id}`)}>
       <div className="flex flex-col gap-2 w-full">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Image
               alt={data.title}
               src={data.imageSrc}
               fill
               className="w-full h-full 
                          transition
                          object-cover group-hover:scale-110"
            />
            <div className="absolute top-3 right-3">
              <HeartButton
                 currentUser={currentUser}
                 listingId={data.id}
               />
            </div>
        </div>
           <div className="font-semibold text-md">
               {location?.label}, {location?.region}
            </div>
           <div className="text-neutral-400 font-light ">
               {reservationDate || data.category}
            </div>
           <div className="font-semibold flex items-center gap-1">
              $ {price}
              {reservation && (
                   <span className="text-sm">night</span>
              )} 
            </div>

            {onAction && actionLabel && (
               <Button
                   disabled={disabled}
                   label={actionLabel}
                   onClick={handleCancel}
                   small
               />
            )}
        </div>
    </div> 
  )
}

export default ListingCard


/*
   const formattedDate = format(new Date(2023, 7, 15), 'PP');  // Aug 15, 2023
*/