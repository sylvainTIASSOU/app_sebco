"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/stockModule/ProductModel";
import {Input} from "antd";
import {Api} from "@/app/api/Api";

const SeachComp = () => {
    const [data, setData] = useState<ProductModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ProductModel[]>([]);
    const [actif, setActif] = useState(false);
    const {Search} = Input;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        Api.read('/api/article').then((data) => {
            setData(data)
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**fonction of search */
    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setActif(false)
            setQuery('');
            setResults([]);
        }
    };

    return (
        <div className={''}>
            <Search
                placeholder="Recherche d'un produit"
                allowClear
                size={"large"}
                className={"w-[20rem] "}
                value={query}
                onChange={handleChange}

            />

            <div
                className={`${actif ? 'block bg-white w-[20rem] p-5 rounded-[10px] h-auto mt-3 absolute' : 'hidden'} `}>
                <div className={"flex flex-col w-full space-y-5"}>
                    {results.map((result, index) => (

                        <Link key={index}
                              className={" bg-blue-400 hover:bg-blue-600 text-white rounded-lg w-full p-1"}
                              href={`/edit-product/${result.id}`}>
                            {result.name}
                        </Link>


                    ))}
                </div>
            </div>
        </div>
    );
}
export default SeachComp;