
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import { OrderProductModel } from "@/models/orderModule/OrderProductModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const orderArticleModel: OrderProductModel = body;

        const dataValidation = Dto.orderProductDto().validate(orderArticleModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const orderArticle = await prismadb.orderProduct.create({ data: dataValidation.value });
            return NextResponse.json({orderArticle: orderArticle, ok: true});
        }

    } catch (error) {
        console.error('[orderArticle]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const orderArticle = await prismadb.orderProduct.findMany({

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
        console.error('[orderArticle]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}