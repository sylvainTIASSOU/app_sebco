"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import Swal from "sweetalert2";
import ExportDialog from "@/app/(admin)/components/ExportDialog";
import {PromotionModel} from "@/models/promotionModule/PromotionModel";
import ContentListHeader from "@/app/(admin)/components/ContentListHeader";
import SearchInput from "@/app/(admin)/components/SearchInput";

export default function Promotion() {
    const route = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        Api.read('/api/promotionArticle').then((cats) => {
            setData(cats);
        })
    }, []);


    const tableConstruction = (data: any[]) => {
        const currentDate = new Date();

        return data.map((items) => {
            const endDate = new Date(items.promotion.endDate);
            const isExpired = endDate < currentDate;

            return (
                <TableRow key={items.id} className={isExpired ? 'bg-red-200' : ''}>
                    <TableCell> {items.product.name} </TableCell>
                    <TableCell> {items.oldPrice} </TableCell>
                    <TableCell>{items.newPrice}</TableCell>
                    <TableCell> {items.promotion.beginDate} </TableCell>
                    <TableCell> {items.promotion.endDate} </TableCell>
                    <TableCell className="text-right ">
                        <div className={" space-x-3 text-right w-auto"}>
                            <Button size={"icon"} onClick={() => {
                                route.push(`/admin/edit-promotion/${items.id}`)
                            }} className={"bg-slate-100 text-black"}>
                                <Pencil/>
                            </Button>
                            <Button
                                size={"icon"}
                                variant={"destructive"}
                                className={""}
                                onClick={async () => {

                                    Swal.fire({
                                        title: "suppression",
                                        text: `Voulez-vous supprimer la promotion de  ${items.product.name} ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Supprimer"
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            const promotionModel = new PromotionModel(items.promotion.beginDate, items.promotion.endDate, String(items.promotion.description), Number(items.promotion.id), false, false);
                                            const resp = await Api.update(`/api/category/${items.id}`, promotionModel);
                                            if (resp.ok) {
                                                setData(data.filter((item) => item.id !== items.id));
                                                setResults(results.filter((item) => item.id !== items.id));
                                                route.refresh();
                                                Swal.fire({
                                                    title: "Suprimé!",
                                                    text: "Votre suppression a été effectuer.",
                                                    icon: "success"
                                                });

                                            }
                                        }
                                    })

                                }}
                            >
                                <Trash2/>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            )
        });
    }


    return (
        <div className={"flex flex-col gap-10 w-full"}>

            <ContentListHeader title={"Promotions"} subtitle={"Gestion du stock"} link={"/admin/add-promotion"}
                               buttonTitle={"Ajouter"} count={data.length}/>
            <div className={""}>
                <SearchInput data={data} query={query} setQuery={setQuery} setResults={setResults} element={"name"}
                             palceholder={"Recherche par nom"}/>
            </div>


            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data}/>
                </div>
                {/*table*/}
                {/*table*/}
                <Table>
                    <TableCaption>Liste des catégories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nom de l'article</TableHead>
                            <TableHead className="">Encient prix</TableHead>
                            <TableHead className="">Nouveau prix</TableHead>
                            <TableHead className="">Date de debut</TableHead>
                            <TableHead className="">Date de fin</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/*table body*/}
                    <TableBody>
                        {
                            query == '' ? tableConstruction(data) : tableConstruction(results)
                        }
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}