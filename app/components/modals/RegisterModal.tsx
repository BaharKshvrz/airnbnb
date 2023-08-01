"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal"
import Heading from "../Heading"
import useRegisterModal from "../hooks/useRegisterModal"; 
import { useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form"
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
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
     setIsLoading(true);
     axios.post("/api/register", data)
       .then(() => {
         registerModal.onClose();
       })
       .catch((error) => {
          toast.error("Something went wrong!")
       })
       .finally(() => {
          setIsLoading(false)
       })
  }

  const bodyContent = (
     <div className="flex flex-col gap-4">
        <Heading
           title="Welcome to Airbnb"
           subtitle="Create an account!"
        />
        <Input
           id="email"
           label="Email"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
        />
       <Input
           id="name"
           label="Name"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
        />

         <Input
           id="password"
           label="Password"
           type="password"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
        /> 
     </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4">
       <Button
          label="Continue with Google"
          outline
          icon={FcGoogle}
          onClick={() => {}}
       />

        <Button
          label="Continue with Github"
          outline
          icon={AiFillGithub}
          onClick={() => {}}
       />

       <div className="flex justify-center">
         <span className="text-neutral-500">Already have an account?</span>
         <span className="ml-2 hover:underline text-neutral-700 cursor-pointer">Login</span>
       </div>
    </div>
  ) 

  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
  />
  )
}

export default RegisterModal
