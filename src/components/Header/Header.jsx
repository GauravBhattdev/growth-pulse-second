import React from "react";

import {
    Menu,
    Sun,
    Moon,
    Bell,
    UserRound,
    ChevronDown,
} from "lucide-react";

function Header({
    onMenuClick,
    theme,
    setTheme,
}) {
    const handleThemeToggle = () => {
        setTheme(
            theme === "dark"
                ? "light"
                : "dark"
        );
    };

    return (
        <header className="relative z-30 min-h-[66px] w-full bg-theme-surface flex items-center justify-between px-3 sm:px-4 md:px-6 transition-colors duration-300">

            <button
                type="button"
                onClick={onMenuClick}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text transition-colors duration-200"
            >
                <Menu size={22} />
            </button>

            <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-5">

                <button
                    type="button"
                    onClick={handleThemeToggle}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text transition-all duration-200 active:scale-95"
                    title={
                        theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {theme === "dark" ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

                <button
                    type="button"
                    className="relative w-9 h-9 flex items-center justify-center rounded-lg text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text transition-colors duration-200"
                    title="Notifications"
                >
                    <Bell size={20} />

                    <span className="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-red-500" />
                </button>

                <button
                    type="button"
                    className="flex items-center gap-2 px-2 py-1 rounded-lg text-theme-text hover:bg-theme-surface-secondary transition-colors duration-200"
                >
                    <div className="w-9 h-9 rounded-full bg-theme-surface-secondary border border-theme-border flex items-center justify-center">
                        <UserRound size={19} />
                    </div>

                    <span className="hidden sm:block text-sm font-semibold">
                        Admin
                    </span>

                    <ChevronDown
                        size={17}
                        className="hidden sm:block"
                    />
                </button>

            </div>

        </header>
    );
}

export default Header;