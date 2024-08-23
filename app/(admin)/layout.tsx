import AdminNavnar from "./components/AdminNavbar";
import Sidbar from "./components/Sidbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
        return (
            <main className="">
                <div className="flex">
                <AdminNavnar />
                    <Sidbar/>
                
                </div>
                

                <div className=" p-2 lg:ml-[18rem] bg-white rounded-[1rem] md:rounded-[4rem] md:my-[5rem] my-[4rem] mx-2 md:mx-[2rem] min-h-screen">
                    {children}
                </div>

                
            </main>
        );
    }