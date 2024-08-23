"use client"

import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import React, {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import OrderGoingTable from "@/app/(pages)/components/OrderGoingTable";

export default  function History () {
    const uid = useSelector((state: RootState) => state.auth.value.uid);
    const [ordersDelivered, setOrdersDelivered] = useState<any[]>([]);

    useEffect(() => {
        Api.read(`/api/order/getOrderByUserStatus/${uid}/DELIVRED`).then((values: any[]) => {
            setOrdersDelivered(values)
        });
    }, []);
    return(
        <div className={"flex flex-col space-y-10 px-3 mx-3 md:mx-20 mt-20 md:mt-28"}>
            <h1 className={"font-medium text-[25px] mb-5 text-cyan-600"}>Historique des commendes.</h1>
            <OrderGoingTable data={ordersDelivered}/>
        </div>
    )
}