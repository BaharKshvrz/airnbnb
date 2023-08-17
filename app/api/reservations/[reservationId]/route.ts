import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
    reservationId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams}) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { reservationId } = params;
    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    const reservation = await prisma?.reservation.delete({
        where: {
            id: reservationId,
            // only the person who made a reservation or the owner can cancel the reservations
            OR: [
                { userId: currentUser.id },
                { listing: {userId: currentUser.id} }
            ]
        }
    });

    return NextResponse.json(reservation);
}