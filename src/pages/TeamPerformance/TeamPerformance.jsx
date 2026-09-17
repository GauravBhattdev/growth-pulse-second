import React, { useMemo, useState } from "react";

import {
    Search,
    UserPlus,
    Download,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Users,
    UserCheck,
    UserMinus,
    UserX,
    ArrowRight,
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    performanceOverviewData,
    rolePerformanceData,
    topPerformersData,
    teamPerformanceTableData,
} from "../../data/teamPerformanceData";


function TeamPerformance() {

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const roles = [...new Set(teamPerformanceTableData.map((m) => m.role))];


    const filteredMembers = useMemo(() => {
        return teamPerformanceTableData.filter((member) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                member.name.toLowerCase().includes(search) ||
                member.role.toLowerCase().includes(search);

            const matchesRole = roleFilter === "All" || member.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [searchTerm, roleFilter]);


    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredMembers.length);
    const currentMembers = filteredMembers.slice(startIndex, endIndex);


    const handleSearch = (v) => { setSearchTerm(v); setCurrentPage(1); };
    const handleRoleChange = (v) => { setRoleFilter(v); setCurrentPage(1); };


    const getInitials = (name) =>
        name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();


    const getStatusClass = (status) => {
        if (status === "Active") return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        if (status === "On Leave") return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
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
                    <h1 className="text-2xl font-bold text-theme-text">Team Performance</h1>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                        Track overall and individual performance of your team members.
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


            {/* CHART ROW */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">

                {/* BAR CHART */}
                <div className="rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm sm:p-5">

                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-sm font-bold text-theme-text">Team Performance Overview</h2>

                        <div className="flex items-center gap-3 text-[10px] text-theme-text-secondary">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
                                Leads
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                                Closed Deals
                            </div>
                        </div>
                    </div>


                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={performanceOverviewData}
                                margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                                barGap={4}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                                <Bar dataKey="leads" fill="#0EA5E9" radius={[4, 4, 0, 0]} maxBarSize={18} />
                                <Bar dataKey="closed" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={18} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>


                {/* DONUT CHART */}
                <div className="rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm sm:p-5">

                    <h2 className="mb-4 text-sm font-bold text-theme-text">Performance by role</h2>

                    <div className="flex flex-col items-center gap-5">

                        <div className="relative h-36 w-36">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={rolePerformanceData}
                                        dataKey="score"
                                        innerRadius={48}
                                        outerRadius={68}
                                        paddingAngle={2}
                                        stroke="none"
                                    >
                                        {rolePerformanceData.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-lg font-bold text-theme-text">87%</p>
                                <p className="text-[10px] text-theme-text-secondary">Overall</p>
                            </div>
                        </div>


                        <div className="w-full space-y-2">
                            {rolePerformanceData.map((role) => (
                                <div key={role.name} className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: role.color }} />
                                        <span className="text-theme-text">{role.name}</span>
                                    </div>
                                    <span className="font-semibold text-theme-text">{role.score}%</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>


                {/* TOP PERFORMERS */}
                <div className="rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm sm:p-5">

                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-theme-text">Top Performers</h2>

                        <button
                            type="button"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:opacity-80"
                        >
                            View All
                            <ArrowRight size={12} />
                        </button>
                    </div>


                    <div className="space-y-3">
                        {topPerformersData.map((member) => (
                            <div key={member.name} className="flex items-center justify-between gap-2">

                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                        {getInitials(member.name)}
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-theme-text">{member.name}</p>
                                        <p className="text-[10px] text-theme-text-muted">{member.role}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-bold text-theme-text">{member.score}%</p>
                                    <p className="text-[10px] font-medium text-green-500">↑ {member.trend}%</p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>


            {/* TABLE HEADER + FILTERS */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-bold text-theme-text">Team Member Performance</h2>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                    <div className="relative w-full sm:w-[220px]">
                        <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search team member..."
                            className="h-9 w-full rounded-lg border border-theme-border-light bg-theme-surface pl-8 pr-3 text-xs text-theme-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>


                    <select
                        value={roleFilter}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="h-9 w-full rounded-lg border border-theme-border-light bg-theme-surface px-3 text-xs text-theme-text outline-none focus:border-primary sm:w-[140px]"
                    >
                        <option value="All">All Roles</option>
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>


                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-theme-border-light bg-theme-surface px-3 text-xs font-semibold text-theme-text transition hover:border-primary hover:text-primary"
                    >
                        <Download size={14} />
                        Export
                    </button>

                </div>
            </div>


            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">

                        <thead>
                            <tr className="bg-primary/10">
                                <TableHeader>#</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Role</TableHeader>
                                <TableHeader>Total Leads</TableHeader>
                                <TableHeader>Closed Deals</TableHeader>
                                <TableHeader>Conversion rate</TableHeader>
                                <TableHeader>Performance score</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader align="center">Actions</TableHeader>
                            </tr>
                        </thead>


                        <tbody>
                            {currentMembers.length > 0 ? (
                                currentMembers.map((member, index) => (
                                    <tr key={member.id} className="border-b border-theme-border last:border-b-0 transition hover:bg-theme-surface-secondary">

                                        <td className="px-4 py-3 text-sm text-theme-text-secondary">
                                            {startIndex + index + 1}
                                        </td>


                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                    {getInitials(member.name)}
                                                </div>
                                                <span className="whitespace-nowrap text-sm font-semibold text-theme-text">
                                                    {member.name}
                                                </span>
                                            </div>
                                        </td>


                                        <td className="px-4 py-3 text-sm text-theme-text-secondary whitespace-nowrap">{member.role}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-theme-text">{member.totalLeads}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-theme-text">{member.closedDeals}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-theme-text">{member.conversionRate}%</td>


                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-theme-surface-secondary">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${member.performanceScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold text-theme-text">
                                                    {member.performanceScore}%
                                                </span>
                                            </div>
                                        </td>


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
                                    <td colSpan="9" className="px-5 py-12 text-center text-sm text-theme-text-secondary">
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
                        {" "}members
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


export default TeamPerformance;