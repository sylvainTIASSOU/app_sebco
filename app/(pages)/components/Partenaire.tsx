"use client";
import Image from "next/image";


const partenaireLogo = [

   
    "https://www.africanlease.com/wp-content/uploads/2020/07/LOGO-Holding_800X534px-3-1.png",


    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
    "https://togocom.tg/wp-content/uploads/2020/08/Logo_TMoney_Togocom_New1.png",
];

const Partenaires = () => {
    return (
        <section className="flex bg-blue-200 flex-col gap-10 md:px-20 px-3 py-5 mt-10">
            <h1 className="text-3xl md:text-6xl text-center font-bold">Ils nous font confiance</h1>

            <div className="flex flex-wrap items-center justify-center px-[3rem] w-full">
                {
                    partenaireLogo.map((items, index) => {
                        return (
                            <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 flex justify-center">
                                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300">
                                    <Image src={items} quality={100} alt="logo" width={150} height={150} className="object-cover" />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Partenaires;