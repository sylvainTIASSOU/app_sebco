"use client"

import {Button} from "antd";
import { useRouter } from "next/navigation";

const Info2Slide = () => {
    const router = useRouter();
    return(
    <section
        className={"w-full min-h-screen bg-[url(/images/pexels-pixabay-159306-scaled.jpg)] py-10 md:py-2  bg-center bg-cover object-cover bg-no-repeat bg-fixed flex flex-col gap-10 justify-center content-center"}>
        <h1 className={"text-center text-2xl md:text-6xl font-bold text-white bg-gray-800/50  self-center mx-2 md:mx-10"}>
            Nous nous engageons à fournir des matériaux de construction de la
            plus haute qualité pour garantir la solidité et
            la durabilité de vos projets finis, assurant ainsi
            des constructions robustes et pérennes.
        </h1>
        <Button onClick={() => router.push('/devis')} className={"bg-orange-400 text-white w-[150px] self-center font-bold"}>
            Demander un devis
        </Button>
    </section>
    );
}
export default Info2Slide;