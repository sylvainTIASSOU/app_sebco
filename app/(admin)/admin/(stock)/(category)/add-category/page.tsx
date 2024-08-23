"use client"


import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {Button, Input} from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {Api} from "@/app/api/Api";
import ImageLoader from "@/components/ImageLoader";


export default function AddCategory() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string>('');
    const route = useRouter()
    const {toast} = useToast();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            description: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            if (images != "") {
                const categoryModel = new CategoryModel(values.name, images, values.description);
                const resp = await Api.create('/api/category', categoryModel)
                if (resp.ok) {
                    toast({
                        title: 'Catégorie ajouter avec succès',
                    });
                    formik.resetForm();
                    setImages("");
                    setLoading(false);
                }
                else {
                    console.log(resp);
                    toast({
                        variant: 'destructive',
                        title: 'Une erreur est survenu lors de l enregistrement',
                        description: 'réessayer'
                    });
                    setLoading(false)
                }
            }
            else {
                toast({
                    title: 'ajouter au moin une image',
                    variant: 'destructive'
                });
                setLoading(false);
            }
            setLoading(false);
        }
    })


    return (
        <div className={"flex flex-col gap-10 "}>
            <ContendAddHeader subtitle={'Gestion du Stock'} title={'Ajouter une categorie'}/>
            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations du categorie </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span
                    className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>
                    <div className={"flex   gap-5"}>
                        <div className={""}>
                            <label>Image <span className={'text-red-600'}>*</span> </label>
                            <div className={"flex justify-between content-between"}>
                                <div>
                                    <ImageLoader url={setImages} initialUrl={images}/>
                                </div>
                            </div>
                        </div>

                        {/*first input row*/}
                        <div className={'flex flex-col mt-5 space-y-5 w-full'}>
                            <div className={'flex flex-col space-y-3 w-full'}>
                                <label
                                    className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom du Catégorie"}<span
                                    className={'text-red-600'}>*</span> </label>
                                <Input type={'text'}
                                       name={'name'}
                                       value={formik.values.name}
                                       onChange={formik.handleChange}
                                       className={'w-full'} />
                            </div>

                            <div className={'flex flex-col space-y-3 w-full'}>
                                <label
                                    className={formik.touched.description && formik.errors.description ? 'text-red-600' : ''}> {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}
                                    <span className={'text-red-600'}></span> </label>
                                <Input type={'text'}
                                       name={'description'}
                                       value={formik.values.description}
                                       onChange={formik.handleChange}
                                       className={'w-full h-16'} />
                            </div>
                        </div>
                    </div>

                    <div className={"flex space-x-10 items-center"}>
                        <Button size={"middle"} htmlType={"submit"} loading={loading}
                                className={"font-bold text-black bg-slate-100 p-3"}>Ajouter</Button>
                        <Button size={"middle"} onClick={() => {
                            formik.resetForm();
                            setImages("");
                        }} htmlType={"reset"} className={"font-bold text-white bg-red-600 p-3"}>Annuler</Button>
                    </div>
                </form>


            </section>

        </div>
    );
}