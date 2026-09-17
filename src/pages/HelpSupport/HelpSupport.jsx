import React from "react";

import {
    HelpCircle,
    MessageCircle,
    Mail,
    Phone,
    BookOpen,
    ChevronRight,
} from "lucide-react";

function HelpSupport() {
    const supportOptions = [
        {
            title: "Help Center",
            description:
                "Find answers to common questions and learn how to use GrowthPulse.",
            icon: BookOpen,
            action: "Browse Help Center",
        },
        {
            title: "Live Chat",
            description:
                "Chat with our support team and get help with your account.",
            icon: MessageCircle,
            action: "Start Chat",
        },
        {
            title: "Email Support",
            description:
                "Send us an email and our support team will get back to you.",
            icon: Mail,
            action: "Contact Support",
        },
        {
            title: "Phone Support",
            description:
                "Talk directly with our support team for urgent assistance.",
            icon: Phone,
            action: "Call Support",
        },
    ];

    const faqData = [
        {
            question: "How do I create a new lead?",
            answer:
                "Go to the Leads section and click the Add Lead button to create a new lead.",
        },
        {
            question: "How can I manage my team?",
            answer:
                "Open the Teams section to view teams, team members, and manage team-related activities.",
        },
        {
            question: "Where can I view my invoices?",
            answer:
                "Open the Invoices section from the sidebar to view your invoices and payment status.",
        },
        {
            question: "How can I contact support?",
            answer:
                "You can contact the support team using Live Chat, Email Support, or Phone Support.",
        },
    ];

    return (
        <div className="space-y-6">

            {/* PAGE HEADER */}

            <div>
                <h1 className="text-2xl font-bold text-theme-text">
                    Help & Support
                </h1>

                <p className="mt-1 text-sm text-theme-text-secondary">
                    Get help, find answers, or contact our support team.
                </p>
            </div>

            {/* SUPPORT OPTIONS */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {supportOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                        <div
                            key={option.title}
                            className="
                                rounded-xl
                                border
                                border-theme-border
                                bg-theme-surface
                                p-5
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-md
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Icon size={22} />
                            </div>

                            <h2 className="mt-4 text-base font-semibold text-theme-text">
                                {option.title}
                            </h2>

                            <p className="mt-2 min-h-[48px] text-sm leading-6 text-theme-text-secondary">
                                {option.description}
                            </p>

                            <button
                                type="button"
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-semibold
                                    text-primary
                                    transition-all
                                    duration-200
                                    hover:gap-2
                                "
                            >
                                {option.action}

                                <ChevronRight size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* FAQ */}

            <div
                className="
                    rounded-xl
                    border
                    border-theme-border
                    bg-theme-surface
                    p-5
                    shadow-sm
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-primary/10
                            text-primary
                        "
                    >
                        <HelpCircle size={21} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-theme-text">
                            Frequently Asked Questions
                        </h2>

                        <p className="text-sm text-theme-text-secondary">
                            Quick answers to common questions.
                        </p>
                    </div>
                </div>

                <div className="mt-5 divide-y divide-theme-border">
                    {faqData.map((faq) => (
                        <div
                            key={faq.question}
                            className="py-4"
                        >
                            <h3 className="text-sm font-semibold text-theme-text">
                                {faq.question}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-theme-text-secondary">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CONTACT SUPPORT */}

            <div
                className="
                    rounded-xl
                    border
                    border-theme-border
                    bg-primary
                    p-6
                    text-white
                    shadow-sm
                "
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Still need help?
                        </h2>

                        <p className="mt-1 text-sm text-white/80">
                            Our support team is ready to help you with any issue.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-primary
                            transition-all
                            duration-200
                            hover:bg-gray-100
                            active:scale-95
                        "
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HelpSupport;