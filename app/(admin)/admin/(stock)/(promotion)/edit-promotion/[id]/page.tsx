"use client"


import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {Button, Input, Select, SelectProps} from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {Api} from "@/app/api/Api";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {PromotionModel} from "@/models/promotionModule/PromotionModel";
import {PromotionProductModel} from "@/models/promotionModule/PromotionProductModel";

export default function EditPromotion({params}: {params: {id: string}}) {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string>('');
    const route = useRouter()
    const {toast} = useToast();
    const [articles, setArticles] = useState<SelectProps['options']>();
    const [articleId, setArticleId] = useState('');
    const [promotionId, setPromotionId] = useState('');

    useEffect(() => {

        const fetch = async () =>{
            const resp = await Api.read(`/api/promotionArticle/${params.id}`)
            setArticleId(resp.productId);
            setPromotionId(resp.promotionId);

            const initialDta = {
                beginDate:  resp.promotion.beginDate ||"",
                endDate:  resp.promotion.endDate ||"",
                newPrice:  resp.newPrice ||"",
                oldPrice:  resp.oldPrice ||"",
                productId:  resp.productId ||"",
            }
            formik.setValues(initialDta);
        }
        fetch()

        //loard provider
        Api.read('/api/article').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: ProductModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.name),
                })
            });
            setArticles(newdep)
        })
    }, []);

    const formik = useFormik({
        initialValues: {
            beginDate: "",
            endDate: "",
            newPrice: "",
            oldPrice: "",
            productId: "",
        },

        validationSchema: Yup.object({
            beginDate: Yup.string().required("La date de debut est obligatoire"),
            endDate: Yup.string().required("La date de fin est obligatoire"),
            newPrice: Yup.number().required("La date de fin est obligatoire"),
            oldPrice:    Yup.number().required("La date de fin est obligatoire"),
            productId: Yup.string().required("La date de fin est obligatoire"),

        }),
        onSubmit: async (values) => {
            setLoading(true)
            const promotionModel = new PromotionModel(values.beginDate, values.endDate,"description" );
            const resp = await Api.update(`/api/promotion/${promotionId}`, promotionModel);

            if(resp.ok) {
                const promotionArticleModel = new PromotionProductModel(+values.newPrice, +values.oldPrice, +resp.promotion.id, +values.productId);
                const resp2 = await Api.update(`/api/promotionArticle/${params.id}`, promotionArticleModel);
                if(resp2.ok) {
                    const resp3: ProductModel = await Api.read(`/api/article/${articleId}`)
                    const articlemodel = new ProductModel(resp3.name, +values.newPrice, resp3.imageUrl, resp3.categoryId, resp3.description,  resp3.tax,resp3.id, resp3.isVisible, resp3.isActived )
                    await Api.update(`/api/article/${articleId}`, articlemodel)
                    toast({
                        title: 'Promotion ajouter avec succès',
                    });
                    route.refresh();
                    setLoading(false)

                } else {
                    console.log(resp2)
                    toast({
                        variant: 'destructive',
                        title: 'Une erreur est survenu lors de l enregistrement',
                        description: 'réessayer'
                    });
                    setLoading(false)
                }

            } else {
                console.log(resp)
                toast({
                    variant: 'destructive',
                    title: 'Une erreur est survenu lors de l enregistrement',
                    description: 'réessayer'
                });
                setLoading(false)
            }
        }
    })

    return(
        <div className={"flex flex-col gap-10 "}>
            <ContendAddHeader subtitle={'Gestion du Stock'} title={'Editer une promotion'}/>
            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations de la promotion </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span
                    className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.beginDate && formik.errors.beginDate ? 'text-red-600' : ''}>{formik.touched.beginDate && formik.errors.beginDate ? formik.errors.beginDate : "Date de debut"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'date'}
                                   name={'beginDate'}
                                   value={formik.values.beginDate}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.endDate && formik.errors.endDate ? 'text-red-600' : ''}> {formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : "Date de fin"}
                                <span className={'text-red-600'}></span> </label>
                            <Input type={'date'}
                                   name={'endDate'}
                                   value={formik.values.endDate}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>


                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.productId && formik.errors.productId ? 'text-red-600' : ''}> {formik.touched.productId && formik.errors.productId ? formik.errors.productId : "L'article en promotion"}
                                <span className={'text-red-600'}></span> </label>
                            <Select
                                placeholder=""
                                defaultValue={formik.values.productId}
                                value={formik.values.productId}
                                onSelect={async (value) => {
                                    setLoading(true)
                                    formik.values.productId = String(value)
                                    const resp = await Api.read(`/api/article/${value}`);
                                    formik.values.oldPrice = resp.price
                                    setLoading(false)
                                }}
                                options={articles}
                                className="w-full"
                            />
                        </div>

                        {/*new price*/}
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.newPrice && formik.errors.newPrice ? 'text-red-600' : ''}> {formik.touched.newPrice && formik.errors.newPrice ? formik.errors.newPrice : "Nouveau prix"}
                                <span className={'text-red-600'}></span> </label>
                            <Input type={'number'}
                                   name={'newPrice'}
                                   value={formik.values.newPrice}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>

                    <div className={'flex flex-col space-y-3 w-full'}>
                        <label
                            className={formik.touched.oldPrice && formik.errors.oldPrice ? 'text-red-600' : ''}> {formik.touched.oldPrice && formik.errors.oldPrice ? formik.errors.oldPrice : "Encient prix"}
                            <span className={'text-red-600'}></span> </label>
                        <Input type={'number'}
                               name={'oldPrice'}
                               value={formik.values.oldPrice}
                               onChange={formik.handleChange}
                               className={'w-full'}/>
                    </div>
                    <div className={"flex space-x-10 items-center"}>
                        <Button size={"middle"} htmlType={"submit"} loading={loading}
                                className={"font-bold text-black bg-slate-100 p-3"}>Modifier</Button>
                        <Button size={"middle"} onClick={() => {
                            formik.resetForm()
                        }} htmlType={"reset"} className={"font-bold text-white bg-red-600 p-3"}>Annuler</Button>
                    </div>
                </form>
            </section>

        </div>
    )
}