"use client"

import ContentListHeader from "@/app/(admin)/components/ContentListHeader";
import SearchInput from "@/app/(admin)/components/SearchInput";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {UserModel} from "@/models/usersModule/UserModel";
import {ProductModel} from "@/models/stockModule/ProductModel";
import ExportDialog from "@/app/(admin)/components/ExportDialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Api} from "@/app/api/Api";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import Swal from "sweetalert2";

export default function Product() {
    const route = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        Api.read('/api/stockArticle').then((article) => {
            setData(article);
        })
    }, []);

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id} className={Number(items.quantity) <= 60 ? 'bg-red-400 text-white': ''}>
                <TableCell> {items.product.name} </TableCell>
                <TableCell className="font-medium">{items.product.productCategories.name} </TableCell>
                <TableCell> {items.product.price} </TableCell>
                <TableCell> {items.quantity} </TableCell>
                <TableCell> {items.stockPrice} </TableCell>
                <TableCell> {items.stock.provider.name} </TableCell>
                {/*actions*/}
                <TableCell className="text-right ">
                    <div className={" space-x-3 text-right w-auto"}>
                        <Button size={"icon"} onClick={() => {route.push(`/admin/edit-product/${items.id}`)}} className={"bg-slate-100 text-black"}>
                            <Pencil/>
                        </Button>
                        <Button
                            size={"icon"}
                            variant={"destructive"}
                            className={""}
                            onClick={async () => {

                                Swal.fire({
                                    title: "suppression",
                                    text: `Voulez-vous supprimer  ${items.product.name} ?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Supprimer"
                                }).then(async (result) => {
                                    if(result.isConfirmed) {
                                        const productModel = new ProductModel(items.product.name, +items.product.price, items.product.imageUrl, Number(items.product.categoryId), String(items.product.description), Number(items.product.tax), Number(items.product.id), false, false);
                                        const resp = await Api.update(`/api/article/${items.id}`, productModel);
                                        if(resp.ok) {
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
        ))

    }
    return(
        <div className={"flex flex-col gap-10 w-full"}>
            <ContentListHeader title={"Les articles"} subtitle={"Gestion des stock"} link={"/admin/add-product"}
                               buttonTitle={"Ajouter"} count={data.length}/>
            <div className={""}>
                <SearchInput data={data} query={query} setQuery={setQuery} setResults={setResults} element={"product.name"}
                             palceholder={"Recherche par nom"}/>
            </div>

            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data}/>
                </div>
                {/*table*/}
                <Table>
                    <TableCaption>Liste des article.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nom de l'article</TableHead>
                            <TableHead>Categorie d'article</TableHead>
                            <TableHead>prix unitaire</TableHead>
                            <TableHead>Quantité en stock</TableHead>
                            <TableHead>Prix du stock</TableHead>
                            <TableHead>Fournisseur</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            query == '' ? tableConstruction(data) : tableConstruction(results)
                        }
                    </TableBody>
                    <TableFooter>

                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}