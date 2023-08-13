import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();
    const {
        title,
        description,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price
       } = body;
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.error()
        }

        const listing = await prisma?.listing.create({
                data: {
                    title,
                    category,
                    description,
                    locationValue: location.value,
                    guestCount,
                    roomCount,
                    bathroomCount,
                    imageSrc,
                    price: parseInt(price, 10),
                    userId: currentUser.id,
                }
            }
        );

        return NextResponse.json(listing)
}
