"use client";

import Button from './Button';
import { useRouter } from 'next/navigation';
import Heading from './Heading';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters.",
    showReset
}) => {
  const router = useRouter();  
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-[60vh]">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
         <div className="w-48">
             { showReset && (
                    <Button 
                           label="Remove All Filters"
                           outline
                           onClick={() => router.push("/")}
                    />
             )}
         </div>
       
    </div>
  )
}

export default EmptyState
