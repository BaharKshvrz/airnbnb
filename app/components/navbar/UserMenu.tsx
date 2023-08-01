"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '../hooks/useRegisterModal';

const UserMenu = () => {
 const [isOpen, setIsopen] = useState(false);
 const registerModal = useRegisterModal();

 const toggleOpen = useCallback(() => {
    setIsopen(value => !value);
  }, [])

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap -3">
          <div 
             className="cursor-pointer hidden md:block
                        rounded-full hover:bg-neutral-100
                        py-3 px-4 font-semibold text-sm"
             onClick={() => {}}
             >
              Airbnb your home
          </div>
          <div
             className="flex justify-around items-center
                        border border-neutral-100 
                        rounded-full gap-3
                        py-3 px-4 cursor-pointer"
             onClick={toggleOpen}
             >
            <AiOutlineMenu/>
            <div className="hidden md:block">
               <Avatar/>
            </div>
          </div>
      </div>

      {isOpen && (
        <div className="absolute top-12 right-0
                        rounded-3xl
                        shadow-sm 
                        w-[40vw]
                        md:w-3/4
                        overflow-hidden
                       ">
          <div className="flex flex-col cursor-pointer">
              <MenuItem 
                 onClick={() => {}}
                 label="Login"
                 />
              <MenuItem 
                 onClick={registerModal.onOpen}
                 label="Sign up"
                 />
           </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
