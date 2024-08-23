import SidbarContent from "./SidbarContent";


const Sidbar = () => {
    return (
        <div className="fixed left-0 pt-[5rem] hidden lg:flex top-0 bottom-0 lg:w-[16rem] bg-white justify-center">
            <div className={"overflow-hidden w-full px-5"}>
                <SidbarContent/>
            </div>

        </div>
    );
}

export default Sidbar;