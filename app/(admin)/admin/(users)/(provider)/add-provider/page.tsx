'use client'

import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import {Button, Input, Select} from "antd";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {ProviderModel} from "@/models/usersModule/ProviderModel";
import {Api} from "@/app/api/Api";

export default function AddProvider() {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            phone: "",
            type: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            address: Yup.string().required("L'adresse est obligatoire"),
            phone: Yup.number().required("Le numero est obligatoire"),
            type: Yup.string().required("Le type est obligatoire"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const providermodel = new ProviderModel(values.name, values.address, +values.phone, values.type);
            const resp = await Api.create("/api/provider", providermodel);
            if (resp.ok) {
                toast({
                    title: 'Utilisateur ajouté avec succès',
                });
                setLoading(false);
                formik.resetForm();
            } else {
                console.error(resp);
                toast({
                    variant: 'destructive',
                    title: `Une erreur est survenue lors de l'ajout`,
                    description: 'réessayer'
                });
                setLoading(false);
            }

            // console.log(values)
        }
    })
    return (
        <div className={"flex flex-col gap-10 "}>
            <ContendAddHeader subtitle={'Gestion des Utilisateur'} title={'Ajouter un fournisseur/livreur'}/>
            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations du
                    fournisseur/livreur </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span
                    className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>

                    {/*names / address*/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3  w-full'}>
                            <label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom complet"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'name'}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3  w-full'}>
                            <label
                                className={formik.touched.address && formik.errors.address ? 'text-red-600' : ''}>{formik.touched.address && formik.errors.address ? formik.errors.address : "Adresse"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'address'}
                                   value={formik.values.address}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>

                    {/*phone / type*/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.phone && formik.errors.phone ? 'text-red-600' : ''}>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'tel'}
                                   name={'phone'}
                                   value={formik.values.phone}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.type && formik.errors.type ? 'text-red-600' : ''}>{formik.touched.type && formik.errors.type ? formik.errors.type : "type d'utilisateure"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Select
                                placeholder=""

                                onSelect={(value) => {
                                    formik.values.type = String(value)
                                }}
                                options={[
                                    {
                                        label: "Fournisseur",
                                        value: "PROVIDER"
                                    },
                                    {
                                        label: "Livreur",
                                        value: "DELIVER"
                                    }
                                ]}
                                className="w-full"
                            />
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
    );
}