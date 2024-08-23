"use client"
import Confetti from 'react-confetti'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from 'formik';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {CommentModel} from "@/models/CommentModel";
import { useToast } from '@/components/ui/use-toast';
import Resources from "@/lib/resources";
import {Send} from "lucide-react";
import {Api} from "@/app/api/Api";
import {Button, Input} from "antd";


const Congratulation = ({params}: {params: {orderId: string}}) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const router = useRouter()
    const isAuth = useSelector((state: RootState) => state.auth.value.isAuth)
    const uid = useSelector((state: RootState) => state.auth.value.uid)
    const { toast } = useToast();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }, []);

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string().optional()
        }),
        onSubmit: async (values) => {

            if(isAuth) {
                if(values.comment != "") {
                    setLoading(true)
                    const commentModel = new CommentModel(values.comment, String(Resources.date), Number((uid)));
                    const resp = await Api.create("/api/comment", commentModel)
                    if(resp.ok) {
                        toast({
                            title: "Merci de télécharger votre facture sur la page suivante"
                        });
                        setLoading(false)
                        formik.resetForm();
                       router.push(`/invoice/${params.orderId}`)
                    }else {
                        console.log(resp)
                        setLoading(true)
                    }
                }else {
                   router.push(`/invoice/${params.orderId}`)
                }

            }
        }
    })

    return(
        <div className={"mt-[35%]  md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center"}>

            <div>
                <h1 className={"text-[25px] font-medium text-blue-600 text-center"}>SeBcO VOUS REMERCIE POUR
                    VOTRE CONFIANCE</h1>
                <h1 className={"text-[18px] font-light text-blue-600 text-center"}>Votre commande est en route
                    pour votre adresse</h1>
            </div>


            <div className={"flex flex-col-reverse space-y-3  md:flex-row  md:space-x-5 "}>

                {/* comment form*/}
                <div className={"flex flex-col space-y-10 md:mt-[15%]"}>
                    <h1 className={"text-center text-[18px] "}>
                        Laissez-nous un commentaire sur votre expérience d'utilisation <br/>
                        et télécharger votre facture
                    </h1>

                    <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5 "}>

                        <div className={"flex flex-col space-y-2"}>
                            <label className={"text-red-600 text-center"}>
                                {formik.touched.comment  && formik.errors.comment ? formik.errors.comment : ""}
                            </label>
                            <Input type={"text"}
                                   placeholder={" Votre commentaire"}
                                   className={"h-[100px]"}
                                   name={"comment"}
                                   value={formik.values.comment}
                                   onChange={formik.handleChange}
                            />

                        </div>

                        <Button htmlType={"submit"}
                                size={"large"}
                                loading={loading}
                                className={"self-center md:self-end w-auto bg-slate-100 text-black"}

                        >
                            Téléchargé la facture
                            <Send/>
                        </Button>
                    </form>
                </div>

                <div className={"flex flex-col"}>

                    <Image src={"/images/sammy-woman-in-shopping-cart-placing-order-on-smartphone.gif"}
                           alt={"data empty"}
                           priority
                           width={500}
                           height={500}
                           className={"bg-center bg-cover"}
                    />


                </div>


            </div>


            <Confetti
                width={width}
                height={height}
            />
        </div>
    );
}
export default Congratulation;