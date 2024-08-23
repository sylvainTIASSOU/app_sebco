"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CharacteristicModel} from "@/models/stockModule/CharacteristicModel";
import {Api} from "@/app/api/Api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ExportDialog from "@/app/(admin)/components/ExportDialog";
import ContentListHeader from "@/app/(admin)/components/ContentListHeader";
import SearchInput from "@/app/(admin)/components/SearchInput";
import {UserModel} from "@/models/usersModule/UserModel";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import Swal from "sweetalert2";

export default function Characteristic() {
    const route = useRouter();
    const [data, setData] = useState<CharacteristicModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CharacteristicModel[]>([]);

    useEffect(() => {

        Api.read(`/api/characteristic`).then((val) => {
            setData(val);
        })
    }, []);

    const tableConstruction = (data: CharacteristicModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.name} </TableCell>
                <TableCell>{items.value}</TableCell>
                {/*actions*/}
                <TableCell className="text-right ">
                    <div className={" space-x-3 text-right w-auto"}>
                        <Button size={"icon"} onClick={() => {route.push(`/admin/edit-characteristic/${items.id}`)}} className={"bg-slate-100 text-black"}>
                            <Pencil/>
                        </Button>
                        <Button
                            size={"icon"}
                            variant={"destructive"}
                            className={""}
                            onClick={async () => {

                                Swal.fire({
                                    title: "suppression",
                                    text: `Voulez-vous supprimer  ${items.name} ?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Supprimer"
                                }).then(async (result) => {
                                    if(result.isConfirmed) {
                                        const characteristicModel = new CharacteristicModel(items.name, items.value, Number(items.id), false, false)
                                        const resp = await Api.update(`/api/characteristic/${items.id}`, characteristicModel);
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
            <ContentListHeader title={"Caracteristiques"} subtitle={"Gestion du stock"} link={"/admin/add-characteristic"} buttonTitle={"Ajouter"} count={data.length} />
            <div className={""}>
                <SearchInput  data={data} query={query} setQuery={setQuery} setResults={setResults} element={"name"} palceholder={"Recherche par nom"} />
            </div>

            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data}/>
                </div>
                {/*table*/}
                <Table>
                    <TableCaption>Liste des Clients.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nom du caracteristique</TableHead>
                            <TableHead>valeur</TableHead>
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