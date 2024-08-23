"use client"
import React, {useEffect, useState} from 'react'
import {Api} from "@/app/api/Api";
import CardDash from "@/app/(admin)/components/CardDash";
import OrderComp from "@/app/(admin)/components/OrderComp";

export default function DashboardPage() {

    const [customers, setCustomers] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [delivered, setDelivered] = useState<any[]>([])

    useEffect(() => {
        Api.read("/api/user/getUserByRole/CUSTOMER").then((values) => {
            setCustomers(values);
        });
        Api.read("/api/order").then((items: any[]) => {

            setOrders(items)
            const newOrder: any[] = [];
            items.forEach((el: any) => {
                if(el.status =="deliver") {
                    newOrder.push(el);
                }
            })
            const newPrice: number[] = [];
            items.forEach((ele: any) => {
                newPrice.push(Number(ele.totalPrice));
            })
            setDelivered(newOrder);
            setTotalPrice(newPrice.reduce((somme, element) => somme + element, 0));
        })

    }, []);


  return (

      <main className={"flex flex-col gap-10"}>
          <h1 className={"text-[30px] font-black"}>Tableau de bord</h1>
          <section className={"grid grid-clos-1 md:grid-cols-3 gap-5"}>
              <CardDash color={""} image={"/images/revenu.png"} price={`${totalPrice}  cfa`}
                        subtitle={"revenue up"} title={"Revenue total"}/>

              {/*card 2*/}
              <CardDash color={""} image={"/images/telephone-intelligent.png"} price={`${orders.length}`}
                        subtitle={"commande up"} title={"commandes total"}/>

              {/*card 3*/}
              <CardDash color={""} image={"/images/avis-client.png"} price={`${customers.length}`}
                        subtitle={"client up"} title={"client total"}/>

              {/* card 4*/}
              <CardDash color={""} image={"/images/livreur.png"} price={`${delivered.length} `}
                        subtitle={"Livraison up"} title={"total Livrés"}/>
          </section>

          <section className={"flex flex-col space-y-5"}>
              <OrderComp status={"NEW"} title={"Nouvelles commandes"}/>
          </section>


      </main>
  )
}
