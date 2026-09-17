
import React, { useState } from "react";

import {
    LayoutDashboard,
    Users,
    UserRound,
    FileText,
    Headphones,
    Settings,
    CircleHelp,
    ChevronUp,
    Menu,
    X,
} from "lucide-react";

import {
    NavLink,
    useLocation,
} from "react-router-dom";


function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
}) {

    const location = useLocation();

    const [isTeamsOpen, setIsTeamsOpen] = useState(false);
    const [isLeadsOpen, setIsLeadsOpen] = useState(false);


    // ==========================================
    // CHECK CURRENT SECTION
    // ==========================================

    const isTeamsActive =
        location.pathname.startsWith("/teams");

    const isLeadsActive =
        location.pathname.startsWith("/leads");


    // ==========================================
    // NORMAL NAVIGATION ITEM
    // ==========================================

    const navItemClass = ({ isActive }) =>
        `
        w-full
        flex
        items-center
        gap-3
        px-3
        py-3
        rounded-lg
        text-sm
        font-medium
        transition-all
        duration-200

        ${
            isActive
                ? "bg-primary text-white"
                : "text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text"
        }
        `;


    // ==========================================
    // PARENT BUTTON
    // ==========================================

    const parentButtonClass = (isActive) =>
        `
        w-full
        flex
        items-center
        justify-between
        px-3
        py-3
        rounded-lg
        text-sm
        font-medium
        transition-all
        duration-200

        ${
            isActive
                ? "bg-primary text-white"
                : "text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text"
        }
        `;


    return (
        <>
            {/* ==========================================
                MOBILE TOP BAR
            ========================================== */}

            <div
                className="
                    fixed
                    top-0
                    left-0
                    right-0
                    z-50
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    bg-theme-surface
                    lg:hidden
                "
            >

                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="
                        p-2
                        rounded-lg
                        text-theme-text
                        hover:bg-theme-surface-secondary
                        transition
                    "
                >
                    <Menu size={22} />
                </button>


                <span
                    className="
                        text-lg
                        font-bold
                        text-theme-text
                    "
                >
                    GrowthPulse
                </span>


                <div className="w-10" />

            </div>


            {/* ==========================================
                SIDEBAR
            ========================================== */}

            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    z-50
                    h-screen
                    w-[240px]
                    bg-theme-surface
                    transition-transform
                    duration-300
                    ease-in-out

                    ${
                        isSidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                {/* ==========================================
                    SIDEBAR HEADER
                ========================================== */}

                <div
                    className="
                        h-[66px]
                        flex
                        items-center
                        justify-between
                        px-5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <div
                            className="
                                w-9
                                h-9
                                rounded-lg
                                bg-primary
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                            "
                        >
                            G
                        </div>


                        <span
                            className="
                                text-lg
                                font-bold
                                text-theme-text
                            "
                        >
                            GrowthPulse
                        </span>

                    </div>


                    {/* Mobile close button */}

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="
                            p-2
                            rounded-lg
                            text-theme-text-secondary
                            hover:bg-theme-surface-secondary
                            lg:hidden
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* ==========================================
                    MAIN NAVIGATION
                ========================================== */}

                <nav
                    className="
                        flex
                        flex-col
                        px-3
                        py-4
                        gap-1
                    "
                >

                    {/* ==========================================
                        DASHBOARD
                    ========================================== */}

                    <NavLink
                        to="/dashboard"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={navItemClass}
                    >

                        <LayoutDashboard size={20} />

                        <span>
                            Dashboard
                        </span>

                    </NavLink>


                    {/* ==========================================
                        TEAMS
                    ========================================== */}

                    <div>

                        <button
                            type="button"
                            onClick={() =>
                                setIsTeamsOpen(!isTeamsOpen)
                            }
                            className={parentButtonClass(
                                isTeamsActive
                            )}
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Users size={20} />

                                <span>
                                    Teams
                                </span>

                            </div>


                            {/* Arrow only when submenu is open */}

                            {isTeamsOpen && (
                                <ChevronUp size={18} />
                            )}

                        </button>


                        {/* ==========================================
                            TEAMS SUBMENU
                        ========================================== */}

                        {isTeamsOpen && (
                            <div
                                className="
                                    ml-4
                                    mt-2
                                    pl-3
                                    border-l
                                    border-theme-border
                                    space-y-1
                                "
                            >

                                {/* Teams */}

                                <NavLink
                                    to="/teams"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <Users size={17} />

                                    <span>
                                        Teams
                                    </span>

                                </NavLink>


                                {/* Team Members */}

                                <NavLink
                                    to="/teams/members"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <UserRound size={17} />

                                    <span>
                                        Team Members
                                    </span>

                                </NavLink>


                                {/* Team Performance */}

                                <NavLink
                                    to="/teams/performance"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <FileText size={17} />

                                    <span>
                                        Team Performance
                                    </span>

                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* ==========================================
                        LEADS
                    ========================================== */}

                    <div>

                        <button
                            type="button"
                            onClick={() =>
                                setIsLeadsOpen(!isLeadsOpen)
                            }
                            className={parentButtonClass(
                                isLeadsActive
                            )}
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <UserRound size={20} />

                                <span>
                                    Leads
                                </span>

                            </div>


                            {/* Arrow only when submenu is open */}

                            {isLeadsOpen && (
                                <ChevronUp size={18} />
                            )}

                        </button>


                        {/* ==========================================
                            LEADS SUBMENU
                        ========================================== */}

                        {isLeadsOpen && (
                            <div
                                className="
                                    ml-4
                                    mt-2
                                    pl-3
                                    border-l
                                    border-theme-border
                                    space-y-1
                                "
                            >

                                {/* All Leads */}

                                <NavLink
                                    to="/leads"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <FileText size={17} />

                                    <span>
                                        All Leads
                                    </span>

                                </NavLink>


                                {/* Assigned Leads */}

                                <NavLink
                                    to="/leads/assigned"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <Users size={17} />

                                    <span>
                                        Assigned Leads
                                    </span>

                                </NavLink>


                                {/* Lead Details */}

                                <NavLink
                                    to="/leads/details"
                                    end
                                    onClick={() =>
                                        setIsSidebarOpen(false)
                                    }
                                    className={navItemClass}
                                >

                                    <UserRound size={17} />

                                    <span>
                                        Lead Details
                                    </span>

                                </NavLink>

                            </div>
                        )}

                    </div>


                    {/* ==========================================
                        INVOICES
                    ========================================== */}

                    <NavLink
                        to="/invoice"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={navItemClass}
                    >

                        <FileText size={20} />

                        <span>
                            Invoices
                        </span>

                    </NavLink>


                    {/* ==========================================
                        SUPPORT TICKETS
                    ========================================== */}

                    <NavLink
                        to="/support-tickets"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={navItemClass}
                    >

                        <Headphones size={20} />

                        <span>
                            Support Tickets
                        </span>

                    </NavLink>

                </nav>


                {/* ==========================================
                    BOTTOM NAVIGATION
                ========================================== */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        px-3
                        py-4
                        space-y-1
                    "
                >

                    {/* ==========================================
                        SETTINGS
                    ========================================== */}

                    <NavLink
                        to="/settings"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={navItemClass}
                    >

                        <Settings size={20} />

                        <span>
                            Settings
                        </span>

                    </NavLink>


                    {/* ==========================================
                        HELP & SUPPORT
                    ========================================== */}

                    <NavLink
                        to="/help-support"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={navItemClass}
                    >

                        <CircleHelp size={20} />

                        <span>
                            Help & Support
                        </span>

                    </NavLink>

                </div>

            </aside>
        </>
    );
}


export default Sidebar;

