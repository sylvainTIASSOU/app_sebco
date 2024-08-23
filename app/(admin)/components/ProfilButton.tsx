"use client";
import React from 'react';
import {User, LogOut} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "@/redux/features/auth-slice";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {RootState} from "@/redux/store";

const ProfilButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const uid = useSelector((state: RootState) => state.auth.value.uid);
    const isAuth = useSelector((state: RootState) => state. auth.value.isAuth);
    const name = useSelector((state: RootState) => state. auth.value.name);
    return (
        <Popover>
            <PopoverTrigger
                className="inline-flex gap-2 border p-1 px-2 rounded-xl bg-slate-200  items-center ">
                <div className="flex items-center justify-center p-1  rounded-full bg-white">
                    <User/>
                </div>

                {name}
            </PopoverTrigger>
            <PopoverContent className={"flex w-[10rem] flex-col gap-3 items-center"}>
                <Button
                    size="sm"
                    className={"w-full"}
                    onClick={() => {
                        router.push('/admin/profil')
                    }}
                >
                    <User/>
                    Profile
                </Button>

                <Button
                    size="sm"
                    variant={"destructive"}
                    className={"w-full"}
                    onClick={() => {
                        dispatch(logOut());
                        router.push('/')
                    }}
                >
                    <LogOut/>
                    Se deconnecter
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default ProfilButton;