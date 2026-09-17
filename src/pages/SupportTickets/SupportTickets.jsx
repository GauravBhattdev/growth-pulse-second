import React from "react";

import {
    Headphones,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";


function SupportTickets() {

    const summary = [
        {
            title: "Total Tickets",
            value: "48",
            icon: Headphones,
        },
        {
            title: "Open",
            value: "18",
            icon: AlertCircle,
        },
        {
            title: "In Progress",
            value: "12",
            icon: Clock,
        },
        {
            title: "Resolved",
            value: "18",
            icon: CheckCircle,
        },
    ];


    const tickets = [
        {
            id: "TKT-1001",
            subject: "Unable to login",
            customer: "Acme Corporation",
            priority: "High",
            status: "Open",
            date: "15 Sep 2026",
        },
        {
            id: "TKT-1002",
            subject: "Invoice download issue",
            customer: "Tech Solutions",
            priority: "Medium",
            status: "In Progress",
            date: "14 Sep 2026",
        },
        {
            id: "TKT-1003",
            subject: "Account update request",
            customer: "Global Industries",
            priority: "Low",
            status: "Resolved",
            date: "13 Sep 2026",
        },
        {
            id: "TKT-1004",
            subject: "Payment not reflected",
            customer: "Bright Digital",
            priority: "High",
            status: "Open",
            date: "12 Sep 2026",
        },
        {
            id: "TKT-1005",
            subject: "Unable to update profile",
            customer: "NextGen Systems",
            priority: "Medium",
            status: "In Progress",
            date: "11 Sep 2026",
        },
    ];


    return (

        <div className="space-y-6">

            {/* PAGE HEADER */}

            <div>

                <h1 className="text-2xl font-bold text-theme-text">
                    Support Tickets
                </h1>

                <p className="mt-1 text-sm text-theme-text-secondary">
                    Manage customer support requests and tickets.
                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {summary.map((item) => {

                    const Icon = item.icon;


                    return (

                        <div
                            key={item.title}
                            className="
                                bg-theme-surface
                                border
                                border-theme-border
                                rounded-xl
                                p-5

                                transition-all
                                duration-200

                                hover:-translate-y-1
                                hover:shadow-md
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-theme-text-secondary">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-theme-text">
                                        {item.value}
                                    </h2>

                                </div>


                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-lg

                                        bg-primary/10
                                        text-primary

                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Icon size={22} />

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* TICKETS TABLE */}

            <div
                className="
                    bg-theme-surface
                    border
                    border-theme-border
                    rounded-xl
                    overflow-hidden
                "
            >

                <div className="px-5 py-4 border-b border-theme-border">

                    <h2 className="text-lg font-semibold text-theme-text">
                        Recent Tickets
                    </h2>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="bg-theme-surface-secondary">

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Ticket ID
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Subject
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Customer
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Priority
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Status
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {tickets.map((ticket) => (

                                <tr
                                    key={ticket.id}
                                    className="
                                        border-t
                                        border-theme-border
                                        hover:bg-theme-surface-secondary
                                        transition-colors
                                        duration-200
                                    "
                                >

                                    <td className="px-5 py-4 text-sm font-medium text-theme-text">
                                        {ticket.id}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text">
                                        {ticket.subject}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {ticket.customer}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                inline-flex
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold

                                                ${
                                                    ticket.priority === "High"
                                                        ? "bg-red-100 text-red-700"
                                                        : ticket.priority === "Medium"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-green-100 text-green-700"
                                                }
                                            `}
                                        >
                                            {ticket.priority}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                inline-flex
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold

                                                ${
                                                    ticket.status === "Resolved"
                                                        ? "bg-green-100 text-green-700"
                                                        : ticket.status === "In Progress"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {ticket.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {ticket.date}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


export default SupportTickets;