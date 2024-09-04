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


const NavigationMenuServices = () => {
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:text-blue-600">Services</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 p-8 w-[14rem]">
                    

                        <NavigationMenuLink>
                            <Link href={"/contact"} className={pathname == "/contact" ? "text-blue-600 font-bold": "hover:text-blue-600"}>Demande de devis</Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink>
                            <Link href={"/contact"} className={pathname == "/contact" ? "text-blue-600 font-bold": "hover:text-blue-600"}>Vente ou Achat de terrains</Link>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    );
}
export default NavigationMenuServices;