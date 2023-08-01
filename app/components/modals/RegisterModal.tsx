"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal"

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form"
import useRegisterModal from "../hooks/useRegisterModal"; 
import { useState } from "react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  console.log(registerModal.isOpen)
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: {
       errors,
    }
  } = useForm<FieldValues>({
     defaultValues: {
        name: '',
        email: '',
        password: '',
     }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
     setIsLoading(false);
     axios.post("/api/register", data)
       .then(() => {
         registerModal.onClose();
       })
       .catch((error) => {
         console.log(error)
       })
       .finally(() => {
          setIsLoading(false)
       })
  }

  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={<p>footer</p>}
        footer={<p>footer</p>}
  />
  )
}

export default RegisterModal
