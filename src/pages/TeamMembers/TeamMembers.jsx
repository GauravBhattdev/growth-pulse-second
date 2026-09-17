import React, { useMemo, useState } from "react";

import {
    Search,
    UserPlus,
   
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Users,
    UserCheck,
    UserMinus,
    UserX,
} from "lucide-react";

import { teamMembersData } from "../../data/teamMembersData";


function TeamMembers() {

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [teamFilter, setTeamFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const roles = [...new Set(teamMembersData.map((m) => m.role))];
    const statuses = [...new Set(teamMembersData.map((m) => m.status))];
    const teams = [...new Set(teamMembersData.map((m) => m.team))];


    const filteredMembers = useMemo(() => {
        return teamMembersData.filter((member) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                member.name.toLowerCase().includes(search) ||
                member.email.toLowerCase().includes(search) ||
                member.role.toLowerCase().includes(search) ||
                member.team.toLowerCase().includes(search);

            const matchesRole = roleFilter === "All" || member.role === roleFilter;
            const matchesStatus = statusFilter === "All" || member.status === statusFilter;
            const matchesTeam = teamFilter === "All" || member.team === teamFilter;

            return matchesSearch && matchesRole && matchesStatus && matchesTeam;
        });
    }, [searchTerm, roleFilter, statusFilter, teamFilter]);


    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredMembers.length);
    const currentMembers = filteredMembers.slice(startIndex, endIndex);


    const handleSearch = (v) => { setSearchTerm(v); setCurrentPage(1); };
    const handleRoleChange = (v) => { setRoleFilter(v); setCurrentPage(1); };
    const handleStatusChange = (v) => { setStatusFilter(v); setCurrentPage(1); };
    const handleTeamChange = (v) => { setTeamFilter(v); setCurrentPage(1); };


    const getInitials = (name) =>
        name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();


    const getStatusClass = (status) => {
        if (status === "Active") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        if (status === "On Leave") return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
    };


    const getConversionColor = (v) => {
        if (v >= 70) return "bg-green-500";
        if (v >= 55) return "bg-blue-500";
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-theme-text">Team Management</h1>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Manage your team members, view performance, leads and support activity.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover hover:-translate-y-0.5"
                >
                    <UserPlus size={17} />
                    Add Team Members
                </button>
            </div>


            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard label="Total Members"    value={48} icon={Users}     iconBg="bg-blue-100 dark:bg-blue-500/10"     iconColor="text-blue-600 dark:text-blue-400" />
                <StatCard label="Active Members"   value={42} icon={UserCheck} iconBg="bg-green-100 dark:bg-green-500/10"   iconColor="text-green-600 dark:text-green-400" />
                <StatCard label="On Leave"         value={3}  icon={UserMinus} iconBg="bg-purple-100 dark:bg-primary/10"    iconColor="text-purple-600 dark:text-primary" />
                <StatCard label="Inactive Members" value={3}  icon={UserX}     iconBg="bg-green-100 dark:bg-green-500/10"   iconColor="text-green-600 dark:text-green-400" />

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
                            placeholder="Search team members..."
                            className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface pl-9 pr-3 text-sm text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>


                    <select value={roleFilter} onChange={(e) => handleRoleChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option value="All">All Role</option>
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>


                    <select value={statusFilter} onChange={(e) => handleStatusChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option value="All">All Status</option>
                        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>


                    <select value={teamFilter} onChange={(e) => handleTeamChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-sm text-theme-text outline-none focus:border-primary">
                        <option value="All">All Teams</option>
                        {teams.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>

                </div>
            </div>


            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">

                        <thead>
                            <tr className="bg-primary/10">
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Roles</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Conversion rate</TableHeader>
                                <TableHeader>Joined On</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader align="center">Action</TableHeader>
                            </tr>
                        </thead>


                        <tbody>
                            {currentMembers.length > 0 ? (
                                currentMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-theme-border last:border-b-0 transition hover:bg-theme-surface-secondary">

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                    {getInitials(member.name)}
                                                </div>

                                                <div>
                                                    <p className="whitespace-nowrap text-sm font-semibold text-theme-text">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-xs text-theme-text-muted">
                                                        {member.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-3 text-sm text-theme-text-secondary whitespace-nowrap">{member.role}</td>
                                        <td className="px-4 py-3 text-sm text-theme-text-secondary whitespace-nowrap">{member.email}</td>


                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-9 text-xs font-semibold text-theme-text">
                                                    {member.conversion}%
                                                </span>

                                                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-theme-surface-secondary">
                                                    <div
                                                        className={`h-full rounded-full ${getConversionColor(member.conversion)}`}
                                                        style={{ width: `${member.conversion}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-4 py-3 text-sm text-theme-text-secondary whitespace-nowrap">{member.joinedDate}</td>


                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClass(member.status)}`}>
                                                {member.status}
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
                                    <td colSpan="7" className="px-5 py-12 text-center text-sm text-theme-text-secondary">
                                        No team members found.
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
                            {filteredMembers.length === 0 ? 0 : startIndex + 1}–{endIndex}
                        </span>
                        {" "}of{" "}
                        <span className="font-semibold text-theme-text">{filteredMembers.length}</span>
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
        <div className="flex items-center gap-4 rounded-xl border border-theme-border bg-theme-surface px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
            className="flex h-7 w-7 items-center justify-center rounded-md text-theme-text-secondary transition hover:bg-theme-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
            {children}
        </button>
    );
}


export default TeamMembers;