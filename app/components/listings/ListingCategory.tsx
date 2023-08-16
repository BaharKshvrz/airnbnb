import { IconType } from 'react-icons';

interface ListingCategoryProps {
   label: string;
   icon: IconType;
   description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
   label,
   icon: Icon,
   description,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Icon size={40} className="text-neutral-500" />   
      <div className="flex flex-col">
        <div className="text-lg font-semibold">
            {label}
        </div>
        <div className="font-light text-neutral-500 mt-2">
            {description}
        </div>
    </div>
    </div>
  )
}

export default ListingCategory
