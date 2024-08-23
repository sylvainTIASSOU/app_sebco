import Image from "next/image";
import Slider from "@/app/(pages)/components/Slider";
import CoverPageArticle from "@/app/(pages)/components/CoverPageArticles";
import CoverPageCategory from "@/app/(pages)/components/CoverPageCategory";
import InfoSlide from "@/app/(pages)/components/InfoSlide";
import PromotionComp from "@/app/(pages)/components/PromotionComp";
import Info2Slide from "@/app/(pages)/components/Info2Slide";
import CommentComp from "@/app/(pages)/components/CommentComp";

export default function Home() {
  return (
    <main className="flex  flex-col gap-10 pb-20  ">

        <Slider/>

        <CoverPageArticle/>

        <InfoSlide/>

        <CoverPageCategory/>

        <PromotionComp/>

        <Info2Slide/>

        <CommentComp/>

    </main>
  );
}
