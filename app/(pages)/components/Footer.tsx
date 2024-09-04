'use client'
import Image from "next/image"
import { Mail } from "lucide-react";
import React  from 'react';


const products = [
    "Toiture Type Hollandaise (Tôles ghanéennes)",
    "Fers Normalisés CIM METAL",
    "Promotions"
];

const societe = [
    "Livraison",
    "A propos de nous",
    "Modalités de règlement",
    "Contactez-nous",
    "sitemap",
    "Magasins"
];

const compte = [
    "Suivi de commande",
    "Connexion",
    "Créez votre compte"
];

const info = [
    "Quincaillerie ",
    "Aképé",
    "Lomé",
    "ToGO",
    "Appelez-nous : +228 70 51 60 60 ",
    "Envoyez-nous un e-mail : sebcotogo@gmail.com"
];

const Footer = () => {
    
    return (
        <div className={"bg-white p-10 mt-5  flex flex-col gap-5"}>

            <div className="grid grid-cols-2 md:grid-cols-4  gap-4 md:px-[100px] px-4">

                {/** product */}
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-lg">Products</h1>
                    {
                        products.map((items, index) => {
                            return(
                                <h1 key={index} className="text-sm md:text-lg text-gray-400"> {items} </h1>
                            )
                        })
                    }
                </div>

                {/*societe*/}
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-lg">Notre société</h1>
                    {
                        societe.map((items, index) => {
                            return(
                                <h1 key={index} className="text-sm md:text-lg text-gray-400"> {items} </h1>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-lg">Votre compte</h1>
                    {
                        compte.map((items, index) => {
                            return(
                                <h1 key={index} className="text-sm md:text-lg text-gray-400"> {items} </h1>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-lg">Informations</h1>
                    {
                        info.map((items, index) => {
                            return(
                                <h1 key={index} className="text-md text-gray-400"> {items} </h1>
                            )
                        })
                    }
                </div>

            </div>

            {/** 
             * 
              <div
                className="flex lg:flex-row flex-col lg:justify-center gap-16 items-center text-center text-gray-800 text-sm md:px-[100px] px-4">

                <div className={""}>
                    <Image src={'/images/Construction worker-bro 1.svg'} height={350} width={350} className={''}
                        alt={'foot img'} />
                </div>

                

            </div>
             */}
           


            <div
                className="flex flex-col md:flex-row gap-5 md:justify-between md:content-between items-center text-center text-gray-800 text-sm md:px-[100px] px-4">
                <h1><span className="text-textColor">&copy; 2024 SeBcO Togo.</span> Tous droits réservés.</h1>

                <div className="flex flex-col md:flex-row  md:space-x-3 items-center">



                    <a href="mailto:sebcotogo@gmail.com" target="_blank"
                        className="underline inline-flex gap-2 text-sm  items-center">
                        <Mail className="siez-md" />
                        sebcotogo@gmail.com
                    </a>
                    <Image src={"/logo.svg"} alt="logo" width={100} height={100} className=" object-cover " />
                </div>

            </div>
        </div>
    );
}

export default Footer;