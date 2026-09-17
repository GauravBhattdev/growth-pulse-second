import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Bell,
    Clock,
    StickyNote,
    Calendar,
    Info,
    Plus,
} from "lucide-react";

import {
    leadData,
    leadInformation,
    leadStatusSteps,
    recentActivityData,
    followUpData,
    quickDetails,
    noteData,
} from "../../data/leadDetailsData";


function LeadDetails() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = ["Overview", "Activity", "Notes", "Documents"];

    const handleAddNote = () => alert("Add Note clicked.");


    return (
        <div className="w-full space-y-5">

            {/* BACK BUTTON */}
            <button
                type="button"
                onClick={() => navigate("/leads")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
            >
                <ArrowLeft size={18} />
                Back To Leads
            </button>


            {/* PROFILE HEADER */}
            <div className="rounded-xl border border-theme-border bg-theme-surface p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
                        {getInitials(leadData.name)}
                    </div>


                    <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-theme-text sm:text-3xl">
                                {leadData.name}
                            </h1>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                {leadData.status}
                            </span>
                        </div>


                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-theme-text-secondary">
                            <span className="inline-flex items-center gap-2">
                                <Mail size={15} />
                                {leadData.email}
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <Phone size={15} />
                                {leadData.phone}
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <MapPin size={15} />
                                {leadData.location}
                            </span>
                        </div>
                    </div>

                </div>
            </div>


            {/* TABS */}
            <div className="flex flex-wrap items-center gap-6 rounded-xl border border-theme-border bg-theme-surface px-5 shadow-sm sm:gap-10">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;

                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`relative py-4 text-sm font-semibold transition ${
                                isActive ? "text-primary" : "text-theme-text-secondary hover:text-theme-text"
                            }`}
                        >
                            {tab}

                            {tab === "Activity" && (
                                <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-500 align-middle" />
                            )}

                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>


            {/* TOP GRID */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                <Card title="Lead Information" icon={Info}>
                    <div className="space-y-3">
                        {leadInformation.map((row) => (
                            <InfoRow key={row.label} label={row.label} value={row.value} />
                        ))}
                    </div>
                </Card>


                <Card title="Lead Status" icon={Clock}>
                    <div className="space-y-4">
                        {leadStatusSteps.map((step, index) => (
                            <StatusStep
                                key={index}
                                title={step.title}
                                date={step.date}
                                color={step.color}
                                state={step.state}
                                isLast={index === leadStatusSteps.length - 1}
                            />
                        ))}
                    </div>
                </Card>


                <Card title="Recent Activity" icon={Bell}>
                    <div className="space-y-4">
                        {recentActivityData.map((activity, index) => (
                            <ActivityItem key={index} {...activity} />
                        ))}
                    </div>
                </Card>

            </div>


            {/* BOTTOM GRID */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                <Card title="Quick Details" icon={Info}>
                    <div className="space-y-4">

                        <div className="flex items-start justify-between gap-3">
                            <div className="rounded-lg border border-theme-border px-3 py-2 text-xs font-medium text-theme-text whitespace-nowrap">
                                {quickDetails.budget.label}
                            </div>
                            <div className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                {quickDetails.budget.value}
                            </div>
                        </div>


                        <div className="flex items-start justify-between gap-3">
                            <div className="rounded-lg border border-theme-border px-3 py-2 text-xs font-medium text-theme-text whitespace-nowrap">
                                {quickDetails.timeline.label}
                            </div>
                            <div className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                {quickDetails.timeline.value}
                            </div>
                        </div>


                        <div className="flex items-start justify-between gap-3">
                            <div className="rounded-lg border border-theme-border px-3 py-2 text-xs font-medium text-theme-text whitespace-nowrap">
                                Notes
                            </div>
                            <div className="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-800 dark:bg-blue-500/10 dark:text-blue-300">
                                {quickDetails.notes}
                            </div>
                        </div>

                    </div>
                </Card>


                <Card title="Follow Up" icon={Calendar}>
                    <div className="space-y-5">
                        {followUpData.map((item, index) => (
                            <FollowUpStep
                                key={index}
                                title={item.title}
                                subtitle={item.subtitle}
                                status={item.status}
                                statusClass={item.statusClass}
                                color={item.color}
                                isLast={index === followUpData.length - 1}
                            />
                        ))}
                    </div>
                </Card>


                <Card
                    title="Notes"
                    icon={StickyNote}
                    action={
                        <button
                            type="button"
                            onClick={handleAddNote}
                            className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"
                        >
                            <Plus size={13} />
                            Add Note
                        </button>
                    }
                >
                    <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-500/10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                {getInitials(noteData.author)}
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-theme-text">{noteData.author}</p>
                                <p className="text-xs text-theme-text-secondary">{noteData.date}</p>
                            </div>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-theme-text-secondary">
                            {noteData.message}
                        </p>
                    </div>
                </Card>

            </div>

        </div>
    );
}


/* ============ SUB COMPONENTS ============ */

function Card({ title, icon: Icon, action, children }) {
    return (
        <div className="rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm sm:p-5">

            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={16} className="text-primary" />}
                    <h2 className="text-sm font-bold text-theme-text">{title}</h2>
                </div>

                {action}
            </div>

            {children}

        </div>
    );
}


function InfoRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-3 text-xs">
            <span className="shrink-0 text-theme-text-secondary">{label}</span>
            <span className="text-right font-medium text-theme-text">{value}</span>
        </div>
    );
}


function StatusStep({ title, date, color, state, isLast }) {
    const isDone = state === "done";
    const isCurrent = state === "current";

    return (
        <div className="flex gap-3">

            <div className="flex flex-col items-center">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full ${color} ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                    {isDone && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>

                {!isLast && (
                    <div className="mt-1 w-px flex-1 border-l border-dashed border-theme-border" />
                )}
            </div>


            <div className="flex-1 pb-1">
                <p className={`text-sm font-semibold ${isCurrent || isDone ? "text-theme-text" : "text-theme-text-muted"}`}>
                    {title}
                </p>
                <p className="mt-0.5 text-xs text-theme-text-muted">{date}</p>
            </div>

        </div>
    );
}


function ActivityItem({ title, subtitle, date, time, icon: Icon, iconClass }) {
    return (
        <div className="flex items-start gap-3">

            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
                <Icon size={16} />
            </div>


            <div className="flex-1">
                <p className="text-sm font-semibold text-theme-text">{title}</p>

                {subtitle && (
                    <p className="mt-0.5 text-xs text-theme-text-secondary">{subtitle}</p>
                )}
            </div>


            <div className="shrink-0 text-right">
                <p className="whitespace-nowrap text-xs font-medium text-theme-text">{date}</p>
                <p className="text-xs text-theme-text-muted">{time}</p>
            </div>

        </div>
    );
}


function FollowUpStep({ title, subtitle, status, statusClass, color, isLast }) {
    return (
        <div className="flex gap-3">

            <div className="flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full ${color}`} />

                {!isLast && (
                    <div className="mt-1 w-px flex-1 border-l border-dashed border-theme-border" />
                )}
            </div>


            <div className="flex-1 pb-1">
                <p className="text-sm font-semibold text-theme-text">{title}</p>
                <p className="mt-0.5 text-xs text-theme-text-secondary">{subtitle}</p>

                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                    {status}
                </span>
            </div>

        </div>
    );
}


function getInitials(name) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}


export default LeadDetails;