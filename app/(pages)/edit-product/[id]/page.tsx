"use client"

import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import {Minus, Plus, ShoppingCart} from "lucide-react";
import {addProduct} from "@/redux/features/cart-slice";
import {ToastAction} from "@/components/ui/toast";
import CartModel from "@/models/CartModel";
import {Button} from "@/components/ui/button";
import {StockProductModel} from "@/models/stockModule/StockProductModel";


export default function EditProduct({params}: { params: { id: string } }) {
    const [imageUrls, setImageUrls] = useState('');

    const [isClicked, setIsClick] = useState(0);
    const [qte, setQte] = useState(1);
    const {toast} = useToast();
    const [productData, setProductData] = useState<ProductModel>()
    const [characteristicData, setCharacteristicData] = useState<any[]>([])
    const [imageData, setImageData] = useState<any[]>([])
    //const [data, setData] = useState<DataInterface[]>([]);
    const [price, setPrice] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [loadingArt, setLoadingArt] = useState(false);
    const [loadingCharact, setLoadingCharact] = useState(false);
    const [loading, setLoading] = useState(false);
    const [articlesData, setArticlesData] = useState<ProductModel[]>([])
    const [articlesStock, setArticlesStock] = useState<StockProductModel>()
    const [stockQte, setStockQte] = useState<number>()
    const route = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoadingArt(true)
        setLoadingCharact(true)
        setLoading(true)
        Api.read(`/api/productCharacteristic/getCharacteristicByArticleId/${params.id}`).then((articleData: any[]) => {
            setCharacteristicData(articleData);
            console.log(articleData)
        }).finally(() => {
            setLoadingCharact(false);
        });

        Api.read(`/api/article/${params.id}`).then((articleData: any) => {
            setProductData(articleData);
            setPrice(articleData.price);
            setPriceTotal(articleData.price)
            setImageUrls(articleData.imageUrl[0]);
        }).finally(() => {
            setLoadingArt(false);
        });

        Api.read('/api/article').then((data) => {
            setArticlesData(data)
        }).finally(() => {
            setLoading(false);
        });

        Api.read(`/api/stockArticle/getByArticleId/${params.id}`).then((data) => {
            setArticlesStock(data)
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <div className={" mt-[35%] md:mt-[10%] px-3 md:px-[20rem] flex flex-col space-y-20"}>
            <section className={''}>
                {
                    loadingArt ?
                        <div className={"flex flex-col space-y-3"}>
                            <Skeleton className={"w-[150px] h-8 "}/>
                            <Skeleton className={"w-[250px] h-24 "}/>
                        </div>
                        :
                        <h1 className={"text-4xl md:text-6xl font-bold"}>{productData?.name}</h1>
                }
                <p className={"text-xl  md:w-[600px]"}>
                    {productData?.description}
                </p>
            </section>

            {/*div content image and caracteristic*/}
            <section
                className={'flex  flex-col w-auto space-y-5 md:flex-row md:content-between md:justify-between mt-10'}>
                {/* images*/}
                <div className={'flex flex-col w-full space-y-3 md:flex-row  md:space-x-5'}>
                    {/*liste image*/}
                    <div className={"flex space-x-5 md:flex-col md:space-y-5 md:space-x-0"}>
                        {
                            loadingArt ?
                                [1, 2, 3, 4].map((items) => {
                                    return <Skeleton key={items} className={"w-[50px] h-[50px] rounded-sm"}/>
                                })

                                :
                                productData?.imageUrl.map((data, index) => {
                                    return <div key={index}
                                                onClick={() => {
                                                    setImageUrls(data);
                                                }}
                                                className={data == imageUrls ? "w-[50px] h-[50px] rounded-sm border-2 border-orange-500 p-1 flex items-center justify-center" : "flex items-center justify-center p-1 w-[50px] h-[50px] rounded-sm "}
                                    >
                                        <img src={data} className={"bg-cover  bg-center"} alt={"image"}/>
                                    </div>
                                })
                        }
                    </div>

                    {/* image*/}
                    <div className={" shadow-2xl  md:w-[300px] h-[300px] p-3"}>
                        {
                            loadingArt ?
                                <Skeleton className={"md:w-[400px] h-[400px]"}/> :
                                <img
                                    src={imageUrls}
                                    alt={'image'}
                                    className={'flex bg-cover bg-center  w-full h-full'}
                                />
                        }

                    </div>


                    {/* caracterisques*/}
                    <div
                        className={'bg-white flex flex-col justify-between content-between rounded-[15px] md:w-[500px] p-5 h-auto  md:ml-[10%]'}>
                        <h1 className={'text-xl font-bold underline'}>Caractéristiques</h1>

                        {/* caracteristiques data*/}
                        <div className={"flex space-x-5 justify-between content-between items-center"}>
                            <div className={'mt-3 flex flex-col space-y-3'}>
                                {
                                    characteristicData.map((charact, index) => {
                                        return <div key={index} className={'flex space-x-1'}>
                                            <h1 className={"text-lg"}>{charact.characteristic.name}</h1>
                                            <h1 className={"font-bold text-lg text-sky-400"}>: {charact.characteristic.value} </h1>
                                        </div>


                                    })
                                }
                            </div>

                            <div className={"text-[20px] font-bold text-white bg-sky-400 p-3 rounded-md"}>
                                {priceTotal} TTC
                            </div>
                        </div>


                        {/* button to add product*/}
                        <div className={'flex flex-col mt-[10%] space-y-3'}>

                            <div className={'flex space-x-10 self-center'}>
                                <Button variant={'outline'}
                                        size={'icon'}
                                        onClick={() => {
                                            if (qte > 1) {
                                                setQte(qte - 1);
                                                setPriceTotal(priceTotal - price);
                                            }
                                        }}
                                >
                                    <Minus className={'w-[25]px] h-[25px]'}/>
                                </Button>


                                <div className={'text-[30px] font-bold'}>
                                    {qte}
                                </div>

                                <Button variant={'outline'}
                                        size={'icon'}
                                        onClick={() => {
                                            setQte(qte + 1);
                                            setPriceTotal(priceTotal + price);
                                        }}
                                >
                                    <Plus className={'w-[25]px] h-[25px]'}/>
                                </Button>
                            </div>

                            <Button className={'bg-slate-100 text-black hover:text-white font-bold flex space-x-3'}
                                    size={'lg'}
                                    onClick={async () => {
                                        if (qte < 1) {
                                            toast({
                                                title: "Panier",
                                                description: "ajouter au moin une article!!",
                                                variant: 'destructive',
                                                action: <ToastAction altText="Reessayer">Try again</ToastAction>,
                                            });
                                        } else {
                                            if (qte < Number(articlesStock?.quantity)) {
                                                const modelCart = new CartModel(String(productData?.id), String(productData?.name), imageUrls, Number(productData?.price), Number(price * qte), qte);

                                                const productStock = new StockProductModel(Number(articlesStock?.quantity) - qte, Number(articlesStock?.stockPrice), Number(articlesStock?.productId), Number(articlesStock?.stockId), Number(articlesStock?.id));
                                               const resp =  await Api.update('/api/stockArticle', productStock);
                                               if(resp.ok) {
                                                   dispatch(addProduct(modelCart));
                                                   setQte(1);
                                                   setPriceTotal(price);
                                                   toast({
                                                       title: "Panier",
                                                       description: "Article ajouté au panier!!",
                                                   });
                                               } else {
                                                   console.log(resp);
                                                   toast({
                                                       title: "Panier",
                                                       description: `Erreur de mise a jour`,
                                                   })
                                               }

                                            } else {
                                                toast({
                                                    title: "Panier",
                                                    description: `Sélectionné une quantité inférieure ou égale à  ${Number(articlesStock?.quantity)}`,
                                                })
                                            }

                                        }

                                    }

                                    }

                            >

                                <h1>
                                    Ajouter au panier
                                </h1>
                                <ShoppingCart className={'  w-[20px] h-[20px]'}/>

                            </Button>
                        </div>

                    </div>
                </div>
            </section>


        </div>
    )
}