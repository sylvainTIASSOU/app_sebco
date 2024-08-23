"use client"

import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import  * as Yup from "yup";
import { useFormik } from "formik";
import {Button, Input, Select, SelectProps} from "antd";
import {Api} from "@/app/api/Api";
import {CharacteristicModel} from "@/models/stockModule/CharacteristicModel";
import {CategoryModel} from "@/models/stockModule/CategoryModel";
import {ProviderModel} from "@/models/usersModule/ProviderModel";
import Image from 'next/image';
import {UploadButton} from "@/lib/uploadthing";
import {StockModel} from "@/models/stockModule/StockModel";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {StockProductModel} from "@/models/stockModule/StockProductModel";

let ImagesArray: string[] = [];
let characteristicVal: string[] = [];

class CharacteristicArticleModel {
    constructor(number: number, number2: number) {
        
    }

}

export default function EditProduct({params}: {params: {id: string}}) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();
    const [categoryArrays, setCategoryArrays] = useState<SelectProps['options']>();
    const [characteristicArrays, setCharacteristicArrays] = useState<SelectProps['options']>()
    const [providers, setProviders] = useState<SelectProps['options']>()
    const [imagesArrays, setImagesArrays] = useState<string[]>([])
    const [characteristicValues, setCharacteristicValues] = useState<string[]>([])
    const [images, setImages] = useState<string>('');
    const [images2, setImages2] = useState<string>('');
    const [images3, setImages3] = useState<string>('');
    const [images4, setImages4] = useState<string>('');
    const [stockId, setStockId] = useState('');
    const [articleId, setArticleId] = useState('');
    const [stockArticleId, setStockArticleId] = useState('');
    const [characteristicId, setCharacteristicId] = useState('');




    useEffect(() => {
        const fetch = async () => {

            //get stockArticle
            const resp = await Api.read(`/api/stockArticle/${params.id}`);

            //get stockArticle
            const resp2 = await Api.read(`/api/productCharacteristic/getCharacteristicByArticleId/${resp.productId}`);
            console.log(resp2)

            setStockArticleId(resp.id);
            setStockId(resp.stockId);
            const initialData = {

                provider: String(resp.stock.providerId),
                stockPrice: String(resp.stockPrice),
                name: resp.product.name|| "",
                price: String(resp.product.price) || "",
                quantity: String(resp.quantity) || "",
                category: String(resp.product.categoryId) || "",
                description: resp.product.description || "",
                tax: String(resp.product.tax) || "",
            }
            ImagesArray = resp.imageUrl;
            setImages(resp.product.imageUrl[0])
            setImages2(resp.product.imageUrl[1])
            setImages3(resp.product.imageUrl[2])
            setImages4(resp.product.imageUrl[3])
            formik.setValues(initialData);
        }
        fetch();


        //loard provider
        Api.read('/api/provider/getProviderByStatus/PROVIDER').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: ProviderModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.name),
                })
            });
            setProviders(newdep)
        })

        //loard categories
        Api.read('/api/category').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: CategoryModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.name),
                })
            })
            setCategoryArrays(newdep)
        })
        //loard characteristic data
        Api.read('/api/characteristic').then((value: CharacteristicModel[]) => {

            const newdep: SelectProps['options'] = [];
            value.forEach((element: CharacteristicModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.name),
                })
            });
            setCharacteristicArrays(newdep);
        })
    }, []);

    function resetForm(values: any) {
        formik.resetForm()
        setImages('');
        setImages2('');
        setImages3('');
        setImages4('');
        ImagesArray = [];
        characteristicVal = [];
        setCharacteristicValues([]);

        
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            quantity: "",
            category: "",
            description: "",
            tax: "",
            provider: "",
            stockPrice: ""
        },
        validationSchema: Yup.object({
            provider: Yup.string().required("Le fournisseur est obligatoire"),
            stockPrice: Yup.string().required("Le prix du stock est obligatoire"),
            field: Yup.string().optional(),
            name: Yup.string().required("Le nom de l'aricle est obligatoire"),
            price: Yup.number().required('le prix est obligatoire'),
            quantity: Yup.number().required("La quantité est obligatoire"),
            category: Yup.string().required("la categorie est obligatoire"),
            // characteristic: Yup.ArraySchema.required("le caracteristique est obligatoire"),
            description: Yup.string().optional(),
            tax: Yup.string().optional(),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            if (values.category != "" && characteristicValues.length != 0) {
                if (ImagesArray.length != 0) {
                    const articleModel = new ProductModel(values.name, Number(values.price), ImagesArray, Number(values.category), values.description, Number(values.tax));
                    const resp = await Api.update(`/api/article/${articleId}`, articleModel);

                    if (resp.ok) {
                        const id = resp.product.id
                        //ajout du carateristique
                        /*characteristicValues.forEach((element) => {
                            const characteristicArticleModel = new CharacteristicArticleModel(Number(id), Number(element))
                            Api.create('/api/productCharacteristic', characteristicArticleModel)
                        });*/

                        //ajout de l'articlz au stock
                        const stockModel = new StockModel(+values.provider);
                        const respStock = await Api.update(`/api/stock/${stockId}`, stockModel)
                        if (respStock.ok) {
                            const stockId = respStock.stock.id;
                            //ajout du
                            const stockArticleModel = new StockProductModel(+values.quantity, +values.stockPrice, +id, +stockId)
                            const resp2 = await Api.update(`/api/stockArticle/${stockArticleId}`, stockArticleModel);

                            if (resp2.ok) {
                                toast({
                                    title: 'Article modifier avec succès',
                                });
                                setLoading(false)
                                resetForm(values)
                            }
                            else {

                                console.log(resp2)
                                toast({
                                    variant: 'destructive',
                                    title: 'Une erreur est survenu lors de la modification',
                                    description: 'réessayer'
                                });
                                setLoading(false)
                            }
                        }
                        else {
                            console.log(respStock)
                            toast({
                                variant: 'destructive',
                                title: 'Une erreur est survenu lors de l enregistrement',
                                description: 'réessayer'
                            });
                            setLoading(false)
                        }


                    } else {
                        console.error(resp);
                        toast({
                            variant: 'destructive',
                            title: 'Une erreur est survenu lors de l enregistrement',
                            description: 'réessayer'
                        });
                        setLoading(false)
                    }
                } else {
                    toast({
                        variant: 'destructive',
                        title: "Ajouter au moin une image",
                        description: 'Réessayer'
                    });
                    setLoading(false)
                }
            } else {
                toast({
                    variant: 'destructive',
                    title: "Selectioner la catégorie et une caracteristique",
                    description: 'Réessayer'
                });
                setLoading(false)
            }
            setLoading(false)
        }
    })

    return(
        <div className={"flex flex-col gap-10"}>
            <ContendAddHeader subtitle={'Gestion du Stock'} title={'Editer une article'}/>
            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations de l'article </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span
                    className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        {/*image*/}

                                    <div
                                        className={`w-full bg-slate-200 h-[200px] overflow-hidden relative items-center justify-center content-center rounded-2xl border-2`}>

                                        {
                                            images && <Image src={images} alt="Uploaded Image" layout={'fill'} fill
                                                             className="objet-cover bg-center bg-cover "/>
                                        }

                                        <UploadButton
                                            className="w-full p-3 relative"
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res: any[]) => {
                                                // Do something with the response
                                                ImagesArray.push(res[0].url)
                                                setImages(res[0].url);
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </div>

                                    <div
                                        className={`w-full bg-slate-200 h-[200px] overflow-hidden relative items-center justify-center content-center rounded-2xl border-2`}>

                                        {
                                            images2 && <Image src={images2} alt="Uploaded Image" layout={'fill'} fill
                                                              className="objet-cover bg-center bg-cover "/>
                                        }

                                        <UploadButton
                                            className="w-full p-3 relative"
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res: any[]) => {
                                                // Do something with the response
                                                ImagesArray.push(res[0].url)
                                                setImages2(res[0].url);
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </div>

                     </div>

                    <div className={"flex items-center justify-between gap-5 content-between"}>

                            <div
                                className={`w-full bg-slate-200 h-[200px] overflow-hidden relative items-center justify-center content-center rounded-2xl border-2`}>

                                {
                                    images3 && <Image src={images3} alt="Uploaded Image" layout={'fill'} fill
                                                      className="objet-cover bg-center bg-cover "/>
                                }

                                <UploadButton
                                    className="w-full p-3 relative"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res: any[]) => {
                                        // Do something with the response
                                        ImagesArray.push(res[0].url)
                                        setImages3(res[0].url);
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            </div>




                            <div
                                className={`w-full bg-slate-200 h-[200px] overflow-hidden relative items-center justify-center content-center rounded-2xl border-2`}>

                                {
                                    images4 && <Image src={images4} alt="Uploaded Image" layout={'fill'} fill
                                                      className="objet-cover bg-center bg-cover "/>
                                }

                                <UploadButton
                                    className="w-full p-3 relative"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res: any[]) => {
                                        // Do something with the response
                                        ImagesArray.push(res[0].url)
                                        setImages4(res[0].url);
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            </div>

                    </div>

                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom de l'article"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'name'}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.price && formik.errors.price ? 'text-red-600' : ''}> {formik.touched.price && formik.errors.price ? formik.errors.price : "Prix unitaire"}
                                <span className={'text-red-600'}>*</span> </label>
                            <Input type={'number'}
                                   name={'price'}
                                   value={formik.values.price}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>

                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.quantity && formik.errors.quantity ? "text-red-600" : ""}> {formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : "Quantité"}
                                <span className={'text-red-600'}>*</span> </label>
                            <Input type={'number'}
                                   name={'quantity'}
                                   value={formik.values.quantity}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.category && formik.errors.category ? "text-red-600" : ""}> {formik.touched.category && formik.errors.category ? formik.errors.category : "Catégorie"}
                                <span className={'text-red-600'}>*</span> </label>

                            <Select
                                placeholder=""
                                defaultValue={formik.values.category}
                                value={formik.values.category}

                                onSelect={(value) => {
                                    formik.values.category = String(value)
                                }}
                                options={categoryArrays}
                                className="w-full"
                            />

                        </div>
                    </div>


                    {/**/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={""}> Caractéristiques
                                <span className={'text-red-600'}>*</span> </label>
                            <Select
                                mode="multiple"
                                placeholder=""
                                onSelect={(value) => {
                                    characteristicVal.push(value as string)
                                    setCharacteristicValues(characteristicVal);
                                }}

                                options={characteristicArrays}
                                className="w-full"
                            />

                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.errors.tax ? "text-red-600" : ""}> {formik.errors.tax ? formik.errors.tax : "Taxe"}
                                <span className={'text-red-600'}></span> </label>
                            <Input type={'number'} name={'tax'}
                                   value={formik.values.tax}
                                   onChange={formik.handleChange}
                                   className={'w-full'}/>
                        </div>
                    </div>


                    {/**/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.provider && formik.errors.provider ? "text-red-600" : ""}> {formik.touched.provider && formik.errors.provider ? formik.errors.provider : "fournisseur"}
                                <span className={'text-red-600'}>*</span> </label>

                            <Select
                                placeholder=""
                                defaultValue={formik.values.provider}
                                value={formik.values.provider}

                                onSelect={(value) => {
                                    formik.values.provider = String(value)
                                }}
                                options={providers}
                                className="w-full"
                            />

                        </div>

                        <div className={'flex flex-col space-y-3 w-full'}>
                            <label
                                className={formik.touched.stockPrice && formik.errors.stockPrice ? 'text-red-600' : ''}> {formik.touched.stockPrice && formik.errors.stockPrice ? formik.errors.stockPrice : "Prix du stock"}
                                <span className={'text-red-600'}>*</span> </label>
                            <Input type={'number'}
                                   name={'stockPrice'}
                                   value={formik.values.stockPrice}
                                   onChange={formik.handleChange}
                                   className={' w-full'}/>
                        </div>
                    </div>


                    {/**/}
                    <div className={'flex flex-col space-y-3 w-full'}>
                        <label
                            className={formik.touched.description && formik.errors.description ? "text-red-600" : ""}> {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}
                            <span className={'text-red-600'}></span> </label>
                        <Input type={'text'} name={'description'}
                               value={formik.values.description}
                               onChange={formik.handleChange}
                               className={'w-full h-[85px]'}/>
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
    );
}