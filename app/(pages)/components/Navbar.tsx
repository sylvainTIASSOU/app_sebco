"use client";
import Image from 'next/image';
import Link from 'next/link'
import { AlignJustify, Bell, Facebook, Instagram, ShoppingCart, User } from "lucide-react";
import { Input, Badge } from "antd";
import ProfilButton from "@/app/(pages)/components/ProfilBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Notifications from "@/app/(pages)/components/Notification";
import Menu from "@/app/(pages)/components/Menu";
import { usePathname } from "next/navigation";
import SeachComp from "@/app/(pages)/components/SeachComp";
import { FaFacebookF, FaSquareInstagram, FaTiktok, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import NavigationMenuServices from './NavigationMenuServices';
import NavigationMenuCategorie from './NavigationMenuCategories';
const Navbar = () => {
    const pathname = usePathname();
    const { Search } = Input;
    const isAuth = useSelector((state: RootState) => state.auth.value.isAuth);
    const item = useSelector((state: RootState) => state.cart.items)

    return (
        <div className='right-0 left-0 fixed top-0 '>
            <div className=' bg-gray-200  p-2 flex items-center content-between justify-between'>
                <h1 className='text-sm md:text-md font-bold '>Applez nous au +228 70 51 60 60 / +228 98 41 14 14</h1>

                <div className="flex gap-5">
                    <Link href={'#'} className='size=[30px] p-1 rounded-full bg-blue-500 '> <FaFacebookF className='size-[20px] text-white' /> </Link>
                    <Link href={'#'} className='size=[30px] p-1 rounded-full bg-red-500 '> <FaSquareInstagram className='size-[20px] text-white' /> </Link>
                    <Link href={'#'} className='size=[30px] p-1 rounded-full bg-black '> <FaTiktok className='size-[20px] text-white' /> </Link>
                    <Link href={'#'} className='size=[30px] p-1 rounded-full bg-white '> <FaXTwitter className='size-[20px]' /> </Link>
                    <Link href={'#'} className='size=[30px] p-1 rounded-xl bg-blue-600 '> <FaLinkedinIn className='size-[20px] text-white' /> </Link>
                </div>
            </div>
            <div className={" px-2 flex  flex-col gap-1 py-2 bg-white/95 w-full  "}>
                {/**/}
                <div className={"flex justify-between content-between items-center "}>
                    <div className={"flex gap-20"}>
                        <Link href={'/'} className={"items-center flex flex-col"} >
                            <Image src={"/logo.svg"} priority={true} quality={100} alt={"logo"} width={80} height={90} />
                            <h1 className='text-[9px] font-bold'>
                                Premiere Quincaillerie en ligne au Togo
                            </h1>
                        </Link>

                        <div className={"hidden md:flex"}>
                            <SeachComp />
                        </div>
                    </div>


                    <div className={"flex gap-5"}>

                        <Notifications />

                        <Link href={"/cart"}>
                            <Badge size="small" count={item.length}>
                                <ShoppingCart />
                            </Badge>
                        </Link>


                        {
                            isAuth ? <ProfilButton /> : <Link href={"/login"} className={"bg-white md:px-4 text-center text-sm px-2 pt-1  rounded-xl"} > <h1>Se connecter</h1> </Link>
                        }

                    </div>
                </div>


                {/**/}
                <div className={"flex justify-between content-between items-center"}>
                    <div className={"inline-flex items-center gap-3"}>
                        <Menu />
                        <Link href={"/"} className={pathname == "/" ? "text-blue-600 font-bold text-sm md:text-lg" : " text-sm md:text-lg hover:text-blue-600"}>
                            Accueil
                        </Link>

                        <NavigationMenuServices />

                    </div>

                    <div className={"inline-flex gap-3 text-sm md:text-md"}>
                        <NavigationMenuCategorie />
                        {
                            /**                    <Link href={"/categories"} className={pathname == "/categories" ? "text-blue-600 font-bold": " hover:text-blue-600"}>Nos categries</Link>
     */
                        }
                        <Link href={"/about"} className={pathname == "/about" ? "text-blue-600 font-bold" : ""}>A propos</Link>
                        <Link href={"/contact"} className={pathname == "/contact" ? "text-blue-600 font-bold " : " hover:text-blue-600"}>Contact</Link>
                        <Link href={"/history"} className={pathname == "/history" ? "text-blue-600 font-bold hidden md:flex" : "hidden md:flex hover:text-blue-600"}>Historique</Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Navbar;