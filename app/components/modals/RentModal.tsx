"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '@/app/constants'
import CategoryInput from '../inputs/CategoryInput'
import { toast } from 'react-hot-toast';

import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import CategorySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'

enum STETPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
  const useRent = useRentModal();
  const [step, setStep] = useState(STETPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle the user's items on book room
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null, // it's an object
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });
  const category = watch('category');
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch('imageSrc');


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
 // end of the section

 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STETPS.PRICE ) {
      return onNext();
    }
    setIsLoading(true);
    axios.post("/api/listings", data)
       .then(() => {
         toast.success("Listing created!");
         router.refresh();
         setStep(STETPS.CATEGORY);
         useRent.onClose();
       })
       .catch(() => {
         toast.error("Something went wrong!")
       })
       .finally(() => {
         setIsLoading(false);
       })

  }

  const onBack = () => {
    setStep(value => value - 1);
  }
  const onNext = () => {
    setStep(value => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STETPS.PRICE) {
       return "Create";
    }
    return "Next";
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STETPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  // Load Map
  const Map = useMemo(() => dynamic(() => import("../Map"), {ssr: false}), 
  [ location ])

  // Define the bodyContent
  let bodyContent = (
     <div className="flex flex-col gap-8">
       <Heading
          title="Which of these best describe your place?"
          subtitle="Pick a category"
       />
       <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] gap-3 overflow-y-auto px-3">
          { categories.map((categoryItem) => (
              <div 
                 className="col-span-1"
                 key={categoryItem.label}
              >
                <CategoryInput
                  label={categoryItem.label}
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === categoryItem.label}
                  icon={categoryItem.icon}
                 />
              </div>
            ))
          }
       </div>
     </div>
  )

  if (step === STETPS.LOCATION) {
      bodyContent= (
        <div className="flex flex-col gap-8">
            <Heading
               title="Which is your place loacated?"
               subtitle="Help guest find you!"
            />
            <CategorySelect
               value={location}
               onChange={(value) => setCustomValue('location', value)} 
             />
             <Map center={location?.latlng}/>
        </div>
      );
  }

  if (step === STETPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place."
            subtitle="What amenities do you have?"
          />
          <Counter 
               title="Guests"
               subtitle="How many guests do you allow?"
               onChange={(value) => setCustomValue("guestCount", value)}
               value={guestCount}
         />
         <hr/>
          <Counter 
               title="Rooms"
               subtitle="How many rooms do you have?"
               onChange={(value) => setCustomValue("roomCount", value)}
               value={roomCount}
         />

        <hr/>
          <Counter 
               title="Bathrooms"
               subtitle="How many bathrooms do you have?"
               onChange={(value) => setCustomValue("bathroomCount", value)}
               value={bathroomCount}
         />
      </div>
    )
  }

  if (step === STETPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
        />
      </div>
    )
  }

  if (step === STETPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
             title="How would you describe your place?"
             subtitle="Short and sweet works best!"
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            required
            register= {register}
            errors={errors}
         />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            required
            register= {register}
            errors={errors}
         />
      </div>
    )
  }

  if (step === STETPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
             title="How would you describe your place?"
             subtitle="Short and sweet works best!"
          />
          <Input
            id="price"
            label="Price"
            disabled={isLoading}
            required
            formatPrice
            type="number"
            register= {register}
            errors={errors}
         />
      </div>
    )
  }

  

  return (
    <Modal
        title="Airbnb is your home!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onClose={useRent.onClose}
        onSubmit={handleSubmit(onSubmit)}
        isOpen={useRent.isOpen}
        body={bodyContent}
        secondaryAction={step === STETPS.CATEGORY ? undefined: onBack}
   />
 )
}

export default RentModal
