'use client';
import { Range } from 'react-date-range';
import Calendar from "../inputs/Calendar";
import Button from '../Button';

interface ListingReservationProps {
    price: number,
    totalPrice: number,
    onChangeDate: (value: Range) => void,
    dateRange: Range, 
    onSubmit: () => void,
    disabled? : boolean,
    disabledDates: Date[],
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    disabledDates,
    onSubmit,
    disabled,
    onChangeDate, 
}) => {
  return (
    <div className="bg-white rounded-xl border-neutral-200 border">
        <div className="flex p-5 items-center gap-2">
            <span className="text-2xl font-bold">
                $ {price}
            </span>
            <span className="text-neutral-400 font-light">
                night
            </span>
        </div>
        <hr/>

        <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
         />
       <hr/>

       <div className="p-5">
            <Button
               label="Reserve"
               onClick={onSubmit}
               disabled={disabled}
            />
        </div> 
       <hr/>
       <div className="flex justify-between p-5 font-semibold text-lg">
         <span>Total:</span>
         <span>$ {totalPrice}</span>
       </div>
    </div>
  )
}

export default ListingReservation
