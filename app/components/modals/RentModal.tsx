"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '@/app/constants'
import CategoryInput from '../inputs/CategoryInput'

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

  let bodyContent = (
     <div className="flex flex-col gap-8">
       <Heading
          title="Which of these best describe your place?"
          subtitle="Pick a category"
       />
       <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] gap-3 overflow-y-auto px-3">
          { categories.map((category) => (
              <div 
                className="col-span-1"
                key={category.label}
              >
                <CategoryInput
                  label={category.label}
                  onClick={() => {}}
                  icon={category.icon}
                 />
              </div>
            ))
          }
       </div>
     </div>
  )

  return (
    <Modal
        title="Airbnb is your home!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onClose={useRent.onClose}
        onSubmit={onNext}
        isOpen={useRent.isOpen}
        body={bodyContent}
        secondaryAction={step === STETPS.CATEGORY ? undefined: onBack}
   />
 )
}

export default RentModal
