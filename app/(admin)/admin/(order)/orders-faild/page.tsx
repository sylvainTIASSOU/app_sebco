import OrderComp from "@/app/(admin)/components/OrderComp";


export default function FaildOrders() {
    return(
        <OrderComp status={"FAILD"} title={"Commandes Echoiées"}/>
    )
}