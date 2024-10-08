import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";


export async function GET(req: Request, { params  }: { params: {id: string, status: string}}) {
    try {
        const userId = +params.id;
        const order = await prismadb.order.findMany({
            where: {
                status: params.status,
                isActived: true,
                isVisible: true,
                delivery: {
                    userId: userId
                }
            },
            include: {
                delivery: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('[order]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}