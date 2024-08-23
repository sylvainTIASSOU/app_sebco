"use client";
import { Button } from "@/components/ui/button";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FolderDown } from "lucide-react";
import Image from "next/image";
import { ExportCSVButton, ExportExcelButton } from "./ExportData";

interface Props {
    data: any[],
}

const ExportDialog = ({ data,
                      }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant="outline" className="flex space-x-2">
                    <h1>Télecharger la liste</h1>
                    <FolderDown />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Exporté les donnés en </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>

                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4">

                        <ExportExcelButton data={data}/>

                        <ExportCSVButton data={data}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default ExportDialog;