"use client"
import Image from "next/image";
import Slider from "@/app/(pages)/components/Slider";
import CoverPageArticle from "@/app/(pages)/components/CoverPageArticles";
import CoverPageCategory from "@/app/(pages)/components/CoverPageCategory";
import InfoSlide from "@/app/(pages)/components/InfoSlide";
import PromotionComp from "@/app/(pages)/components/PromotionComp";
import Info2Slide from "@/app/(pages)/components/Info2Slide";
import CommentComp from "@/app/(pages)/components/CommentComp";
import { useState, useEffect } from "react";
import DeliveryOnfo from "./components/DeliveryOnfo";
import Partenaires from "./components/Partenaire";

export default function Home() {
  
  const [showAd, setShowAd] = useState(false);
  const [showAdDown, setShowAdDown] = useState(false);

  useEffect(() => {
    // Déclencher l'affichage de la publicité après 5 secondes
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 5000);    // Nettoyer le timer à la fin du cycle de vie du composant
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Déclencher l'affichage de la publicité après 1 minute
    const timer = setTimeout(() => {
      setShowAdDown(true);
    }, 15000);    // Nettoyer le timer à la fin du cycle de vie du composant
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <main className="flex  flex-col gap-10 pb-20  ">
      <DeliveryOnfo open={showAd} setOpen={setShowAd}/>

        <Slider/>

        <CoverPageArticle/>

        <InfoSlide/>

        <CoverPageCategory/>

        <PromotionComp/>

        <Info2Slide/>

        <CommentComp/>

        <Partenaires/>

    </main>
  );
}
