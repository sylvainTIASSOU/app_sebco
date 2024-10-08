
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";  
import { CharacteristicProductModel } from "@/models/stockModule/CharacteristicProductModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const characteristicArticleModel: CharacteristicProductModel = body;

        const dataValidation = Dto.productCharacteristicDto().validate(characteristicArticleModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const productCharacteristic = await prismadb.productCharacteristic.create({ data: dataValidation.value });
            return NextResponse.json({productCharacteristic: productCharacteristic, ok: true});
        }

    } catch (error) {
        console.error('[productCharacteristic]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const productCharacteristic = await prismadb.productCharacteristic.findMany({

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
        console.error('[productCharacteristic]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}