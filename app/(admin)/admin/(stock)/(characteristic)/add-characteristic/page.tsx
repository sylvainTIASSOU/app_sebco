"use client"

import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {CharacteristicModel} from "@/models/stockModule/CharacteristicModel";
import {Api} from "@/app/api/Api";
import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import {Button, Input} from "antd";
export default function AddCharacterisitc() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: {
            name: "",
            value: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            value: Yup.string().required("La valeur est obligatoire"),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const characteristicModel = new CharacteristicModel(values.name, values.value);
            const response = await Api.create('/api/characteristic',characteristicModel)
            if(response.ok) {
                //show toast
                toast({
                    title: "Caracteristique Ajouté avec succès",
                    description: "Une caractéristique a été ajouter",
                })
                formik.resetForm()
                setLoading(false)
            }
            else
            {
                console.log(response)
                toast({
                    variant: 'destructive',
                    title: "Une erreur s'est produite lors de l'ajout ",
                    description: "Réessayer!!!",
                });
                setLoading(false)
            }
            setLoading(false)

        }
    })

    return(
        <div className={"flex flex-col gap-10 "}>
            <ContendAddHeader subtitle={'Gestion du Stock'} title={'Ajouter une caracteristique'}/>
            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations du caracteristique </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span
                    className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>

                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom du Caractéristique"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'name'}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.value && formik.errors.value ? 'text-red-600' : ''}>{formik.touched.value && formik.errors.value ? formik.errors.value : "valeur"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'value'}
                                   value={formik.values.value}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>

                    <div className={"flex space-x-10 items-center"}>
                        <Button size={"middle"} htmlType={"submit"} loading={loading}
                                className={"font-bold text-black bg-slate-100 p-3"}>Ajouter</Button>
                        <Button size={"middle"} onClick={() => {
                            formik.resetForm()
                        }} htmlType={"reset"} className={"font-bold text-white bg-red-600 p-3"}>Annuler</Button>
                    </div>
                </form>

            </section>

        </div>
    )
}