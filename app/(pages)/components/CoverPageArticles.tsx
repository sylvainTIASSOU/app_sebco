"use client"

import {Button} from "antd";
import {ArrowRightCircle, ShoppingCart} from "lucide-react";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {Skeleton} from "@/components/ui/skeleton";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/stockModule/ProductModel";
import EmptyData from "@/app/(pages)/components/EmptyData";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {Api} from "@/app/api/Api";

const CoverPageArticle = () => {
    const [loading, setLoading] = useState(false);
    const [articlesData, setArticlesData] = useState<ProductModel[]>([])
    const route = useRouter()

    useEffect(() => {
        setLoading(true)
        Api.read('/api/article').then((data) => {
            setArticlesData(data)
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className={"flex md:px-20 px-3 flex-col space-y-20"}>
            <h1 className={'text-2xl md:text-4xl text-start md:px-0 font-medium text-black mt-5'}>
                Explorez notre sélection de sacs de ciment, briques, <br/> blocs, graviers, sables, poutres et
                autres <br/>
                matériaux de construction.
            </h1>

            <div className={"grid grid-cols-1 md:grid-cols-6 gap-4"}>
                {
                    loading ?
                        [1, 2, 3, 4, 5, 6].map((items) => {
                            return (
                                <Skeleton key={items}
                                          className={"shadow-xl p-3 md:w-[15em] h-[18em] rounded-lg flex flex-col justify-between content-between"}/>
                            );
                        })
                        :
                        articlesData.length == 0 ?
                            <div className={"w-full"}>
                                <EmptyData/>
                            </div>

                            :
                            articlesData.map((items, index) => {
                                if (index < 6) {
                                    return (
                                        <div key={index}
                                             className={"shadow-xl bg-white space-y-5 p-3 md:w-[15em] mx-[3rem] md:mx-0 rounded-lg flex flex-col justify-between content-between"}>
                                            <Image src={items.imageUrl[0]} alt={"image"} width={150}
                                                   height={150}
                                                   className={"object-cover bg-cover bg-center self-center"}/>
                                            <div
                                                className={"flex justify-between content-between items-center"}>
                                                <div>
                                                    <h1 className={"font-bold text-xl"}>{items.name}</h1>
                                                    <h1 className={"text-gray-600 "}>{items.description?.slice(0, 20)}</h1>
                                                    <h1 className={"text-orange-600 text-lg font-bold "}>{items.price} TTC</h1>
                                                </div>

                                                <Button
                                                    className={"bg-blue-600 hover:bg-blue-40 text-white font-bold p-3"}
                                                    onClick={() => {
                                                        route.push(`/edit-product/${items.id}`)
                                                    }}
                                                    size={"small"}>
                                                    <ShoppingCart/>
                                                </Button>

                                            </div>

                                        </div>
                                    );
                                }

                            })
                }

            </div>


            <div className={" w-full md:px-0"}>
                {/*swipper*/}
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
                                articlesData.map((items, index) => {
                                   if(index> 3 && index < 10) {
                                    return (
                                        <CarouselItem key={index} className={"md:basis-1/2 lg:basis-1/3"}>
                                            <div className="p-1">
                                                <Card className={"  mx-[2rem] md:mx-0 "}>
                                                    <CardContent
                                                        className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:space-x-5 md:content-between   md:h-[200px] aspect-square items-center   p-4">

                                                        <Image src={items.imageUrl[0]} alt={""} width={300}
                                                               height={300} className={'hidden md:flex'}/>
                                                        <div className={"h-[200px]  flex md:hidden"}>
                                                            <Image src={items.imageUrl[0]} alt={""} width={400}
                                                                   height={200} className={''}/>
                                                        </div>


                                                        <div className={'w-full flex flex-col space-y-3 '}>
                                                            {/*title*/}
                                                            <h1 className={'font-bold text-lg text-center md:text-start'}>{items.name}</h1>

                                                            {/*description*/}
                                                            <div
                                                                className={' text-center text-orange-600  md:text-start font-bold text-sm mt-5'}>
                                                                {items.price} <span
                                                                className={'font-light text-[15px]'}>TTC</span>
                                                            </div>

                                                            <Button
                                                                onClick={() => {
                                                                    route.push(`/edit-product/${items.id}`)
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
                                   }
                                })
                            }
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </section>

            </div>

            <Button
                onClick={() => {
                    route.push("/categories");
                }}
                className={"flex space-x-3 bg-transparent border-none w-[150px]  shadow-none text-blue-600  "}>
                <h1 className={"text-sm"}>
                    Voir plus

                </h1>
                <ArrowRightCircle className={"size-7"}/>
            </Button>
        </div>
    );
}
export default  CoverPageArticle;