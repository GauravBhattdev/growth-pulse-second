import React from "react";

import {
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";


function Invoice() {

    const summary = [
        {
            title: "Total Invoices",
            value: "56",
            icon: FileText,
            description: "All invoices",
        },
        {
            title: "Paid",
            value: "32",
            icon: CheckCircle,
            description: "₹8,45,000",
        },
        {
            title: "Pending",
            value: "18",
            icon: Clock,
            description: "₹3,20,000",
        },
        {
            title: "Overdue",
            value: "6",
            icon: AlertCircle,
            description: "₹1,15,000",
        },
    ];


    const invoices = [
        {
            id: "INV-1001",
            customer: "Acme Corporation",
            date: "12 Sep 2026",
            amount: "₹45,000",
            status: "Paid",
        },
        {
            id: "INV-1002",
            customer: "Tech Solutions",
            date: "10 Sep 2026",
            amount: "₹32,500",
            status: "Pending",
        },
        {
            id: "INV-1003",
            customer: "Global Industries",
            date: "05 Sep 2026",
            amount: "₹75,000",
            status: "Paid",
        },
        {
            id: "INV-1004",
            customer: "Bright Digital",
            date: "01 Sep 2026",
            amount: "₹28,000",
            status: "Overdue",
        },
        {
            id: "INV-1005",
            customer: "NextGen Systems",
            date: "28 Aug 2026",
            amount: "₹52,000",
            status: "Pending",
        },
    ];


    return (

        <div className="space-y-6">

            {/* PAGE HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                    <h1 className="text-2xl font-bold text-theme-text">
                        Invoices
                    </h1>

                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Manage and track all your invoices.
                    </p>

                </div>


                <button
                    type="button"
                    className="
                        px-4
                        py-2.5
                        rounded-lg

                        bg-primary
                        hover:bg-primary-hover

                        text-white
                        text-sm
                        font-semibold

                        transition-colors
                        duration-200
                    "
                >
                    Create Invoice
                </button>

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

                                    <p className="mt-1 text-xs text-theme-text-muted">
                                        {item.description}
                                    </p>

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


            {/* INVOICE TABLE */}

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
                        Recent Invoices
                    </h2>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead>

                            <tr className="bg-theme-surface-secondary">

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Invoice ID
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Customer
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Date
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Amount
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-theme-text-secondary">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {invoices.map((invoice) => (

                                <tr
                                    key={invoice.id}
                                    className="
                                        border-t
                                        border-theme-border
                                        hover:bg-theme-surface-secondary
                                        transition-colors
                                        duration-200
                                    "
                                >

                                    <td className="px-5 py-4 text-sm font-medium text-theme-text">
                                        {invoice.id}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text">
                                        {invoice.customer}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {invoice.date}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-semibold text-theme-text">
                                        {invoice.amount}
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
                                                    invoice.status === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : invoice.status === "Pending"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {invoice.status}
                                        </span>

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


export default Invoice;