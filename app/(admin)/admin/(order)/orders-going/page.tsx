import OrderComp from "@/app/(admin)/components/OrderComp";


export default function  GoingOrder() {
    return(
        <OrderComp status={"GOING"} title={"Commandes en cours"}/>
    )
}