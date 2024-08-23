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


const CommentComp = () => {
    // @ts-ignore
    // @ts-ignore
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
                            [1, 2, 3, 4, 5].map((items, index) => {
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
                                                            Nous nous engageons à fournir des matériaux de construction
                                                            de la
                                                            plus haute qualité
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