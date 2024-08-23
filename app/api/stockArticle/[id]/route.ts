import {Dto} from "@/DTO/Dto";
import { StockProductModel } from "@/models/stockModule/StockProductModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const stockArticleModel: StockProductModel = body;

     

        const dataValidate = Dto.stockProductDto().validate(stockArticleModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const stockArticle = await prismadb.stockProduct.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({stockArticle: stockArticle, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[stock]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const stockArticle = await prismadb.stockProduct.delete({
            where: { id: id }
        });

        return NextResponse.json({stockArticle: stockArticle, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const stockArticle = await prismadb.stockProduct.findUnique({
            where: { id },
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