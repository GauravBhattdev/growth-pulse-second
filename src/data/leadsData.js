// =====================================================
// LEADS DATA
// =====================================================

export const leads = [
    { id: 1, name: "Rahul Sharma", company: "TechCorp", email: "rahul@techcorp.com", phone: "+91 98765 43210", source: "Website", assignedTo: "Rohit Mehta", status: "Qualified", lastActivity: "2m ago", initials: "RS", avatarColor: "bg-green-500/15 text-green-500" },
    { id: 2, name: "Ankit Verma", company: "Nova Ltd", email: "ankit@novaltd.com", phone: "+91 91234 56780", source: "LinkedIn", assignedTo: "Priya Sharma", status: "Contacted", lastActivity: "10m ago", initials: "AV", avatarColor: "bg-primary/15 text-primary" },
    { id: 3, name: "Priya Singh", company: "DesignHub", email: "priya@designhub.com", phone: "+91 99887 76655", source: "Referral", assignedTo: "Ankit Verma", status: "New", lastActivity: "20m ago", initials: "PS", avatarColor: "bg-orange-500/15 text-orange-500" },
    { id: 4, name: "Karan Joshi", company: "BuildX", email: "karan@buildx.com", phone: "+91 90000 90000", source: "Cold Call", assignedTo: "Rohit Mehta", status: "Proposal", lastActivity: "30m ago", initials: "KJ", avatarColor: "bg-blue-500/15 text-blue-500" },
    { id: 5, name: "Neha Mehta", company: "BrightSoft", email: "neha@brightsoft.com", phone: "+91 87654 32109", source: "Website", assignedTo: "Priya Sharma", status: "Closed", lastActivity: "1h ago", initials: "NM", avatarColor: "bg-emerald-500/15 text-emerald-500" },
    { id: 6, name: "Amit Kapoor", company: "CloudNova", email: "amit@cloudnova.com", phone: "+91 98765 11111", source: "LinkedIn", assignedTo: "Rohit Mehta", status: "New", lastActivity: "1h ago", initials: "AK", avatarColor: "bg-primary/15 text-primary" },
    { id: 7, name: "Sneha Gupta", company: "PixelWorks", email: "sneha@pixelworks.com", phone: "+91 98765 22222", source: "Referral", assignedTo: "Ankit Verma", status: "Qualified", lastActivity: "1h ago", initials: "SG", avatarColor: "bg-pink-500/15 text-pink-500" },
    { id: 8, name: "Rohit Malhotra", company: "FinEdge", email: "rohit@finedge.com", phone: "+91 98765 33333", source: "Website", assignedTo: "Priya Sharma", status: "Contacted", lastActivity: "2h ago", initials: "RM", avatarColor: "bg-blue-500/15 text-blue-500" },
    { id: 9, name: "Pooja Agarwal", company: "MarketPro", email: "pooja@marketpro.com", phone: "+91 98765 44444", source: "Cold Call", assignedTo: "Rohit Mehta", status: "Proposal", lastActivity: "2h ago", initials: "PA", avatarColor: "bg-orange-500/15 text-orange-500" },
    { id: 10, name: "Vikas Thakur", company: "SoftLabs", email: "vikas@softlabs.com", phone: "+91 98765 55555", source: "LinkedIn", assignedTo: "Ankit Verma", status: "Closed", lastActivity: "3h ago", initials: "VT", avatarColor: "bg-emerald-500/15 text-emerald-500" },
    { id: 11, name: "Megha Joshi", company: "DataCore", email: "megha@datacore.com", phone: "+91 98765 66666", source: "Website", assignedTo: "Priya Sharma", status: "Qualified", lastActivity: "3h ago", initials: "MJ", avatarColor: "bg-primary/15 text-primary" },
    { id: 12, name: "Arjun Rawat", company: "NextGen Solutions", email: "arjun@nextgen.com", phone: "+91 98765 77777", source: "Referral", assignedTo: "Rohit Mehta", status: "New", lastActivity: "4h ago", initials: "AR", avatarColor: "bg-blue-500/15 text-blue-500" },
];


// =====================================================
// BACKWARDS COMPATIBILITY EXPORTS
// =====================================================
// The Leads page and other pages import "leadsData".
// The Dashboard imports "leads".
// Both point to the same array.

export const leadsData = leads;