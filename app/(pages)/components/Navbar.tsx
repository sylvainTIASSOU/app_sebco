"use client";
import Image from 'next/image';
import Link from 'next/link'
import {AlignJustify, Bell, ShoppingCart, User} from "lucide-react";
import {Input, Badge} from "antd";
import ProfilButton from "@/app/(pages)/components/ProfilBtn";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import Notifications from "@/app/(pages)/components/Notification";
import Menu from "@/app/(pages)/components/Menu";
import {usePathname} from "next/navigation";
import SeachComp from "@/app/(pages)/components/SeachComp";
const Navbar = () => {
    const pathname = usePathname();
    const { Search } = Input;
    const isAuth = useSelector((state: RootState) => state. auth.value.isAuth);
    const item = useSelector((state: RootState) => state.cart.items)

    return(
        <div className={" px-2 flex  flex-col gap-1 py-2 bg-white/80 w-full right-0 left-0 fixed top-0 "}>
            {/**/}
            <div className={"flex justify-between content-between items-center "}>
                <div className={"flex gap-20"}>
                    <Link href={'/'} className={""} >
                        <Image src={"/logo.svg"} priority={true} quality={100} alt={"logo"} width={80} height={100}/>
                    </Link>

                    <div className={"hidden md:flex"}>
                        <SeachComp/>
                    </div>
                </div>


                <div className={"flex gap-5"}>

                    <Notifications/>

                    <Link href={"/cart"}>
                        <Badge size="small" count={item.length}>
                            <ShoppingCart/>
                        </Badge>
                    </Link>


                    {
                        isAuth ? <ProfilButton/> : <Link href={"/login"} className={"bg-white md:px-4 text-center text-sm px-2  rounded-xl"} > <h1>Se connecter</h1> </Link>
                    }

                </div>
            </div>


            {/**/}
            <div className={"flex justify-between content-between items-center"}>
               <div className={"inline-flex items-center gap-3"}>
                   <Menu/>
                   <Link href={"/"} className={pathname == "/" ? "text-blue-600 font-bold text-sm md:text-lg": " text-sm md:text-lg"}>
                       Accueil
                   </Link>

               </div>

                <div className={"inline-flex gap-3 text-sm md:text-md"}>
                    <Link href={"/categories"} className={pathname == "/categories" ? "text-blue-600 font-bold": ""}>Nos categries</Link>
                    <Link href={"/about"} className={pathname == "/about" ? "text-blue-600 font-bold": ""}>A propos</Link>
                    <Link href={"/history"} className={pathname == "/history" ? "text-blue-600 font-bold hidden md:flex": "hidden md:flex"}>Historique</Link>
                </div>

            </div>
        </div>
    );
}

export default  Navbar;