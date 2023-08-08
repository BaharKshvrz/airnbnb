"use client"
import React, { useReducer } from 'react'
import Modal from './Modal'
import useRentModal from '../hooks/useRentModal'


const RentModal = () => {
  const useRent = useRentModal();
  return (
    <Modal
        title="Airbnb is your home!"
        actionLabel="Submit"
        onClose={useRent.onClose}
        onSubmit={useRent.onClose}
        isOpen={useRent.isOpen}
   />
 )
}

export default RentModal
