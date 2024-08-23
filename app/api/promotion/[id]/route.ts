import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {PromotionModel} from "@/models/promotionModule/PromotionModel";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const promotionModel: PromotionModel = body;

     

        const dataValidate = Dto.promotionDto().validate(promotionModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const promotion = await prismadb.promotion.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({promotion: promotion, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[stock]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const promotion = await prismadb.promotion.delete({
            where: { id: id }
        });

        return NextResponse.json({promotion: promotion, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const promotion = await prismadb.promotion.findUnique({
            where: { id }
        });

        return NextResponse.json(promotion);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}