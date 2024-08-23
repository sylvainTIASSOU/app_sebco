
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const orderArticle = await prismadb.orderProduct.findMany({
            where: { orderId: id },
            include: {
                product: {
                    include: {
                        productCategories: true
                    },
                },
                order: {
                    include: {
                        delivery: {
                            include: {
                                user: true
                            }
                        }
                    }
                },
            }
        });

        return NextResponse.json(orderArticle);
    } catch (error) {
        console.error('[order]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}