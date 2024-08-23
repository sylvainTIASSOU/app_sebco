"use client";
import ContentListHeader from "@/app/(admin)/components/ContentListHeader";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SearchInput from "@/app/(admin)/components/SearchInput";
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
import {UserModel} from "@/models/usersModule/UserModel";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import Swal from "sweetalert2";
import ExportDialog from "@/app/(admin)/components/ExportDialog";

export default  function Employes() {
    const route = useRouter();
    const [data, setData] = useState<UserModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<UserModel[]>([]);

    useEffect(() => {

        Api.read('/api/user').then((val) => {
            setData(val);
        })
    }, []);

    const tableConstruction = (data: UserModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.lastName} {items.firstName}</TableCell>
                <TableCell>{items.phone}</TableCell>
                <TableCell>{items.email}</TableCell>
                <TableCell className={items.role == "ADMIN" ? "bg-red-400" : "bg-lime-300"}>{items.role}</TableCell>
                {/*actions*/}
                <TableCell className="text-right ">
                    <div className={" space-x-3 text-right w-auto"}>
                        <Button size={"icon"} onClick={() => {route.push(`/admin/edit-employe/${items.id}`)}} className={"bg-slate-100 text-black"}>
                            <Pencil/>
                        </Button>
                        <Button
                            size={"icon"}
                            variant={"destructive"}
                            className={""}
                            onClick={async () => {

                                Swal.fire({
                                    title: "suppression",
                                    text: `Voulez-vous supprimer l'employé ${items.lastName} ?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Supprimer"
                                }).then(async (result) => {
                                    if(result.isConfirmed) {
                                        const userModel = new UserModel(+items.phone, items.password, items.email, items.firstName, items.lastName, items.role, Number(items.id), false, false);
                                        const resp = await Api.update(`/api/user/${items.id}`, userModel);
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


    return (
        <div className={"flex flex-col gap-10 w-full"}>
            <ContentListHeader title={"Employés"} subtitle={"Gestion des employé"} link={"/admin/add-employe"} buttonTitle={"Ajouter"} count={data.length} />
            <div className={""}>
                <SearchInput  data={data} query={query} setQuery={setQuery} setResults={setResults} element={"lastName"} palceholder={"Recherche par nom"} />
            </div>

            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data}/>
                </div>
                {/*table*/}
                <Table>
                    <TableCaption>Liste des Employes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nom Prenom</TableHead>
                            <TableHead>Numéro</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rôle</TableHead>
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
    )
}