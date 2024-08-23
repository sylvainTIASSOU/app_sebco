"use client"

import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {useRouter} from "next/navigation";
import {Api} from "@/app/api/Api";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import { Button } from "antd";
import {ShoppingCart} from "lucide-react";
import EmptyData from "@/app/(pages)/components/EmptyData";

export default function Product({params}: {params: {id: string}}) {
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [data, setData] = useState<ProductModel[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCat, setIsLoadingCat] = useState(false);
    const [catId, setCatId] = useState(params.id);
    const route = useRouter();

    useEffect(() => {

        setIsLoading(true)
        setIsLoadingCat(true)
        Api.read(`/api/article/getArticleByCategory/${catId}`).then((data) => {
            setData(data)
        }).finally(() => {
            setIsLoading(false)
        });


        Api.read("/api/category").then((cat) => {
            setCategories(cat)
        }).finally(() => {
            setIsLoadingCat(false)
        });
    }, [catId]);

    return (
        <div className={'my-[25%] md:my-[10%] px-3 md:px-20 flex flex-col'}>
            <div className={"flex md:space-x-10 md:flex-row flex-col space-y-2"}>
                {/*categories*/}
                <div className={" hidden md:flex flex-col space-y-3 h-auto w-auto px-5 rounded-xl  items-start  py-3"}>
                    {
                        isLoadingCat ?
                            [1, 2, 3, 4].map((el) => {
                                return <div>
                                    <Skeleton key={el} className="h-[12px] w-full rounded-xl"/>
                                </div>
                            })
                            :

                            categories.map((cats, index) => {

                                return <button key={index}
                                               onClick={() => {
                                                   setCatId(String(cats.id))
                                                   //route.push(`/articles/${cats.id}`)
                                               }}
                                               className={ cats.id == +catId ? "text-[20px] font-bold text-blue-600 px-3 flex space-x-3 border border-blue-600 bg-purple-100 rounded-md w-[200px] py-2 shadow-md" : " shadow-md  hover:bg-purple-100 py-2 rounded-md w-[350px] border border-blue-600 px-3 flex space-x-3 hover:accent-gray-400 text-[20px] font-regular"}
                                >
                                    <Image src={cats.imageUrl}
                                           alt={"category"}
                                           width={30}
                                           height={30}
                                           priority
                                           className={"bg-center object-cover bg-cover bg-content "}
                                    />
                                    <h1>{cats.name}</h1>
                                </button>


                            })
                    }
                </div>

                {/*Articles*/}
                <div className={'grid grid-cols-1 md:grid-cols-4 gap-4'}>
                    { isLoading ?
                        [1,2,3,4,5].map((el) => {
                            return <div className={""} key={el}>
                                <Skeleton className="h-[125px] w-auto md:w-[250px] rounded-xl"/>
                            </div>
                        })
                        :
                        data.length == 0 ?
                            <EmptyData/>
                            :
                            data.map((items, index) => {
                                return (
                                    <div key={index}
                                         className={"shadow-xl bg-white p-3 mx-[3rem] md:w-[15em] rounded-lg flex flex-col space-y-5 justify-between content-between"}>
                                        <Image src={items.imageUrl[0]} alt={"image"} width={150} height={150}
                                               className={"object-cover bg-cover bg-center self-center"}/>
                                        <div className={"flex justify-between content-between items-center"}>
                                            <div>
                                                <h1 className={"font-bold text-xl"}>{items.name}</h1>
                                                <h1 className={"text-gray-600 "}>{items.description?.slice(0, 20)}</h1>
                                                <h1 className={"text-orange-600 text-lg font-bold "}>{items.price} TTC</h1>
                                            </div>

                                            <Button className={"bg-blue-600 text-white font-bold p-2 hover:bg-secondColor/50"}
                                                    onClick={() => {
                                                        route.push(`/edit-product/${items.id}`)
                                                    }}
                                                    size={"small"}>
                                                <ShoppingCart/>
                                            </Button>

                                        </div>

                                    </div>
                                );


                            })
                    }
                </div>
            </div>
        </div>
    );
}