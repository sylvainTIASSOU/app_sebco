import Image from "next/image";
import React from "react";

const EmptyData = () => {
    return (
        <div className={"flex flex-col self-center items-center justify-center"}>
            <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                   alt={"data empty"}
                   priority
                   width={400}
                   height={400}
                   className={" self-center  object-cover bg-center bg-cover"}
            />

            <h1 className={"text-center font-regular text-red-600 text-2xl"}>Vide!!</h1>
        </div>
    );
}

export default EmptyData;