import React, { useMemo, useState } from "react";

import {
    Search,
    Plus,
    Users,
    PhoneCall,
    Clock3,
    CheckCircle2,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    TrendingUp,
} from "lucide-react";

import { leadsData } from "../../data/leadsData";


function Leads() {

    const [searchTerm, setSearchTerm] = useState("");
    const [sourceFilter, setSourceFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [assignedFilter, setAssignedFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedLeads, setSelectedLeads] = useState([]);

    const itemsPerPage = 10;


    const filteredLeads = useMemo(() => {
        return leadsData.filter((lead) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                lead.name.toLowerCase().includes(search) ||
                lead.company.toLowerCase().includes(search) ||
                lead.email.toLowerCase().includes(search);

            const matchesSource =
                sourceFilter === "All" ||
                lead.source === sourceFilter;

            const matchesStatus =
                statusFilter === "All" ||
                lead.status === statusFilter;

            const matchesAssigned =
                assignedFilter === "All" ||
                lead.assignedTo === assignedFilter;

            return (
                matchesSearch &&
                matchesSource &&
                matchesStatus &&
                matchesAssigned
            );
        });
    }, [searchTerm, sourceFilter, statusFilter, assignedFilter]);


    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredLeads.length);
    const currentLeads = filteredLeads.slice(startIndex, endIndex);


    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleSourceChange = (value) => {
        setSourceFilter(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleAssignedChange = (value) => {
        setAssignedFilter(value);
        setCurrentPage(1);
    };


    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const pageIds = currentLeads.map((lead) => lead.id);
            setSelectedLeads((prev) => [...new Set([...prev, ...pageIds])]);
        } else {
            const pageIds = currentLeads.map((lead) => lead.id);
            setSelectedLeads((prev) => prev.filter((id) => !pageIds.includes(id)));
        }
    };


    const handleSelectLead = (id) => {
        setSelectedLeads((prev) =>
            prev.includes(id)
                ? prev.filter((leadId) => leadId !== id)
                : [...prev, id]
        );
    };


    const isAllCurrentSelected =
        currentLeads.length > 0 &&
        currentLeads.every((lead) => selectedLeads.includes(lead.id));


    const getInitials = (name) =>
        name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();


    const getSourceClass = (source) => {
        if (source === "Website") return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        if (source === "Referral") return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        if (source === "Social Media") return "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400";
        if (source === "Cold Call") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        return "bg-theme-surface-secondary text-theme-text-secondary";
    };


    const getStatusClass = (status) => {
        if (status === "New") return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        if (status === "Contacted") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        if (status === "Follow Up") return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        if (status === "Qualified") return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        if (status === "In Progress") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";
        if (status === "Converted") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        return "bg-theme-surface-secondary text-theme-text-secondary";
    };


    const getPaginationPages = (currentPage, totalPages) => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [1];

        if (currentPage > 3) pages.push("...");

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("...");

        pages.push(totalPages);

        return pages;
    };


    return (
        <div className="w-full space-y-5">

            {/* PAGE HEADER */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-theme-text">Leads</h1>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Manage and track your leads, assign to team members and follow up for the better conversions.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover hover:-translate-y-0.5"
                >
                    <Plus size={17} />
                    Create Lead
                </button>
            </div>


            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <SummaryCard
                    icon={Users}
                    label="Total Leads"
                    value="248"
                    trend="↑ 12% vs. last month"
                    iconClass="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                />

                <SummaryCard
                    icon={PhoneCall}
                    label="Contacted"
                    value="96"
                    trend="↑ 8% vs. last month"
                    iconClass="bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                />

                <SummaryCard
                    icon={Clock3}
                    label="Follow Up"
                    value="72"
                    trend="↑ 14% vs. last month"
                    iconClass="bg-purple-100 text-purple-600 dark:bg-primary/10 dark:text-primary"
                />

                <SummaryCard
                    icon={CheckCircle2}
                    label="Converted"
                    value="38"
                    trend="↑ 10% vs. last month"
                    iconClass="bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                />

            </div>


            {/* FILTERS */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-3 shadow-sm">
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr] xl:items-center">

                    <div className="relative">
                        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search lead by name..."
                            className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface pl-9 pr-3 text-sm text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>


                    <select
                        value={sourceFilter}
                        onChange={(e) => handleSourceChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary"
                    >
                        <option value="All">Sources</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Cold Call">Cold Call</option>
                    </select>


                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary"
                    >
                        <option value="All">Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Qualified">Qualified</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Converted">Converted</option>
                    </select>


                    <select
                        value={assignedFilter}
                        onChange={(e) => handleAssignedChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary"
                    >
                        <option value="All">Assigned To</option>
                        <option value="Rohit Mehta">Rohit Mehta</option>
                        <option value="Neha Verma">Neha Verma</option>
                        <option value="Amit Singh">Amit Singh</option>
                        <option value="Pooja Sharma">Pooja Sharma</option>
                        <option value="Sahil Khan">Sahil Khan</option>
                    </select>


                    <div className="relative">
                        <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted pointer-events-none" />
                        <input
                            type="text"
                            defaultValue="01 Apr 2025 - 30 Apr 2025"
                            className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface pl-9 pr-3 text-sm text-theme-text outline-none focus:border-primary"
                        />
                    </div>

                </div>
            </div>


            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1200px]">

                        <thead>
                            <tr className="bg-primary/10">

                                <th className="w-12 px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={isAllCurrentSelected}
                                        onChange={handleSelectAll}
                                        className="h-4 w-4 cursor-pointer accent-primary"
                                    />
                                </th>

                                <TableHeader>Lead name</TableHeader>
                                <TableHeader>Company</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Phone</TableHeader>
                                <TableHeader>Source</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Assigned to</TableHeader>
                                <TableHeader>Last Follow Up</TableHeader>
                                <TableHeader align="center">Actions</TableHeader>

                            </tr>
                        </thead>


                        <tbody>
                            {currentLeads.length > 0 ? (
                                currentLeads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="border-b border-theme-border last:border-b-0 transition hover:bg-theme-surface-secondary"
                                    >

                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedLeads.includes(lead.id)}
                                                onChange={() => handleSelectLead(lead.id)}
                                                className="h-4 w-4 cursor-pointer accent-primary"
                                            />
                                        </td>


                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                    {getInitials(lead.name)}
                                                </div>

                                                <span className="whitespace-nowrap text-sm font-semibold text-theme-text">
                                                    {lead.name}
                                                </span>
                                            </div>
                                        </td>


                                        <td className="px-4 py-4 text-sm text-theme-text-secondary whitespace-nowrap">
                                            {lead.company}
                                        </td>


                                        <td className="px-4 py-4 text-sm text-theme-text-secondary whitespace-nowrap">
                                            {lead.email}
                                        </td>


                                        <td className="px-4 py-4 text-sm text-theme-text-secondary whitespace-nowrap">
                                            {lead.phone}
                                        </td>


                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getSourceClass(lead.source)}`}>
                                                {lead.source}
                                            </span>
                                        </td>


                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>


                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                    {getInitials(lead.assignedTo)}
                                                </div>

                                                <div>
                                                    <p className="whitespace-nowrap text-xs font-semibold text-theme-text">
                                                        {lead.assignedTo}
                                                    </p>
                                                    <p className="text-[10px] text-theme-text-muted">
                                                        {lead.assignedRole}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <p className="text-xs font-semibold text-theme-text">{lead.date}</p>
                                            <p className="text-[10px] text-theme-text-muted">{lead.time}</p>
                                        </td>


                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-1.5">

                                                <ActionButton icon={Eye} color="hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10" />
                                                <ActionButton icon={Pencil} color="hover:bg-yellow-50 hover:text-yellow-500 dark:hover:bg-yellow-500/10" />
                                                <ActionButton icon={Trash2} color="hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10" />

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="px-5 py-12 text-center text-sm text-theme-text-secondary">
                                        No leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>


                {/* PAGINATION */}
                <div className="flex flex-col gap-3 border-t border-theme-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-theme-text-secondary">
                        Showing{" "}
                        <span className="font-semibold text-theme-text">
                            {filteredLeads.length === 0 ? 0 : startIndex + 1}–{endIndex}
                        </span>
                        {" "}of{" "}
                        <span className="font-semibold text-theme-text">{filteredLeads.length}</span>
                        {" "}Leads
                    </p>


                    <div className="flex items-center gap-1">

                        <PaginationNavBtn
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        >
                            <ChevronLeft size={15} />
                        </PaginationNavBtn>


                        {getPaginationPages(currentPage, totalPages).map((page, index) =>
                            page === "..." ? (
                                <span key={`dots-${index}`} className="px-1 text-xs text-theme-text-muted">...</span>
                            ) : (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-xs font-medium transition ${
                                        currentPage === page
                                            ? "bg-primary text-white"
                                            : "text-theme-text-secondary hover:bg-theme-surface-secondary"
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        )}


                        <PaginationNavBtn
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        >
                            <ChevronRight size={15} />
                        </PaginationNavBtn>

                    </div>
                </div>
            </div>

        </div>
    );
}


/* ============ SUB COMPONENTS ============ */

function SummaryCard({ icon: Icon, label, value, trend, iconClass }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-theme-border bg-theme-surface px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
                <Icon size={22} />
            </div>

            <div className="flex-1">
                <p className="text-sm font-medium text-theme-text">{label}</p>
                <h2 className="mt-0.5 text-2xl font-bold text-theme-text">{value}</h2>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-green-500">
                    <TrendingUp size={11} />
                    {trend}
                </p>
            </div>
        </div>
    );
}


function TableHeader({ children, align = "left" }) {
    return (
        <th className={`px-4 py-3 text-${align} text-xs font-semibold text-theme-text whitespace-nowrap`}>
            {children}
        </th>
    );
}


function ActionButton({ icon: Icon, color }) {
    return (
        <button
            type="button"
            className={`flex h-7 w-7 items-center justify-center rounded-md border border-theme-border-light text-theme-text-secondary transition ${color}`}
        >
            <Icon size={13} />
        </button>
    );
}


function PaginationNavBtn({ children, disabled, onClick }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="flex h-7 w-7 items-center justify-center rounded-md text-theme-text-secondary transition hover:bg-theme-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
            {children}
        </button>
    );
}


export default Leads;