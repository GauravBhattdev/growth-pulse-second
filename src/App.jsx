import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


import MainLayout
    from "./components/MainLayout/MainLayout";


import Dashboard
    from "./pages/Dashboard/Dashboard";

import Teams
    from "./pages/Teams/Teams";

import TeamMembers
    from "./pages/TeamMembers/TeamMembers";

import TeamPerformance
    from "./pages/TeamPerformance/TeamPerformance";

import Leads
    from "./pages/Leads/Leads";

import AssignedLeads
    from "./pages/AssignedLeads/AssignedLeads";

import LeadDetails
    from "./pages/LeadDetails/LeadDetails";

import Invoice
    from "./pages/Invoice/Invoice";

import CreateInvoice
    from "./pages/CreateInvoice/CreateInvoice";

import SupportTickets
    from "./pages/SupportTickets/SupportTickets";

import Settings
    from "./pages/Settings/Settings";

import HelpSupport
    from "./pages/HelpSupport/HelpSupport";


function App() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    {/* DEFAULT */}

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />


                    {/* ========================= */}
                    {/* DASHBOARD */}
                    {/* ========================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard />
                        }
                    />


                    {/* ========================= */}
                    {/* TEAMS */}
                    {/* ========================= */}

                    <Route
                        path="/teams"
                        element={
                            <Teams />
                        }
                    />

                    <Route
                        path="/teams/members"
                        element={
                            <TeamMembers />
                        }
                    />

                    <Route
                        path="/teams/performance"
                        element={
                            <TeamPerformance />
                        }
                    />


                    {/* ========================= */}
                    {/* LEADS */}
                    {/* ========================= */}

                    <Route
                        path="/leads"
                        element={
                            <Leads />
                        }
                    />

                    <Route
                        path="/leads/assigned"
                        element={
                            <AssignedLeads />
                        }
                    />

                    <Route
                        path="/leads/details"
                        element={
                            <LeadDetails />
                        }
                    />


                    {/* ========================= */}
                    {/* INVOICE */}
                    {/* ========================= */}

                    <Route
                        path="/invoice"
                        element={
                            <Invoice />
                        }
                    />

                    <Route
                        path="/create-invoice"
                        element={
                            <CreateInvoice />
                        }
                    />


                    {/* ========================= */}
                    {/* SUPPORT TICKETS */}
                    {/* ========================= */}

                    <Route
                        path="/support-tickets"
                        element={
                            <SupportTickets />
                        }
                    />


                    {/* ========================= */}
                    {/* SETTINGS */}
                    {/* ========================= */}

                    <Route
                        path="/settings"
                        element={
                            <Settings />
                        }
                    />


                    {/* ========================= */}
                    {/* HELP & SUPPORT */}
                    {/* ========================= */}

                    <Route
                        path="/help-support"
                        element={
                            <HelpSupport />
                        }
                    />

                </Routes>

            </MainLayout>

        </BrowserRouter>
    );
}


export default App;