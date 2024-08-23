"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Image from "next/image";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import EmptyData from "@/app/(pages)/components/EmptyData";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import {useRouter} from "next/navigation";

const CoverPageCategory = () => {
    const [data1, setData1] = useState<ProductModel[]>([])
    const [data2, setData2] = useState<ProductModel[]>([])
    const [data3, setData3] = useState<ProductModel[]>([])
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const route = useRouter();
    useEffect(() => {
        setLoading1(true)
        setLoading2(true)
        setLoading3(true)

        Api.read(`/api/article/getArticleByCategoryName/acier`).then((data) => {
            setData1(data)
        }).finally(() => {
            setLoading1(false);
        });
        Api.read('/api/article/getArticleByCategoryName/ciment').then((data) => {
            setData2(data)
        }).finally(() => {
            setLoading2(false);
        });
        Api.read('/api/article/getArticleByCategoryName/materiaux').then((data) => {
            setData3(data)
        }).finally(() => {
            setLoading3(false);
        });
    }, []);


    return (
        <section className={'mt-[50px] md:px-20 px-3 flex flex-col space-y-5 py-10'}>
            <h1 className={'text-[30px] font-medium text-black'}>Parcourez nos catégories</h1>

            <Tabs defaultValue="acier" className="md:w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger className={"font-bold text-lg "} value="acier">Acier</TabsTrigger>
                    <TabsTrigger className={"font-bold text-lg "} value="ciment">Ciment</TabsTrigger>
                    <TabsTrigger className={"font-bold text-lg "} value="materiaux">Materiaux</TabsTrigger>
                </TabsList>
                <TabsContent
                    className={"md:w-[80rem] w-full xl:w-[105rem] flex space-x-0 flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-5 items-center "}
                    value="acier">
                    {/* <div className={"md:w-[600px] w-full "}>

                        <Image src={"/acier.jpg"} className={"rounded-2xl"} alt={""} width={400} height={400}
                               quality={100} priority={true}/>

                    </div>*/}

                    <div className={" w-full grid md:pr-[10rem] grid-cols-1 md:grid-cols-3 gap-4"}>
                        {
                            loading1 ?
                                [1, 2, 3].map((items) => {
                                    return (
                                        <Skeleton key={items}
                                                  className={"shadow-xl p-3 md:max-w-[25em] h-[10em]  rounded-lg flex  justify-between content-between"}/>
                                    );
                                })
                                :
                                data1.length == 0 ?
                                    <EmptyData/>
                                    :
                                    data1.map((items, index) => {
                                        return (
                                            <div key={index}
                                                 className={"shadow-xl bg-white p-3 md:max-w-[25em]  rounded-lg flex  justify-between content-between"}>
                                                <Image src={items.imageUrl[0]} alt={"image"} width={150}
                                                       height={150}
                                                       className={"object-cover bg-cover bg-center self-center"}/>
                                                <div className={"flex flex-col space-y-5  "}>
                                                    <div>
                                                        <h1 className={"font-bold text-xl"}>{items.name}</h1>
                                                        <h1 className={"text-gray-600 "}>{items.description?.slice(0, 20)}</h1>
                                                        <h1 className={"text-orange-600 text-lg font-bold "}>{items.price} TTC</h1>
                                                    </div>

                                                    <Button
                                                        className={"bg-blue-600 hover:bg-secondColor/50 flex space-x-2  text-sm"}
                                                        onClick={() => {
                                                            route.push(`/edit-product/${items.id}`)
                                                        }}
                                                        size={"sm"}>
                                                        <ShoppingCart/>
                                                        <h1>Ajouter</h1>

                                                    </Button>

                                                </div>

                                            </div>
                                        );
                                    })
                        }
                    </div>

                </TabsContent>


                <TabsContent
                    className={"md:w-[80rem] xl:w-[105rem] flex space-x-0 flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-5 items-center"}
                    value="ciment">
                    {/* <div className={"md:w-[600px]"}>

                        <Image src={"/cimtogo.jpg"} className={"rounded-2xl"} alt={""} width={400} height={400}
                               quality={100} priority={true}/>

                    </div>*/}
                    <div className={" w-full md:pr-[10rem] grid grid-cols-1 md:grid-cols-3 gap-4"}>
                        {
                            loading1 ?
                                [1, 2, 3].map((items) => {
                                    return (
                                        <Skeleton key={items}
                                                  className={"shadow-xl p-3 md:max-w-[25em] h-[10em]  rounded-lg flex  justify-between content-between"}/>
                                    );
                                })
                                :
                                data2.length == 0 ?
                                    <EmptyData/>
                                    :
                                    data2.map((items, index) => {
                                        return (
                                            <div key={index}
                                                 className={"shadow-xl bg-white p-3 md:max-w-[23em] md:mr-[5rem]  rounded-lg flex  justify-between content-between"}>
                                                <Image src={items.imageUrl[0]} alt={"image"} width={150}
                                                       height={150}
                                                       className={"object-cover bg-cover bg-center self-center"}/>
                                                <div className={"flex flex-col space-y-5  "}>
                                                    <div>
                                                        <h1 className={"font-bold text-xl"}>{items.name}</h1>
                                                        <h1 className={"text-gray-600 "}>{items.description?.slice(0, 20)}</h1>
                                                        <h1 className={"text-orange-600 text-lg font-bold "}>{items.price} TTC</h1>
                                                    </div>

                                                    <Button
                                                        className={"bg-blue-600 hover:bg-secondColor/50 flex space-x-2  text-sm"}
                                                        onClick={() => {
                                                            route.push(`/edit-product/${items.id}`)
                                                        }}
                                                        size={"sm"}>
                                                        <ShoppingCart/>
                                                        <h1>Ajouter </h1>

                                                    </Button>

                                                </div>

                                            </div>
                                        );
                                    })
                        }
                    </div>

                </TabsContent>


                <TabsContent
                    className={"md:w-[80rem] xl:w-[105rem] flex space-x-0 flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-5 items-center"}
                    value="materiaux">
                    {/* <div className={"md:w-[600px]"}>

                        <Image src={"/materiau.jpg"} className={"rounded-2xl"} alt={""} width={400} height={600}
                               quality={100} priority={true}/>

                    </div>*/}

                    <div className={"w-full md:pr-[10rem] grid grid-cols-1 md:grid-cols-3 gap-4"}>
                        {
                            loading1 ?
                                [1, 2, 3].map((items) => {
                                    return (
                                        <Skeleton key={items}
                                                  className={"shadow-xl p-3 md:max-w-[25em] h-[10em]  rounded-lg flex  justify-between content-between"}/>
                                    );
                                })
                                :
                                data3.length == 0 ?
                                    <EmptyData/>
                                    :
                                    data3.map((items, index) => {
                                        return (
                                            <div key={index}
                                                 className={"shadow-xl bg-white p-3 md:max-w-[25em]  rounded-lg flex  justify-between content-between"}>
                                                <Image src={items.imageUrl[0]} alt={"image"} width={150}
                                                       height={150}
                                                       className={"object-cover bg-cover bg-center self-center"}/>
                                                <div className={"flex flex-col space-y-5  "}>
                                                    <div>
                                                        <h1 className={"font-bold text-xl"}>{items.name}</h1>
                                                        <h1 className={"text-gray-600 "}>{items.description?.slice(0, 20)}</h1>
                                                        <h1 className={"text-orange-600 text-lg font-bold "}>{items.price} TTC</h1>
                                                    </div>

                                                    <Button
                                                        className={"bg-blue-600 hover:bg-secondColor/50 flex space-x-2  text-sm"}
                                                        size={"sm"}
                                                        onClick={() => {
                                                            route.push(`/edit-product/${items.id}`)
                                                        }}
                                                    >
                                                        <ShoppingCart/>
                                                        <h1>Ajouter</h1>

                                                    </Button>

                                                </div>

                                            </div>
                                        );
                                    })
                        }
                    </div>

                </TabsContent>
            </Tabs>
        </section>
    )
}
export default CoverPageCategory;