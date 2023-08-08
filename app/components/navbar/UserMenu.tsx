"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '../hooks/useRentModal';

interface UserMenuProps {
  currentUser?: SafeUser | null,
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
 const router = useRouter();
 const [isOpen, setIsopen] = useState(false);
 const registerModal = useRegisterModal();
 const loginModal = useLoginModal();
 const rentModal = useRentModal();

 const toggleOpen = useCallback(() => {
     setIsopen(value => !value);
  }, [])


 const onRent = useCallback(() => {
   if (!currentUser) {
     return loginModal.onOpen();
   }
   rentModal.onOpen();
 }, [loginModal, rentModal, currentUser]) 

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap-3">
          <div 
              className="cursor-pointer hidden md:block
                        rounded-full hover:bg-neutral-100
                        py-3 px-4 font-semibold text-sm"
              onClick={onRent}
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
               <Avatar src={currentUser?.image}/>
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
                        bg-white
                       ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
                <>
                    <MenuItem 
                      label={"My trips" }
                      onClick={() => router.push('/trips')}
                    />
                    <MenuItem 
                      label="My favorites" 
                      onClick={() => router.push('/favorites')}
                    />
                    <MenuItem 
                      label="My reservations" 
                      onClick={() => router.push('/reservations')}
                    />
                    <MenuItem 
                      label="My properties" 
                      onClick={() => router.push('/properties')}
                    />
                    <MenuItem 
                      label="Airbnb your home" 
                      onClick={onRent}
                    />
                    <hr />
                    <MenuItem 
                      label="Logout" 
                      onClick={() => signOut()}
                    />
                </>
            ) :
            (
              <>
                  <MenuItem 
                      onClick={loginModal.onOpen}
                      label="Login"
                  />
                  <MenuItem 
                      onClick={registerModal.onOpen}
                      label="Sign up"
                  />
              </>
            )
            }
           </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
