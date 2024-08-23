"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {AlignJustify} from "lucide-react";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {Api} from "@/app/api/Api";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import {useRouter} from "next/navigation";

const Menu = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [articles, setArticles] = useState<ProductModel[]>([]);
    const [catId, setCatId] = useState('');
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const route = useRouter()
    useEffect(() => {
        setLoading1(true)
        setLoading2(true)
            Api.read('/api/category').then((items) => {
                setCategories(items);
                setCatId(items.id);
            }).finally(() => {
                setLoading1(false)
            });

            if(catId=='' || catId == undefined) {
                  Api.read(`/api/article/getArticleByCategory/1`).then((item) => {
            setArticles(item);
        }).finally(() => {
            setLoading2(false)
        });
            } else {
                Api.read(`/api/article/getArticleByCategory/${catId}`).then((item) => {
                    setArticles(item);
                }).finally(() => {
                    setLoading2(false)
                });
            }
      
    }, []);
    return(
        <Popover>
            <PopoverTrigger>
                <AlignJustify/>
            </PopoverTrigger>
            <PopoverContent className={"w-auto h-auto p-5"}>
                <div className={"flex flex-col md:flex-row gap-5"}>
                    {/*category*/}
                    <div className={"flex flex-col gap-5 "}>
                        <h1 className={"text-sm "}>Catégories</h1>

                        {
                            loading1 ?
                                [1,2,3,4,5].map((items) => {
                                    return(
                                        <Skeleton key={items} className={"w-[10rem] h-10"} />
                                    )
                                })
                                 :
                            categories?.map((items, index) => {
                                return(
                                    <div key={index}
                                         onClick={async() => {
                                             setCatId(String(items.id))
                                             setLoading2(true)
                                             await Api.read(`/api/article/getArticleByCategory/${items.id}`).then((item) => {
                                                 setArticles(item);
                                             }).finally(() => {
                                                 setLoading2(false)
                                             });
                                         }}
                                         className={"inline-flex items-center hover:bg-blue-600 text-white font-black cursor-pointer  gap-3 p-1 rounded-xl bg-blue-300 w-[10rem]"}>
                                        <Image src={items.imageUrl} alt={"images"} width={30} height={30} className={"bg-cover object-cover"} />
                                        <h1>{items.name}</h1>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {/*article*/}
                    <div className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>

                        {
                            loading2 ?
                                [1,2,3,4,5].map((items) => {
                                    return(
                                        <Skeleton key={items} className={"w-[5rem] h-[7rem]"} />
                                    )
                                })
                                :
                            articles.map((items, index) => {
                                return(
                                    <div key={index}
                                         onClick={() => {
                                             route.push(`/edit-product/${items.id}`)
                                         }}
                                         className={"flex flex-col h-[8.5rem] cursor-pointer gap-2 bg-slate-100 rounded-lg p-2 items-center"} >
                                        <div className={""}>
                                            <Image src={items.imageUrl[0]} alt={""} width={"80"} height={80} className={"object-cover"}/>
                                        </div>

                                        <h1>{items.name}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default Menu;