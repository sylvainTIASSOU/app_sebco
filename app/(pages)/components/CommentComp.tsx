"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {Quote, User} from "lucide-react";
import { useEffect, useState } from "react";
import { Api } from "@/app/api/Api";
import { CommentModel } from "@/models/CommentModel";
import { Skeleton } from "@/components/ui/skeleton";


const CommentComp = () => {
const [data, setData] = useState<CommentModel[]>([]);
const [loading, setLoading] = useState(false);
    // @ts-ignore
    // @ts-ignore

    useEffect(() => {
        Api.read('/api/comment').then((val) => {
            setData(val)
            setLoading(true);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <section className={"flex md:px-20 px-3 flex-col space-y-5"}>
            <h1 className={'text-[30px] md:px-0 font-medium text-black'}>
                Avis des clients
            </h1>

            <section className={"flex items-center content-center justify-center"}>
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }) as any,
                    ]}
                    opts={{
                        align: "start",
                    }}
                    className="w-full  ">
                    <CarouselContent className={" w-full"}>
                        {
                            loading ?
                            [1,2,3,4,5,6].map((items, index) => {
                                return (
                                    <CarouselItem key={index} className={"md:basis-1/2 lg:basis-1/3"}>
                                        <div className="p-1">
                                            <Card className={"  "}>
                                                <CardContent
                                                    className="flex flex-col space-y-3 md:space-y-0 md:flex-row  md:space-x-5 w-full   md:h-[200px] aspect-square items-center p-4">
                                                        <Skeleton className="" />
                                                    
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })

                            :
                            data.map((items, index) => {
                                return (
                                    <CarouselItem key={index} className={"md:basis-1/2 lg:basis-1/3"}>
                                        <div className="p-1">
                                            <Card className={"  "}>
                                                <CardContent
                                                    className="flex flex-col space-y-3 md:space-y-0 md:flex-row  md:space-x-5 w-full   md:h-[200px] aspect-square items-center p-4">

                                                    <div>
                                                        <div
                                                            className={"rounded-full  size-16 border-2 border-gray-400 flex items-center justify-center  "}>
                                                            <User className={"size-10"}/>
                                                        </div>

                                                    </div>

                                                    <div className={"flex flex-col space-y-4 w-full"}>
                                                        <Quote className={"size-8 self-start "}/>
                                                        <h1>
                                                            {items.content}
                                                        </h1>


                                                        <Quote className={"size-8 self-end text-right"}/>
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

        </section>
    )
}
export default CommentComp;