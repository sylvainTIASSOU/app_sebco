"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

type BannerProps = {
    open?: boolean;
    setOpen?: any;
}

const DeliveryOnfo = ({ open , setOpen }: BannerProps) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full md:w-full">
                <DialogHeader>
                    <DialogTitle className="shake">
                    </DialogTitle>

                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">

                    <div className="w-full flex flex-col gap-5">
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-600">Livraison et retour de produit</h1>

                        <h1 className="text-textColor/50 ">
                        <h1 className="font-bold text-lg">A  Lomé</h1>
                            Nos délais de livraison sont généralement inférieur a 24 heures. <br /> <br />
                            La livraison gratuites ne s'applique pas a tous les produits. Pour en savoir plus n'hésitez pas à nous contacter. <br /> <br />
                            Nous acceptons le retour de produits s'ils n'ont pas été détériorés. <br /> <br />

                            <h1 className="font-bold text-lg">Partout au TOGO </h1> 
                            Nous livrons partout au TOGO. Les frais de livraisons dépendent de la localités et des articles.
                        </h1>

                    </div>


                    <div className="w-full bg-textColor">
                        <Image src={"/images/sammy-man-and-dog-delivering-packages-on-a-moped.gif"} alt="logo" width={430} height={430} priority className="text-buttonColor1 object-cover" />
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )

}

export default DeliveryOnfo
