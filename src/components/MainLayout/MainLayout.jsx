import React, {
    useEffect,
    useState,
} from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";


function MainLayout({ children }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    

    const [theme, setTheme] = useState("light");


    useEffect(() => {

        const root = document.documentElement;

        root.classList.remove("light", "dark");

        root.classList.add(theme);

    }, [theme]);


    return (

        <div className="min-h-screen bg-theme-page text-theme-text transition-colors duration-300">
<Sidebar
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
/>


            <div
                className={`
                    min-h-screen
                    transition-all
                    duration-300
                     lg:ml-[240px]
                `}
            >

                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                    theme={theme}
                    setTheme={setTheme}
                />


                <main className="p-4 sm:p-5 lg:p-6">

                    {children}

                </main>

            </div>


            {isSidebarOpen && (

                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />

            )}

        </div>

    );

}


export default MainLayout;