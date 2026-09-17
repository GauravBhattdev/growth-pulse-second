import React, { useMemo, useState } from "react";

import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { assignedLeadsData } from "../../data/assignedLeadsData";


function AssignedLeads() {

    const [searchTerm, setSearchTerm] = useState("");
    const [teamFilter, setTeamFilter] = useState("All Teams");
    const [assigneeFilter, setAssigneeFilter] = useState("All Assignees");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const filteredLeads = useMemo(() => {
        return assignedLeadsData.filter((lead) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                lead.name.toLowerCase().includes(search) ||
                lead.company.toLowerCase().includes(search) ||
                lead.assignedTo.toLowerCase().includes(search);

            const matchesTeam =
                teamFilter === "All Teams" ||
                lead.team === teamFilter;

            const matchesAssignee =
                assigneeFilter === "All Assignees" ||
                lead.assignedTo === assigneeFilter;

            const matchesStatus =
                statusFilter === "All Status" ||
                lead.status === statusFilter;

            return matchesSearch && matchesTeam && matchesAssignee && matchesStatus;
        });
    }, [searchTerm, teamFilter, assigneeFilter, statusFilter]);


    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredLeads.length);
    const currentLeads = filteredLeads.slice(startIndex, endIndex);


    const handleSearch = (v) => { setSearchTerm(v); setCurrentPage(1); };
    const handleTeamChange = (v) => { setTeamFilter(v); setCurrentPage(1); };
    const handleAssigneeChange = (v) => { setAssigneeFilter(v); setCurrentPage(1); };
    const handleStatusChange = (v) => { setStatusFilter(v); setCurrentPage(1); };


    const getInitials = (name) =>
        name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();


    const getStatusClass = (status) => {
        if (status === "Converted") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        if (status === "Contacted") return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        if (status === "Follow Up") return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        return "bg-purple-100 text-purple-700 dark:bg-primary/10 dark:text-primary";
    };


    const getPaginationPages = (currentPage, totalPages) => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

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

            {/* HEADER */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-theme-text">Assigned Leads</h1>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                        View and manage leads assigned to your team members and leaders.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover hover:-translate-y-0.5"
                >
                    <Plus size={17} />
                    Assigned Leads
                </button>
            </div>


            {/* FILTERS */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-3 shadow-sm">
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] xl:items-center">

                    <div className="relative">
                        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by name, company or email"
                            className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface pl-9 pr-3 text-sm text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>


                    <select value={teamFilter} onChange={(e) => handleTeamChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option>All Teams</option>
                        <option>Sales Team</option>
                        <option>Marketing Team</option>
                        <option>Support Team</option>
                        <option>Customer Success</option>
                        <option>Design Team</option>
                        <option>Product Team</option>
                        <option>Finance Team</option>
                        <option>Development Team</option>
                    </select>


                    <select value={assigneeFilter} onChange={(e) => handleAssigneeChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option>All Assignees</option>
                        <option>Rahul Mehta</option>
                        <option>Priya Sharma</option>
                        <option>Ankit Verma</option>
                        <option>Nisha Verma</option>
                        <option>Karan Joshi</option>
                        <option>Rohit Gupta</option>
                        <option>Amit Sharma</option>
                        <option>Neha Kapoor</option>
                    </select>


                    <select value={statusFilter} onChange={(e) => handleStatusChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option>All Status</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Follow Up</option>
                        <option>Converted</option>
                    </select>

                </div>
            </div>


            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">

                        <thead>
                            <tr className="bg-primary/10">
                                <TableHeader>Lead Name</TableHeader>
                                <TableHeader>Company</TableHeader>
                                <TableHeader>Assigned To</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Next Follow Up</TableHeader>
                                <TableHeader align="center">Action</TableHeader>
                            </tr>
                        </thead>


                        <tbody>
                            {currentLeads.length > 0 ? (
                                currentLeads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-theme-border last:border-b-0 transition hover:bg-theme-surface-secondary">

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                    {getInitials(lead.name)}
                                                </div>

                                                <div>
                                                    <p className="whitespace-nowrap text-sm font-semibold text-theme-text">
                                                        {lead.name}
                                                    </p>
                                                    <p className="text-xs text-theme-text-muted">
                                                        Lead #{lead.id.toString().padStart(3, "0")}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-4 text-sm text-theme-text-secondary">
                                            {lead.company}
                                        </td>


                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                    {getInitials(lead.assignedTo)}
                                                </div>

                                                <div>
                                                    <p className="whitespace-nowrap text-sm font-medium text-theme-text">
                                                        {lead.assignedTo}
                                                    </p>
                                                    <p className="text-xs text-theme-text-muted">
                                                        {lead.team}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-theme-text-secondary">
                                            {lead.nextFollowUp}
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
                                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-theme-text-secondary">
                                        No assigned leads found.
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
                        {" "}leads
                    </p>


                    <div className="flex items-center gap-1">

                        <PaginationNavBtn
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
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
                            onClick={() => setCurrentPage((p) => p + 1)}
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


export default AssignedLeads;