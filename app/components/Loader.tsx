"use client"
import { PulseLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] flex-col">
       <PulseLoader size={50} color="red"/>
    </div>
  )
}

export default Loader
