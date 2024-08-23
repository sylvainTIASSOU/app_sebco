import type { Metadata } from "next";
import {  Playfair_Display } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "SeBcO TOGO",
  description: `Sebco Togo est une plateforme de commerce en ligne dédiée à la vente et à la distribution de matériaux de construction de haute qualité. Spécialisée dans le marché togolais, Sebco Togo propose une large gamme de produits pour répondre aux besoins des professionnels du bâtiment et des particuliers. Grâce à son interface conviviale et à son service client réactif, Sebco Togo s'affirme comme la référence incontournable pour l'achat de matériaux de construction au Togo.` ,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${playfair.className} overflow-x-hidden hide-scrollbar bg-slate-200`}>
        <ReduxProvider>
          <AntdRegistry>
            {children}
            <Toaster/>
          </AntdRegistry>
        </ReduxProvider>

      </body>


    </html>
  );
}
