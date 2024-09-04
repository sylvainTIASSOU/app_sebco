"use client"
import { Mail, MapPin, Phone } from "lucide-react";
import React, { LegacyRef, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
    const form = useRef<HTMLFormElement>();
    const { toast } = useToast()

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
    <div className='mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'>

        {/** info */}
        <div className="flex flex-col gap-2 bg-gray-300 p-3">
        <h1 className={" font-medium text-2xl"}>Informations</h1>
            <div className="flex gap-4">
                <MapPin/>
                <div className="flex flex-col gap-1">
                    <h1>Aképé,</h1>
                    <h1>Lomé, Togo.</h1>
                </div>

            </div>

            <Separator/>

            <div className="flex gap-4">
                <Phone/>
                <div className="flex flex-col gap-1">
                    <h1>Appélez-Nous:</h1>
                    <h1>+228 70 51 60 60 / +228 98 41 14 14</h1>
                   
                </div>

            </div>

            <Separator/>

            <div className="flex gap-4">
                <Mail/>
                <div className="flex flex-col gap-1">
                    <h1>Envoyer nous un e-mail:</h1>
                    <h1>sebcotogo@gmail.com</h1>
                </div>

            </div>


        </div>

        {/*** form */}
        <div>
        <div className="flex flex-col gap-5 w-full lg:w-auto  text-center text-gray-800 text-sm">
                    <h1 className={"text-center font-medium text-2xl"}>Contactez-Nous</h1>
                    <form className={'flex flex-col w-full  space-y-3 md:flex-row md:space-x-5'}
                        ref={form as LegacyRef<HTMLFormElement>} onSubmit={sendEmail}>
                        <div className={'  flex flex-col gap-3 w-full '}>
                            <div className={'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                                <Input type={'text'} placeholder={'Name'} name={'from_name'} required
                                    className={'bg-white w-full'} />
                                <Input type={'email'} placeholder={'Email'} name={'from_email'} required
                                    className={'bg-white w-full'} />
                            </div>
                            <Input className={" w-full bg-white border rounded-sm h-[90px]"} placeholder={'Votre message'}
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
      </div>
    </div>
  )
}
