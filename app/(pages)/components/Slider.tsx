"use client"
import {motion} from "framer-motion";
import ImageSlide from "./ImageSlide";
import SeachComp from "@/app/(pages)/components/SeachComp";


const images = [
    "/images/pexels-pixabay-159306-scaled.jpg",
    "/images/materiau.jpg",
    "/images/bgImg.png",
    "/images/casque.jpg",
    "/images/istockphoto-474198470-612x612.jpg",
    "/images/pexels-photo-1249610-1.jpeg",
    "/images/pexels-rezwan-1145434.jpg",
    "/images/pexels-yuraforrat-10161111.jpg",
]
const Slider = () => {

    return (

        <ImageSlide images={images} className={"h-[40rem] mt-0  top-0 "}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center"
            >
                <motion.p
                    className="font-bold text-2xl mx-4 md:mx-[10rem] md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
                    Découvrez notre site de matériaux de construction
                    offrant une variété exceptionnelle de sable et de gravier.
                    Profitez de produits de qualité et d'un service fiable pour réaliser vos projets.
                </motion.p>


                <SeachComp/>
            </motion.div>
        </ImageSlide>

    )

}
export default Slider;