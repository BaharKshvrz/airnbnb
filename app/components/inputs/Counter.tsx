import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
    title: string,
    subtitle: string,
    value: number,
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 0) {
        return;
    }
    onChange(value - 1);
  }, [onChange, value])

  return (
    <div className="flex items-center justify-between">
        <div className="font-medium">
            <p>{title}</p>
            <p className="text-neutral-400">{subtitle}</p>
        </div>
        <div className="flex justify-center items-center gap-3">
              <button
                  onClick={onReduce}
                  className="flex justify-center items-center w-10 h-10 
                             rounded-full border p-2 text-lg font-semibold
                             cursor-pointer border-neutral-400 hover:opacity-80"
                 >
                <AiOutlineMinus />
            </button>
            <p className="text-neutral-500 text-xl">{value}</p> 
           <button
               onClick={onAdd}
               className="flex justify-center items-center w-10 h-10 
               rounded-full border p-2 text-lg font-semibold
               cursor-pointer border-neutral-400 hover:opacity-80"
              >
             <AiOutlinePlus/>
          </button>
        </div>
    </div>
  )
}

export default Counter
