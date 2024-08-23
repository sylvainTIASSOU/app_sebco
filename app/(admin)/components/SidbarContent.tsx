"use client";
import Image from 'next/image';
import {usePathname} from "next/navigation";
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {UserPlus, SquareDashedKanban, Store, BaggageClaim} from "lucide-react";

const SidbarContent = () => {
    const pathname = usePathname();
    return (
        <div className={"flex flex-col  justify-center gap-5"}>

            <Image src="/logo.svg" quality={100} priority alt="logo" width={150} height={150}
                   className="object-cover self-center"/>

            <div className={"flex flex-col  justify-center gap-5"}>
                <Link href={"/admin"}
                      className={pathname == "/admin" ? "font-bold text-blue-600 inline-flex gap-3" : ` inline-flex gap-3 hover:font-bold hover:text-blue-400`}>
                    <SquareDashedKanban/> Dashboard
                </Link>

                {/* users*/}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={" "}>
                            <div
                                className={pathname == "/admin/employes" || pathname == "/admin/customers" || pathname == "/admin/providers" || pathname == "/admin/delivers" ? "font-bold text-blue-600 inline-flex gap-3 items-center" : " inline-flex gap-3 items-center "}>
                                <UserPlus/>
                                Utilisateurs
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className={"flex flex-col gap-3"}>
                            <Link href={"/admin/employes"} className={pathname == "/admin/employes"? "font-bold text-blue-600" : ""}>Employées</Link>
                            <Link href={"/admin/customers"} className={pathname == "/admin/customers"? "font-bold text-blue-600" : ""}>Clients</Link>
                            <Link href={"/admin/providers"} className={pathname == "/admin/providers"? "font-bold text-blue-600" : ""}>Fournisseurs</Link>
                            <Link href={"/admin/providers"} className={pathname == "/admin/providers"? "font-bold text-blue-600" : ""}>Livreurs</Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>


                {/* stock*/}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={" "}>
                            <div
                                className={pathname == "/admin/stock" || pathname == "/admin/characteristics" || pathname == "/admin/promotion" || pathname == "/admin/products" || pathname == "/admin/delivers" ? "font-bold text-blue-600 inline-flex gap-3 items-center" : " inline-flex gap-3 items-center "}>
                                <Store/>
                                Stock
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className={"flex flex-col gap-3"}>
                            <Link href={"/admin/stock"} className={pathname == "/admin/stock"? "font-bold text-blue-600" : ""}>Stock</Link>
                            <Link href={"/admin/characteristics"} className={pathname == "/admin/characteristics"? "font-bold text-blue-600" : ""}>Caracteristique</Link>
                            <Link href={"/admin/categories"} className={pathname == "/admin/categories"? "font-bold text-blue-600" : ""}>Categorie</Link>
                            <Link href={"/admin/products"} className={pathname == "/admin/products"? "font-bold text-blue-600" : ""}>Articles</Link>
                            <Link href={"/admin/promotion"} className={pathname == "/admin/promotion"? "font-bold text-blue-600" : ""}>Promotion</Link>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* order*/}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={" "}>
                            <div
                                className={pathname == "/admin/orders" || pathname == "/admin/new-orders" || pathname == "/admin//orders-going" || pathname == "/admin/orders-done" || pathname == "/admin/orders-faild" ? "font-bold text-blue-600 inline-flex gap-3 items-center" : " inline-flex gap-3 items-center "}>
                                <BaggageClaim/>
                                Commande
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className={"flex flex-col gap-3"}>
                            <Link href={"/admin/orders"} className={pathname == "/admin/orders"? "font-bold text-blue-600" : ""}>Commandes</Link>
                            <Link href={"/admin/new-orders"} className={pathname == "/admin/new-orders"? "font-bold text-blue-600" : ""}>Nouvelles Commandes</Link>
                            <Link href={"/admin/orders-going"} className={pathname == "/admin/orders-going"? "font-bold text-blue-600" : ""}>Commande En Cours</Link>
                            <Link href={"/admin/orders-done"} className={pathname == "/admin/orders-done"? "font-bold text-blue-600" : ""}>Commandes Effectuées</Link>
                            <Link href={"/admin/orders-faild"} className={pathname == "/admin/orders-faild"? "font-bold text-blue-600" : ""}>Commandes echoué</Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>


            </div>
        </div>
    )
}
// @ts-ignore
// @ts-ignore
export default SidbarContent;