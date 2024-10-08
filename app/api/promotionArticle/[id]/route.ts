import {Dto} from "@/DTO/Dto";
import { PromotionProductModel } from "@/models/promotionModule/PromotionProductModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const promotionArticleModel: PromotionProductModel = body;

     

        const dataValidate = Dto.promotionProductDto().validate(promotionArticleModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const promotionArticle = await prismadb.promotionProduct.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({promotionArticle: promotionArticle, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[stock]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const promotionArticle = await prismadb.promotionProduct.delete({
            where: { id: id }
        });

        return NextResponse.json({promotionArticle: promotionArticle, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const promotionArticle = await prismadb.promotionProduct.findUnique({
            where: { id },
            include: {
                promotion: true,
                product:{
                    include: {
                        productCategories: true
                    }
                },
            }
        });

        return NextResponse.json(promotionArticle);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}