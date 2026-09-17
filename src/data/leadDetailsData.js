import {
    Mail,
    PhoneCall,
    StickyNote,
    FileText,
} from "lucide-react";


export const leadData = {
    name: "Rahul Sharma",
    status: "New",
    email: "rahul@nextgenmedia.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
};


export const leadInformation = [
    { label: "Details", value: "Rahul Sharma" },
    { label: "Email", value: "rahul@nextgenmedia.com" },
    { label: "Phone", value: "+91 98765 43210" },
    { label: "Company Name", value: "BrightTech Solutions" },
    { label: "Job Title", value: "Marketing Manager" },
    { label: "Industry", value: "IT & Software" },
    { label: "Location", value: "Bangalore, Karnataka" },
    { label: "Website", value: "www.brighttechsolutions.com" },
];


export const leadStatusSteps = [
    { title: "New", date: "28 Apr 2026, 10:30 AM", color: "bg-blue-500", state: "done" },
    { title: "Contacted", date: "25 Apr 2026, 02:15 PM", color: "bg-green-500", state: "done" },
    { title: "Follow Up", date: "28 Apr 2026, 09:45 AM", color: "bg-orange-500", state: "current" },
    { title: "Qualified", date: "27 Apr 2026, 11:20 AM", color: "bg-purple-500", state: "pending" },
    { title: "Proposal Sent", date: "28 Apr 2026, 01:10 PM", color: "bg-gray-400", state: "pending" },
];


export const recentActivityData = [
    {
        title: "Lead created",
        subtitle: "By Priya Sharma",
        date: "26 Apr 2026",
        time: "10:30 AM",
        icon: Mail,
        iconClass: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
    },
    {
        title: "Call made by Amit Singh",
        subtitle: "",
        date: "26 Apr 2026",
        time: "11:20 AM",
        icon: PhoneCall,
        iconClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
        title: "Note Added",
        subtitle: "Interested in our premium package.",
        date: "26 Apr 2026",
        time: "12:15 PM",
        icon: StickyNote,
        iconClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
    },
    {
        title: "Proposal Sent",
        subtitle: "By Amit Singh",
        date: "26 Apr 2026",
        time: "01:10 PM",
        icon: FileText,
        iconClass: "bg-purple-100 text-purple-700 dark:bg-primary/10 dark:text-primary",
    },
];


export const followUpData = [
    {
        title: "28 Apr 2026, 10:30 AM",
        subtitle: "Last called on 28 Apr",
        status: "Completed",
        statusClass: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
        color: "bg-orange-500",
    },
    {
        title: "26 Apr 2026, 10:30 AM",
        subtitle: "Follow up on Proposal",
        status: "Pending",
        statusClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
        color: "bg-purple-500",
    },
    {
        title: "28 Apr 2026, 10:30 AM",
        subtitle: "Proposal Sent",
        status: "Scheduled",
        statusClass: "bg-purple-100 text-purple-700 dark:bg-primary/10 dark:text-primary",
        color: "bg-gray-400",
    },
];


export const quickDetails = {
    budget: {
        label: "Budget Range",
        value: "₹ 50,000 - ₹ 1,00,000",
    },
    timeline: {
        label: "Timeline",
        value: "Immediate",
    },
    notes: "Looking for digital marketing services to grow their online presence. Interested in long term partnership.",
};


export const noteData = {
    author: "Priya Sharma",
    date: "26 Apr 2026, 04:12 PM",
    message: "Client is interested in our premium package. Shared brochure and waiting for their response.",
};