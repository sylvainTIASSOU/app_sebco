import OrderComp from "@/app/(admin)/components/OrderComp";


export default function CancelOrder() {
    return(
        <OrderComp status={"CANCEL"} title={"Commandes annuleés"}/>
    )
}