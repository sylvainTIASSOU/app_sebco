"use client";
import {AlignJustify} from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SidbarContent from './SidbarContent';

const SidbarSmScreen = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <AlignJustify className=""/>
            </SheetTrigger>
            <SheetContent side="left" className={"w-[16rem]"}>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <SidbarContent/>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SidbarSmScreen;