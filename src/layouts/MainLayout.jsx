import FooterComponent from "../components/FooterComponent.jsx";
import HeaderComponent from "../components/HeaderComponent.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            <HeaderComponent />

            <main className="flex-1">
                <div className="max-w-screen-lg mx-auto px-4 py-10 min-h-[500px] relative">
                    <Outlet/>
                </div>
            </main>

            <FooterComponent/>
        </div>
    )
}
export default MainLayout