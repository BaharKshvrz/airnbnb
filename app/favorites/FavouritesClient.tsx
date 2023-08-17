import React from 'react'
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavouritesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
    <Heading 
      title="My Favouties"
      subtitle="List of places you have favorited!"
   />

  <div className="
        pt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
      { listings?.map(favourite => (
           <ListingCard
              key={favourite.id}
              data={favourite}
              currentUser={currentUser}
          />
      ))
      }
 </div>
</Container>
  )
}

export default FavouritesClient
