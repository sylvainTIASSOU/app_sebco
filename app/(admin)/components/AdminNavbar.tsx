import React from 'react';
import Link from 'next/link';
import {BellPlus, AlignJustify} from 'lucide-react';
import ProfilButton from './ProfilButton';
import SidbarSmScreen from './SidbarSmScreen';

const AdminNavbar = () => {
    return (
        <div className="bg-white fixed top-0 w-full h-12 lg:pl-[18rem] flex items-center px-5 justify-between content-between">
            <div className="flex items-center justify-center gap-5">
                <div className="flex lg:hidden">
                    <SidbarSmScreen/>
                </div>

                <Link className="text-blue-600 font-bold " href="/">Acceuil</Link>

            </div>

            <div className="flex items-center justify-center gap-16">
                <div className="flex items-center rounded-3xl justify-center p-1 bg-black">
                    <BellPlus className="text-white"/>
                </div>
                <ProfilButton/>
            </div>
        </div>
    );
}

export default AdminNavbar;