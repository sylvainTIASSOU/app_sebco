"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {Api} from "@/app/api/Api";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";





const NavigationMenuCategorie = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const pathname = usePathname();
    const [loading1, setLoading1] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading1(true)
            Api.read('/api/category').then((items) => {
                setCategories(items);
            }).finally(() => {
                setLoading1(false)
            });
    }, []);

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:text-blue-600">Nos categries</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 p-8 w-[14rem]">
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
                                    <NavigationMenuLink key={index}
                                         onClick={async() => {
                                             router.push(`/product/${items.id}`);
                                         }}
                                         className={"inline-flex items-center hover:bg-blue-200  cursor-pointer  gap-3 p-1 rounded-lg w-[10rem]"}>
                                        <Image src={items.imageUrl} alt={"images"} width={20} height={20} className={"bg-cover object-cover"} />
                                        <h1>{items.name}</h1>
                                    </NavigationMenuLink>
                                    
                                );
                            })
                        }

                        
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    );
}
export default NavigationMenuCategorie;