import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        const favourites = await prisma?.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds) || []]
                }
            }
        });

        const safeFavories = favourites?.map((favourite) => ({
                ...favourite,
                 createdAt: favourite.createdAt.toISOString()
            }
        ));

        return safeFavories;
        
    } catch (error: any) {
        throw new Error(error)
    }
}