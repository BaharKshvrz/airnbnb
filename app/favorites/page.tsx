import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavouritesClient from './FavouritesClient'
import getCurrentUser from '../actions/getCurrentUser'

const FavoritesPage = async() => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
     return (
        <ClientOnly> 
             <EmptyState
                title="No favourites found!"
                subtitle="Looks like you have no favourite listings."
             />
      </ClientOnly>
     );
  }

  return (
    <ClientOnly> 
           <FavouritesClient
                listings={listings!}
                currentUser={currentUser}
            />
    </ClientOnly>
  );
}

export default FavoritesPage
