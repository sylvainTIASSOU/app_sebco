"use client";
import ContendAddHeader from "@/app/(admin)/components/ContendAddHeader";
import {Button, Input, Select} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {UserModel} from "@/models/usersModule/UserModel";
import {Api} from "@/app/api/Api";


export default function EditEmployes({params}: {params: {id: string}}) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();
    const route = useRouter();

    useEffect(() => {

        Api.read(`/api/user/${params.id}`).then((val: UserModel) => {

            const initialVal = {
                lastName : val.lastName || '',
                firstName: val.firstName || '',
                email: val.email || '',
                phone: String(val.phone) || '',
                passwords: val.password || '',
                passwordsConfirm: val.password || '',
                role: val.role || '',
            };
            formik.setValues(initialVal);
        })
    }, []);

    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            passwords: "",
            passwordsConfirm: "",
            role: ""
        },
        validationSchema: Yup.object({
            lastName: Yup.string().required("Le nom est obligatoire"),
            firstName: Yup.string().required("Le prénom est obligatoire"),
            email: Yup.string().email("Entrez un email valide").required("Votre email est obligatoire"),
            passwords: Yup.string().required("Le mot de passe est obligatoire"),
            passwordsConfirm: Yup.string().required("confirmez le mot de passe"),
            phone: Yup.number().required("Le numéro est obligatoire"),
            role: Yup.string().required("Le role est obligatoire"),

        }),
        onSubmit: async (values) => {
            if(values.passwordsConfirm != values.passwords) {
                formik.errors.passwordsConfirm = "Les mots de passe ne sont pas conforment."
            } else {
                setLoading(true);

                const userModel = new UserModel(+values.phone, values.passwords, values.email, values.firstName, values.lastName, values.role);
                const resp = await Api.update(`/api/user/${params.id}`, userModel);
                if(resp.ok) {
                    toast({
                        title: "Utilisateur modifié avec succès"
                    });
                    //formik.resetForm();
                    route.refresh();
                    setLoading(false)
                } else {
                    toast({
                        title: "Une erreur est survenue lors de la modification.",
                        description: "Ressayé!!",
                        variant: "destructive",
                    });
                    setLoading(false)
                }
            }
            setLoading(false)
        }
    })

    return (
        <div className={"flex flex-col gap-10 "}>
            <ContendAddHeader subtitle={'Gestion des employés'} title={'Editer un employé'}/>

            <section className={"border-2 border-slate-200 rounded-3xl p-5 flex flex-col gap-5"}>
                <h1 className={"text-center font-bold text-2xl"}>Renseigner les informations de l employé </h1>
                <h1 className={"text-center font-light text-xl"}>les champs <span className={"text-red-600"}> *</span> sont obligatoires </h1>

                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5 lg:px-[13rem]"}>

                    {/*names*/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        {/*lastName*/}
                        <div className="flex flex-col w-full">
                            <label
                                className={formik.touched.firstName && formik.errors.firstName ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : "Nom"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   value={formik.values.firstName}
                                   onChange={formik.handleChange}
                                   name="firstName"
                            />
                        </div>

                        {/*firstName*/}
                        <div className="flex w-full flex-col">
                            <label
                                className={formik.touched.lastName && formik.errors.lastName ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : "Prénom"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   value={formik.values.lastName}
                                   onChange={formik.handleChange}
                                   name="lastName"
                            />
                        </div>

                    </div>

                    {/*email phone*/}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        {/**number */}
                        <div className="flex flex-col w-full">
                            <label
                                className={formik.touched.phone && formik.errors.phone ? "text-[16px] text-red-600" : "text-[16px] text-gray-600 "}>
                                {formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de téléphone"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   name="phone"
                                   value={formik.values.phone}
                                   onChange={formik.handleChange}
                                   pattern={"[0-9]{8}"}
                                   maxLength={8}
                            />
                        </div>

                        {/**email */}
                        <div className="flex flex-col w-full">
                            <label
                                className={formik.touched.email && formik.errors.email ? "text-[16px] text-red-600" : "text-[16px] text-gray-600 "}>
                                {formik.touched.email && formik.errors.email ? formik.errors.email : "Email"} <span
                                className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   name="email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/*select role*/}
                    <div className="flex flex-col w-full">
                        <label
                            className={"text-[16px] text-gray-600 "}>
                            { "Selectionner le role"} <span className={"text-red-600"}>*</span>
                        </label>

                        <Select
                            defaultValue={formik.values.role}
                            value={formik.values.role}
                            placeholder=""
                            className={"w-full"}
                            optionFilterProp="children"
                            onChange={(value: string) => {
                                formik.values.role = value;
                            }}

                            options={[
                                {
                                    value: 'ADMIN',
                                    label: 'Administrateur',
                                },
                                {
                                    value: 'GERANT',
                                    label: 'Gerant',
                                },
                                {
                                    value: 'CUSTOMER',
                                    label: 'client',
                                },
                            ]}
                        />
                    </div>

                    {/*passwords */}
                    <div className={"flex items-center justify-between gap-5 content-between"}>
                        <div className="flex flex-col w-full">
                            <label
                                className={formik.touched.passwords && formik.errors.passwords ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.passwords && formik.errors.passwords ? formik.errors.passwords : "Mot de passe"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="password"
                                   className="w-full"
                                   value={formik.values.passwords}
                                   onChange={formik.handleChange}
                                   name="passwords"
                                   minLength={8}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label
                                className={formik.touched.passwordsConfirm && formik.errors.passwordsConfirm ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.passwordsConfirm && formik.errors.passwordsConfirm ? formik.errors.passwordsConfirm : "confirmer le mot de passe"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="password"
                                   className="w-full"
                                   value={formik.values.passwordsConfirm}
                                   onChange={formik.handleChange}
                                   name="passwordsConfirm"
                            />
                        </div>

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