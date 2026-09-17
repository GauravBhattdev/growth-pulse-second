import React, { useMemo, useState } from "react";

import {
    Search,
    Plus,
    Users,
    UserRound,
    UserPlus,
    TrendingUp,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { teamsData } from "../../data/teamsData";


function Teams() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [leaderFilter, setLeaderFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const filteredTeams = useMemo(() => {
        return teamsData.filter((team) => {
            const matchesSearch = team.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());

            const matchesStatus =
                statusFilter === "All" || team.status === statusFilter;

            const matchesLeader =
                leaderFilter === "All" || team.leader === leaderFilter;

            return matchesSearch && matchesStatus && matchesLeader;
        });
    }, [searchTerm, statusFilter, leaderFilter]);


    const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTeams.length);
    const currentTeams = filteredTeams.slice(startIndex, endIndex);

    const leaders = [...new Set(teamsData.map((t) => t.leader))];


    const handleSearch = (v) => { setSearchTerm(v); setCurrentPage(1); };
    const handleStatusChange = (v) => { setStatusFilter(v); setCurrentPage(1); };
    const handleLeaderChange = (v) => { setLeaderFilter(v); setCurrentPage(1); };


    const getPerformanceColor = (p) => {
        if (p >= 85) return "bg-green-500";
        if (p >= 75) return "bg-blue-500";
        return "bg-orange-500";
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
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-theme-text">Teams</h1>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Create and manage your teams, track performance and assign leads.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:-translate-y-0.5"
                >
                    <Plus size={17} />
                    Create Team
                </button>
            </div>


            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    label="Total Teams" value={6} icon={Users}
                    iconBg="bg-blue-100 dark:bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-400"
                />

                <StatCard
                    label="Total Members" value={48} icon={UserRound}
                    iconBg="bg-green-100 dark:bg-green-500/10" iconColor="text-green-600 dark:text-green-400"
                />

                <StatCard
                    label="Active Leads" value={124} icon={UserPlus}
                    iconBg="bg-purple-100 dark:bg-primary/10" iconColor="text-purple-600 dark:text-primary"
                />

                <StatCard
                    label="Avg. Performance" value={10} icon={TrendingUp}
                    iconBg="bg-teal-100 dark:bg-teal-500/10" iconColor="text-teal-600 dark:text-teal-400"
                />

            </div>


            {/* FILTERS */}
            <div className="rounded-lg border border-theme-border bg-theme-surface px-3 py-2.5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div className="relative w-full md:w-[260px]">
                        <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input
                            type="text"
                            placeholder="Search team by name..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="h-9 w-full rounded-md border border-theme-border-light bg-theme-surface pl-8 pr-3 text-xs text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row">

                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="h-9 w-full rounded-md border border-theme-border-light bg-theme-surface px-3 text-xs text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-[150px]"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>


                        <select
                            value={leaderFilter}
                            onChange={(e) => handleLeaderChange(e.target.value)}
                            className="h-9 w-full rounded-md border border-theme-border-light bg-theme-surface px-3 text-xs text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-[180px]"
                        >
                            <option value="All">All Team Leaders</option>
                            {leaders.map((leader) => (
                                <option key={leader} value={leader}>{leader}</option>
                            ))}
                        </select>

                    </div>

                </div>
            </div>


            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border border-theme-border bg-theme-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">

                        <thead>
                            <tr className="bg-primary/10">
                                <TableHeader>Teams</TableHeader>
                                <TableHeader>Team Leader</TableHeader>
                                <TableHeader>Team Members</TableHeader>
                                <TableHeader>Active Leads</TableHeader>
                                <TableHeader>Performance</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader align="center">Action</TableHeader>
                            </tr>
                        </thead>


                        <tbody>
                            {currentTeams.length > 0 ? (
                                currentTeams.map((team) => (
                                    <tr key={team.id} className="border-b border-theme-border last:border-b-0 transition hover:bg-theme-surface-secondary">

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Users size={16} />
                                                </div>

                                                <div>
                                                    <p className="whitespace-nowrap text-sm font-semibold text-theme-text">
                                                        {team.name}
                                                    </p>
                                                    <p className="text-xs text-theme-text-muted">
                                                        {team.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-3 text-sm text-theme-text">{team.leader}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-theme-text">{team.members}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-theme-text">{team.activeLeads}</td>


                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-9 text-xs font-medium text-theme-text-secondary">
                                                    {team.performance}%
                                                </span>

                                                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-theme-surface-secondary">
                                                    <div
                                                        className={`h-full rounded-full ${getPerformanceColor(team.performance)}`}
                                                        style={{ width: `${team.performance}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                                team.status === "Active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                            }`}>
                                                {team.status}
                                            </span>
                                        </td>


                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <ActionButton icon={Eye} color="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10" />
                                                <ActionButton icon={Pencil} color="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10" />
                                                <ActionButton icon={Trash2} color="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" />
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-10 text-center">
                                        <div className="flex flex-col items-center">
                                            <Users size={28} className="text-theme-text-muted" />
                                            <p className="mt-2 text-sm font-semibold text-theme-text">No teams found</p>
                                            <p className="mt-1 text-xs text-theme-text-secondary">Try changing your search or filters.</p>
                                        </div>
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
                            {filteredTeams.length === 0 ? 0 : startIndex + 1}–{endIndex}
                        </span>
                        {" "}of{" "}
                        <span className="font-semibold text-theme-text">{filteredTeams.length}</span>
                        {" "}team members
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

function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-theme-border bg-theme-surface px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
                <Icon size={20} />
            </div>

            <div>
                <p className="text-sm font-medium text-theme-text">{label}</p>
                <h2 className="mt-0.5 text-2xl font-bold text-theme-text">{value}</h2>
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
            className={`flex h-7 w-7 items-center justify-center rounded-md transition ${color}`}
        >
            <Icon size={15} />
        </button>
    );
}


function PaginationNavBtn({ children, disabled, onClick }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-theme-border-light text-theme-text-secondary transition hover:bg-theme-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
            {children}
        </button>
    );
}


export default Teams;