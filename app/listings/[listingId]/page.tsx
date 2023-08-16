import getListById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId?: string;
  }

const ListingPage = async ({params}: { params: IParams }) => {
  const listing = await getListById(params);  
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
        <ClientOnly>
            <EmptyState/>
        </ClientOnly>
    )
  }

  return (
      <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservations={reservations}
      />
  )
}

export default ListingPage
