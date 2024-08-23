import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import Image from "next/image";


interface Props {
    data: any[];
}

const ExportCSVButton = ({data}: Props) => {
    const generateCSV = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return <button onClick={generateCSV} className=" rounded-md items-center justify-center flex flex-col gap-2 ">
        <Image src={"/images/csv.png"} width={100} height={100} alt="" className="object-cover " />
        <h1>CSV</h1>
    </button>;
};



const ExportExcelButton = ({data}: Props) => {
    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    return <button onClick={generateExcel} className=" rounded-md items-center justify-center flex flex-col gap-2 ">
        <Image src={"/images/exceller.png"} width={100} height={100} alt="" className="object-cover " />
        <h1>EXCEL</h1>
    </button>;
};


export { ExportExcelButton, ExportCSVButton };


