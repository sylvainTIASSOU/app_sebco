"use client"
import Image from "next/image";


interface CartInter {
    image: string,
    title: string,
    subtitle: string,
    price: string,
    color: string,
}
const CardDash = ({
                       image,
                       title,
                       subtitle,
                       price,
                       color,
                   }: CartInter) => {

    return (
        <div
            className={"w-full flex flex-col gap-5 p-5 h-[150px] bg-slate-100 shadow-sm rounded-md"}>
            <div className={"flex w-full items-center justify-between content-between  "}>
                <div>
                    <h1 className={"font-black"}>{title}</h1>
                    <h1 className={"font-light text-[12px]"}>(les 30 derniers jours)</h1>
                </div>

                <Image src={image}
                       alt={"img"}
                       width={30}
                       height={30}
                       className={"bg-cover bg-center object-cover "}
                />
            </div>

            <div>
                <h1 className={"font-bold text-[20px]"}>{price}</h1>
                <div className={"flex gap-5 items-center"}>
                    <h1 className={"font-light text-[12px]"}><span className={color}>{subtitle}</span> (les 30 jours)
                    </h1>
                    <h1 className={"text-blue-600 font-bold"}>A jours</h1>
                </div>

            </div>


        </div>
    );
}
export default CardDash;