// ==========================================
// KPI CARDS DATA (5 cards)
// ==========================================

export const kpiData = [
    {
        id: 1,
        title: "Total Leads",
        value: "1,248",
        change: "+12.5% vs last week",
        trend: "up",
        iconType: "users",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
    {
        id: 2,
        title: "New Leads",
        value: "320",
        change: "+8.4% vs last week",
        trend: "up",
        iconType: "userPlus",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
    {
        id: 3,
        title: "Qualified Leads",
        value: "348",
        change: "+12.5% vs last week",
        trend: "up",
        iconType: "check",
        iconBg: "bg-green-100 dark:bg-green-500/10",
        iconColor: "text-green-600 dark:text-green-400",
    },
    {
        id: 4,
        title: "Revenue",
        value: "₹ 8.45L",
        change: "+18.6% vs last week",
        trend: "up",
        iconType: "revenue",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
    {
        id: 5,
        title: "Conversion Lead",
        value: "31.4%",
        change: "+4.8% vs last week",
        trend: "up",
        iconType: "trending",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
];


// ==========================================
// LEAD PIPELINE (Funnel chart)
// ==========================================

export const leadPipelineData = [
    { stage: "New", count: 320, color: "#a855f7" },
    { stage: "Contacted", count: 280, color: "#0ea5e9" },
    { stage: "Qualified", count: 384, color: "#22c55e" },
    { stage: "Proposal", count: 264, color: "#f97316" },
    { stage: "Closed", count: 200, color: "#ef4444" },
];


// ==========================================
// LEADS BY SOURCE (Donut chart)
// ==========================================

export const leadsBySourceData = [
    { source: "Website", percentage: 35, color: "#8b3df5" },
    { source: "LinkedIn", percentage: 25, color: "#22c55e" },
    { source: "Referral", percentage: 20, color: "#f97316" },
    { source: "Cold Call", percentage: 10, color: "#ef4444" },
    { source: "Other", percentage: 10, color: "#0ea5e9" },
];

export const leadsBySourceTotal = "1,248";


// ==========================================
// REVENUE OVERVIEW (Area chart with tabs)
// ==========================================

export const revenueOverviewData = {
    D1: [
        { label: "12am", value: 12 },
        { label: "3am", value: 8 },
        { label: "6am", value: 18 },
        { label: "9am", value: 32 },
        { label: "12pm", value: 45 },
        { label: "3pm", value: 38 },
        { label: "6pm", value: 52 },
        { label: "9pm", value: 28 },
    ],
    D7: [
        { label: "Mon", value: 22 },
        { label: "Tue", value: 35 },
        { label: "Wed", value: 48 },
        { label: "Thu", value: 62 },
        { label: "Fri", value: 78 },
        { label: "Sat", value: 45 },
        { label: "Sun", value: 40 },
    ],
    D30: [
        { label: "1", value: 15 },
        { label: "5", value: 28 },
        { label: "10", value: 42 },
        { label: "15", value: 35 },
        { label: "20", value: 58 },
        { label: "25", value: 72 },
        { label: "30", value: 65 },
    ],
};


// ==========================================
// RECENT LEADS (List of 5)
// ==========================================

export const recentLeadsData = [
    {
        id: 1,
        name: "Rahul Sharma",
        company: "TechCorp",
        status: "Qualified",
        time: "2m ago",
    },
    {
        id: 2,
        name: "Ankit Verma",
        company: "Nova Ltd",
        status: "Contacted",
        time: "10m ago",
    },
    {
        id: 3,
        name: "Priya Singh",
        company: "DesignHub",
        status: "New",
        time: "20m ago",
    },
    {
        id: 4,
        name: "Karan Joshi",
        company: "BuildX",
        status: "Proposal",
        time: "30m ago",
    },
    {
        id: 5,
        name: "Neha Mehta",
        company: "BrightSoft",
        status: "Closed",
        time: "1h ago",
    },
];


// ==========================================
// RECENT ACTIVITIES (Timeline of 5)
// ==========================================

export const recentActivitiesData = [
    {
        id: 1,
        text: "Rahul Sharma lead created",
        time: "2m ago",
        iconType: "user",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
    {
        id: 2,
        text: "Ankit Verma lead updated",
        time: "10m ago",
        iconType: "check",
        iconBg: "bg-green-100 dark:bg-green-500/10",
        iconColor: "text-green-600 dark:text-green-400",
    },
    {
        id: 3,
        text: "Invoice #INV-1024 created",
        time: "20m ago",
        iconType: "file",
        iconBg: "bg-blue-100 dark:bg-blue-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        id: 4,
        text: "Priya Singh assigned to Team Sales",
        time: "30m ago",
        iconType: "assign",
        iconBg: "bg-orange-100 dark:bg-orange-500/10",
        iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
        id: 5,
        text: "Lead status changed to Qualified",
        time: "1h ago",
        iconType: "user",
        iconBg: "bg-purple-100 dark:bg-primary/10",
        iconColor: "text-purple-600 dark:text-primary",
    },
];