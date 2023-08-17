import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();  
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                  title="Unauthorized"
                  subtitle="Pleas Login!"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
         authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
        <ClientOnly>
            <EmptyState
                 title="No Reservations Found!"
                 subtitle="Look like you haven't reserved any trips!"
            />
        </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage
