

import {Resend} from "resend";

class Resources {

    static formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Notez l'ajout de 1, car les mois sont indexés à partir de zéro
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    static currentDate = new Date();
    static date = Resources.formatDate(Resources.currentDate);




}


export const resend = new Resend('re_CWcnuVwV_C7GCM4bG7xHazmFgtVPKaXRj');

export default Resources;
