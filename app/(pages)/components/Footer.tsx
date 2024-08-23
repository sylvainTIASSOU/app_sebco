'use client'
import Image from "next/image"
import {Mail} from "lucide-react";
import React, {LegacyRef, useRef} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import emailjs from '@emailjs/browser';
import {useToast} from "@/components/ui/use-toast"
import {ToastAction} from "@/components/ui/toast";

const Footer = () => {
    const form = useRef<HTMLFormElement>();
    const {toast} = useToast()

    //fonction to send email
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm(String(process.env.EMAISERVICEID), String(process.env.EMAILTEMPLETEID), form.current!, String(process.env.EMAILPUBLICKEY))
            .then((result) => {
                toast({
                    description: "Email envoyer avec succès",
                })
            }, () => {
                toast({
                    variant: 'destructive',
                    description: "Un problème est survenu lors de l'envoi de l'email",
                    action: <ToastAction altText="Try again">Reéssayer!!</ToastAction>,
                })
            });
    };
    return (
        <div className={"bg-white p-10 mt-5  flex flex-col gap-5"}>
            <div
                className="flex lg:flex-row flex-col lg:justify-center gap-16 items-center text-center text-gray-400 text-sm md:px-[100px] px-4">

                <div className={""}>
                    <Image src={'/images/Construction worker-bro 1.svg'} height={350} width={350} className={''}
                           alt={'foot img'}/>
                </div>

                <div className="flex flex-col gap-5 w-full lg:w-auto  text-center text-gray-400 text-sm">
                    <h1 className={"text-center font-medium text-2xl"}>Nous contacter</h1>
                    <form className={'flex flex-col w-full  space-y-3 md:flex-row md:space-x-5'}
                          ref={form as LegacyRef<HTMLFormElement>} onSubmit={sendEmail}>
                        <div className={'  flex flex-col gap-3 w-full '}>
                            <div className={'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                                <Input type={'text'} placeholder={'Name'} name={'from_name'} required
                                       className={'bg-white w-full'}/>
                                <Input type={'email'} placeholder={'Email'} name={'from_email'} required
                                       className={'bg-white w-full'}/>
                            </div>
                            <Input className={" w-full border rounded-sm h-[90px]"} placeholder={'Votre message'}
                            />

                            <Button type={'submit'} variant={'default'} size={'lg'}
                                    className={'bg-slate-100 text-black w-full font-bold'}
                            >
                                Envoyer
                            </Button>
                        </div>

                    </form>
                </div>

            </div>


            <div
                className="flex flex-col md:flex-row gap-5 md:justify-between md:content-between items-center text-center text-gray-400 text-sm md:px-[100px] px-4">
                <h1><span className="text-textColor">&copy; 2024 SeBcO Togo.</span> Tous droits réservés.</h1>

                <div className="flex flex-col md:flex-row  md:space-x-3 items-center">
                    <a href="mailto:sebcotogo@gmail.com" target="_blank"
                       className="underline inline-flex gap-2 text-sm  items-center">
                        <Mail/>
                        sebcotogo@gmail.com
                    </a>
                    <Image src={"/logo.svg"} alt="logo" width={100} height={100} className=" object-cover "/>
                </div>

            </div>
        </div>
    );
}

export default Footer;