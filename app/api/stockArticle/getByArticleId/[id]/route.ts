import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";


export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const stockArticle = await prismadb.stockProduct.findMany({
            where: { productId: id },
            include: {
                product: {
                    include: {
                        productCategories: true
                    }
                },
                stock: {
                    include: {
                        provider: true
                    }
                }
            }
        });

        return NextResponse.json(stockArticle);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}