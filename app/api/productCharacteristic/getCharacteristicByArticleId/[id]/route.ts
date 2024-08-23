
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const productCharacteristic = await prismadb.productCharacteristic.findMany({
            where: {
                productId: id
            },
            include: {
                product: {
                    include: {
                        productCategories: true
                    }
                },
                characteristic: true,
            }
        });
        return NextResponse.json(productCharacteristic);
    } catch (error) {
        console.error('[characteristics]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}