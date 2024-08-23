"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {Api} from "@/app/api/Api";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import EmptyData from "@/app/(pages)/components/EmptyData";
import {Button} from "antd";

const  PromotionComp = () => {
    const [promotion, setPromotion] = useState<any[]>([]);
    const route = useRouter();

    useEffect(() => {
        Api.read('/api/promotionArticle').then((promo) => {
            setPromotion(promo);
            console.log(promo)
        })
    }, []);
    // @ts-ignore
    return (
        <section className={"flex md:px-20 px-3 flex-col space-y-5 items-center content-center justify-center"}>
            <h1 className={"text-2xl md:text-4xl"}>Articles en promotions </h1>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }) as any ,
                ]}
                opts={{
                    align: "start",
                }}
                className="w-full  ">
                <CarouselContent className={" w-full"}>
                    {
                        promotion.length == 0 ?
                            <EmptyData/>
                            :
                            promotion.map((items, index) => {
                                return (
                                    <CarouselItem key={index} className={"md:basis-1/3 lg:basis-1/3"}>
                                        <div className="p-1">
                                            <Card className={" mx-[2rem] md:mx-0 "}>
                                                <CardContent
                                                    className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:space-x-5 md:content-between  md:h-[200px] aspect-square items-center   p-4">

                                                    <Image src={items.product.imageUrl[0]} alt={""} width={300}
                                                           height={300} className={'hidden md:flex'}/>
                                                    <div className={"h-[200px]  flex md:hidden"}>
                                                        <Image src={items.product.imageUrl[0]} alt={""} width={400}
                                                               height={200} className={''}/>
                                                    </div>


                                                    <div className={'w-full flex flex-col space-y-3 '}>
                                                        {/*title*/}
                                                        <h1 className={'font-bold text-lg text-center md:text-start'}>{items.product.name}</h1>

                                                        {/*description*/}
                                                        <div
                                                            className={' text-center text-orange-600 line-through  md:text-start font-bold text-sm  mt-5'}>
                                                            {items.oldPrice} <span
                                                            className={'font-light text-[15px]'}>TTC</span>
                                                        </div>
                                                        <div
                                                            className={' text-center text-orange-600  md:text-start font-bold text-lg mt-5'}>
                                                            {items.newPrice} <span
                                                            className={'font-light text-[15px]'}>TTC</span>
                                                        </div>

                                                        <Button
                                                            onClick={() => {
                                                                route.push(`/products/${items.id}`)
                                                            }}
                                                            className={"bg-blue-600 text-white font-bold mr-3 mb-2 md:mb-0"}>
                                                            Voire les détails.
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </section>
    );
}
export default PromotionComp;