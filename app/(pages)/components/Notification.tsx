import React, { useState } from 'react';
import {Badge, Drawer} from 'antd';
import Image from "next/image"
import {Bell} from "lucide-react";

const Notifications = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Badge dot={show} >
                <Bell onClick={showDrawer}/>
            </Badge>
            <Drawer title="Notifications" onClose={onClose} open={open}>
                <h1 className={"font-bold text-2xl"}>Notifications</h1>

                <div className={"flex self-center flex-col space-y-5 items-center justify-center"}>
                    <Image src={"/images/cloche.gif"}
                           alt={""}
                           width={150}
                           height={150}
                           className={"bg-cover bg-center"}/>

                    <h1 className={"text-red-600 font-bold text-md"}>Pas de Notification!</h1>
                </div>
            </Drawer>
        </>
    );
};

export default Notifications;