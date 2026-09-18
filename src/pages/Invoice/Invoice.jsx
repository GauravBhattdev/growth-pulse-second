import React, { useMemo, useState } from "react";

import {
    FileText,
    Check,
    Clock,
    AlertCircle,
    Search,
    Filter,
    Eye,
    Download,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const initialInvoices = [
    { id: "#INV-1024", client: "TechCorp",   issueDate: "12 May 2026", dueDate: "12 May 2026", amount: "₹45,000", status: "Paid" },
    { id: "#INV-1025", client: "Nova Ltd",   issueDate: "15 May 2026", dueDate: "12 May 2026", amount: "₹72,000", status: "Pending" },
    { id: "#INV-1026", client: "DesignHub",  issueDate: "18 May 2026", dueDate: "02 Jun 2026", amount: "₹38,000", status: "Overdue" },
    { id: "#INV-1027", client: "BuildX",     issueDate: "20 May 2026", dueDate: "04 Jun 2026", amount: "₹55,000", status: "Paid" },
    { id: "#INV-1028", client: "BrightSoft", issueDate: "22 May 2026", dueDate: "06 Jun 2026", amount: "₹20,000", status: "Pending" },
];


function Invoice() {
    const navigate = useNavigate();

    const [invoiceList, setInvoiceList] = useState(initialInvoices);
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [openMoreMenu, setOpenMoreMenu] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);


    const convertToDate = (dateString) => {
        if (!dateString) return "";

        const [day, month, year] = dateString.split(" ");

        const months = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04",
            May: "05", Jun: "06", Jul: "07", Aug: "08",
            Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };

        return `${year}-${months[month]}-${day.padStart(2, "0")}`;
    };


    const filteredInvoices = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return invoiceList.filter((invoice) => {
            const matchesSearch =
                !search ||
                invoice.id.toLowerCase().includes(search) ||
                invoice.client.toLowerCase().includes(search) ||
                invoice.amount.toLowerCase().includes(search) ||
                invoice.status.toLowerCase().includes(search) ||
                invoice.issueDate.toLowerCase().includes(search) ||
                invoice.dueDate.toLowerCase().includes(search);

            const invoiceDate = convertToDate(invoice.issueDate);
            const matchesFromDate = !fromDate || invoiceDate >= fromDate;
            const matchesToDate = !toDate || invoiceDate <= toDate;

            const matchesStatus =
                statusFilter === "All" || invoice.status === statusFilter;

            return matchesSearch && matchesFromDate && matchesToDate && matchesStatus;
        });
    }, [invoiceList, searchTerm, fromDate, toDate, statusFilter]);


    const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentInvoices = filteredInvoices.slice(startIndex, endIndex);


    const handleClearFilters = () => {
        setSearchTerm("");
        setFromDate("");
        setToDate("");
        setStatusFilter("All");
        setCurrentPage(1);
    };


    const handleDownloadInvoice = (invoice) => {
        const csvContent =
            `Invoice,Client,Issue Date,Due Date,Amount,Status\n` +
            `"${invoice.id}","${invoice.client}","${invoice.issueDate}","${invoice.dueDate}","${invoice.amount}","${invoice.status}"`;

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${invoice.id.replace("#", "")}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setOpenMoreMenu(null);
    };


    const handleDeleteInvoice = (invoice) => {
        if (!window.confirm(`Delete ${invoice.id}?`)) return;

        setInvoiceList((prev) => prev.filter((item) => item.id !== invoice.id));
        setOpenMoreMenu(null);
        alert(`${invoice.id} deleted`);
    };


    const handleMoreAction = (action, invoice) => {
        setOpenMoreMenu(null);

        if (action === "view") handleViewInvoice(invoice);
        if (action === "download") handleDownloadInvoice(invoice);
        if (action === "delete") handleDeleteInvoice(invoice);
    };


    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    return (
        <div className="w-full bg-theme-page text-theme-text px-3 sm:px-4 lg:px-5 py-4 sm:py-5 transition-colors duration-300">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-theme-text">
                        Invoice
                    </h1>

                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Manage and track all your invoices
                    </p>
                </div>


                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                        onClick={() => alert("Import Invoice clicked")}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text text-sm font-medium transition hover:bg-theme-surface-secondary"
                    >
                        Import Invoice
                    </button>

                    <button
                        onClick={() => navigate("/create-invoice")}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium transition hover:bg-primary-hover"
                    >
                        + Create Invoice
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SummaryCard
                    label="Total Invoices"
                    value={invoiceList.length}
                    icon={FileText}
                    iconBg="bg-purple-100 dark:bg-purple-500/10"
                    iconColor="text-primary"
                />

                <SummaryCard
                    label="Paid"
                    value={invoiceList.filter((i) => i.status === "Paid").length}
                    sub="₹8,45,000"
                    icon={Check}
                    iconBg="bg-green-100 dark:bg-green-500/10"
                    iconColor="text-green-600 dark:text-green-400"
                />

                <SummaryCard
                    label="Pending"
                    value={invoiceList.filter((i) => i.status === "Pending").length}
                    sub="₹3,20,000"
                    icon={Clock}
                    iconBg="bg-orange-100 dark:bg-orange-500/10"
                    iconColor="text-orange-500 dark:text-orange-400"
                />

                <SummaryCard
                    label="Overdue"
                    value={invoiceList.filter((i) => i.status === "Overdue").length}
                    sub="₹1,15,000"
                    icon={AlertCircle}
                    iconBg="bg-red-100 dark:bg-red-500/10"
                    iconColor="text-red-500 dark:text-red-400"
                />
            </div>


            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

                <div className="relative w-full lg:w-[320px]">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted"
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Invoice"
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text placeholder:text-theme-text-muted outline-none text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>


                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text text-sm outline-none focus:border-primary"
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text text-sm outline-none focus:border-primary"
                    />

                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-4 h-10 rounded-lg border text-sm transition ${
                            showFilter
                                ? "border-primary bg-purple-100 text-primary dark:bg-purple-500/10"
                                : "border-theme-border-light bg-theme-surface text-theme-text-secondary hover:bg-theme-surface-secondary"
                        }`}
                    >
                        <Filter size={16} />
                        Filter
                        <ChevronDown
                            size={15}
                            className={`transition-transform ${showFilter ? "rotate-180" : ""}`}
                        />
                    </button>

                    {(searchTerm || fromDate || toDate || statusFilter !== "All") && (
                        <button
                            onClick={handleClearFilters}
                            className="h-10 px-3 rounded-lg text-sm text-primary hover:bg-purple-100 dark:hover:bg-purple-500/10 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>


            {showFilter && (
                <div className="mb-5 p-4 bg-theme-surface border border-theme-border-light rounded-xl shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-theme-text">
                                Filter Invoices
                            </h3>

                            <p className="mt-1 text-xs text-theme-text-secondary">
                                Filter invoices by payment status
                            </p>
                        </div>


                        <div className="flex flex-wrap gap-2">
                            {["All", "Paid", "Pending", "Overdue"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setStatusFilter(status);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition ${
                                        statusFilter === status
                                            ? "bg-primary border-primary text-white"
                                            : "bg-theme-surface border-theme-border-light text-theme-text-secondary hover:bg-theme-surface-secondary"
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-theme-text-secondary">
                    {filteredInvoices.length} invoice
                    {filteredInvoices.length !== 1 ? "s" : ""} found
                </p>

                {statusFilter !== "All" && (
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-primary dark:bg-purple-500/10">
                        Status: {statusFilter}
                    </span>
                )}
            </div>


            <div className="w-full overflow-x-auto border border-theme-border-light rounded-xl bg-theme-surface">
                <table className="w-full min-w-[900px]">
                    <thead className="bg-purple-100 dark:bg-purple-500/10">
                        <tr>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Issue Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead center>Action</TableHead>
                        </tr>
                    </thead>


                    <tbody>
                        {currentInvoices.length > 0 ? (
                            currentInvoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="border-t border-theme-border-light hover:bg-theme-surface-secondary transition"
                                >
                                    <td className="px-5 py-4 text-sm font-medium text-theme-text">
                                        {invoice.id}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {invoice.client}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {invoice.issueDate}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-theme-text-secondary">
                                        {invoice.dueDate}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-theme-text">
                                        {invoice.amount}
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={invoice.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <IconButton
                                                title="View"
                                                onClick={() => handleViewInvoice(invoice)}
                                                icon={Eye}
                                            />

                                            <IconButton
                                                title="Download"
                                                onClick={() => handleDownloadInvoice(invoice)}
                                                icon={Download}
                                            />

                                            <div className="relative">
                                                <IconButton
                                                    title="More"
                                                    onClick={() =>
                                                        setOpenMoreMenu(
                                                            openMoreMenu === invoice.id
                                                                ? null
                                                                : invoice.id
                                                        )
                                                    }
                                                    icon={MoreVertical}
                                                />

                                                {openMoreMenu === invoice.id && (
                                                    <div className="absolute right-0 top-10 z-30 w-36 bg-theme-surface border border-theme-border-light rounded-lg shadow-xl overflow-hidden">
                                                        <button
                                                            onClick={() => handleMoreAction("view", invoice)}
                                                            className="w-full px-3 py-2 text-left text-xs text-theme-text hover:bg-theme-surface-secondary"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoreAction("download", invoice)}
                                                            className="w-full px-3 py-2 text-left text-xs text-theme-text hover:bg-theme-surface-secondary"
                                                        >
                                                            Download
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoreAction("delete", invoice)}
                                                            className="w-full px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-5 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <FileText size={36} className="text-theme-text-muted mb-3" />

                                        <p className="text-sm font-medium text-theme-text">
                                            No invoices found
                                        </p>

                                        <p className="mt-1 text-xs text-theme-text-secondary">
                                            Try changing your search or filters.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5">
                <p className="text-sm text-theme-text-secondary">
                    {filteredInvoices.length === 0
                        ? "Showing 0 results"
                        : `Showing ${startIndex + 1} to ${Math.min(
                              endIndex,
                              filteredInvoices.length
                          )} of ${filteredInvoices.length} results`}
                </p>


                <div className="flex items-center gap-2 flex-wrap">
                    <PaginationNavBtn
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1 || filteredInvoices.length === 0}
                        icon={ChevronLeft}
                    />


                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm transition ${
                                currentPage === page
                                    ? "bg-primary text-white"
                                    : "border border-theme-border-light bg-theme-surface text-theme-text-secondary hover:bg-theme-surface-secondary"
                            }`}
                        >
                            {page}
                        </button>
                    ))}


                    <PaginationNavBtn
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || filteredInvoices.length === 0}
                        icon={ChevronRight}
                    />


                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="ml-2 h-8 px-2 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text-secondary text-sm outline-none focus:border-primary"
                    >
                        <option value="2">2/Page</option>
                        <option value="5">5/Page</option>
                        <option value="10">10/Page</option>
                        <option value="20">20/Page</option>
                    </select>
                </div>
            </div>


            {selectedInvoice && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setSelectedInvoice(null)}
                >
                    <div
                        className="w-full max-w-md bg-theme-surface border border-theme-border-light rounded-xl shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-semibold text-theme-text">
                                    Invoice Details
                                </h2>

                                <p className="mt-1 text-xs text-theme-text-secondary">
                                    {selectedInvoice.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-text-secondary hover:bg-theme-surface-secondary"
                            >
                                <X size={18} />
                            </button>
                        </div>


                        <div className="space-y-4">
                            <DetailRow label="Client" value={selectedInvoice.client} />
                            <DetailRow label="Issue Date" value={selectedInvoice.issueDate} />
                            <DetailRow label="Due Date" value={selectedInvoice.dueDate} />
                            <DetailRow label="Amount" value={selectedInvoice.amount} bold />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-theme-text-secondary">Status</span>
                                <StatusBadge status={selectedInvoice.status} />
                            </div>
                        </div>


                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => handleDownloadInvoice(selectedInvoice)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-theme-border-light bg-theme-surface text-theme-text text-sm hover:bg-theme-surface-secondary"
                            >
                                <Download size={16} />
                                Download
                            </button>

                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-hover"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


function SummaryCard({ label, value, sub, icon: Icon, iconBg, iconColor }) {
    return (
        <div className="bg-theme-surface border border-theme-border-light rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-theme-text-secondary">{label}</p>

                    <h2 className="mt-2 text-2xl font-semibold text-theme-text">
                        {value}
                    </h2>

                    {sub && (
                        <p className="mt-1 text-xs text-theme-text-secondary">{sub}</p>
                    )}
                </div>

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <Icon size={20} className={iconColor} />
                </div>
            </div>
        </div>
    );
}


function StatusBadge({ status }) {
    const cls =
        status === "Paid"
            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
            : status === "Pending"
              ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
            {status}
        </span>
    );
}


function TableHead({ children, center }) {
    return (
        <th
            className={`px-5 py-4 text-xs font-semibold text-theme-text-secondary ${
                center ? "text-center" : "text-left"
            }`}
        >
            {children}
        </th>
    );
}


function IconButton({ icon: Icon, onClick, title }) {
    return (
        <button
            onClick={onClick}
            title={title}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-text-secondary hover:bg-purple-100 hover:text-primary dark:hover:bg-purple-500/10 transition"
        >
            <Icon size={17} />
        </button>
    );
}


function PaginationNavBtn({ onClick, disabled, icon: Icon }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-8 h-8 rounded-lg border border-theme-border-light bg-theme-surface flex items-center justify-center text-theme-text-secondary hover:bg-theme-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
            <Icon size={16} />
        </button>
    );
}


function DetailRow({ label, value, bold }) {
    return (
        <div className="flex items-center justify-between border-b border-theme-border-light pb-3">
            <span className="text-sm text-theme-text-secondary">{label}</span>

            <span className={`text-sm text-theme-text ${bold ? "font-semibold" : ""}`}>
                {value}
            </span>
        </div>
    );
}


export default Invoice;