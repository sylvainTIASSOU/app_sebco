"use client"
import Image from "next/image";

const InfoSlide = () => {
    return (
        <section className={"md:px-20 px-3 bg-orange-400/20 p-5 grid grid-cols-1 md:grid-cols-2 items-center"}>
            <div>
                <h1 className={"text-2xl font-bold md:text-4xl text-blue-600 "}>
                    Nous travaillons exclusivement avec des fournisseurs de confiance pour vous
                    offrir des matériaux de construction de la plus haute qualité.
                </h1>

                <h2>
                    Notre équipe de service client est à votre disposition pour vous aider
                    à chaque étape de votre projet. Que vous ayez des questions sur nos produits,
                    besoin de conseils techniques, ou d'assistance pour passer votre commande,
                    nous sommes là pour vous. Nous nous engageons à répondre à toutes
                    vos demandes dans les plus brefs délais.
                </h2>
            </div>

            <Image src={"/images/materiaux-mysweetimmo.png"} alt={""} height={700} width={700}
                   className={"bg-cover object-cover"}/>
        </section>

    )
}
export default InfoSlide;