import Footer from "@/app/(pages)/components/Footer";
import Navbar from "@/app/(pages)/components/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return(
        <main className={"overflow-x-hidden hide-scrollbar"}>
            <div className={""}>
                {children}
            </div>
            <Navbar/>
            <Footer/>
        </main>
    )
}