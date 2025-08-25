// app/privacy/page.tsx
// Next.js App Router + TypeScript
// A clean, accessible Privacy Policy page scaffold you can drop into your project.
// ──────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../globals.css"; 

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Learn how we collect, use, and protect your information.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: { canonical: "/privacy" },
    openGraph: {
        title: "Privacy Policy",
        description:
            "Learn how we collect, use, and protect your information.",
        url: "/privacy",
        type: "article",
    },
};

// ──────────────────────────────────────────────────────────────────────────────
// Types & Helpers
// ──────────────────────────────────────────────────────────────────────────────

type Section = {
    title: string;
    body: string[]; // paragraphs
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// Last updated date (change this)
const LAST_UPDATED = "2025-08-24"; // YYYY-MM-DD

// ──────────────────────────────────────────────────────────────────────────────
// Replace these placeholder sections with your own policy. Keep the structure and
// add/remove sections freely. Each string in `body` becomes a paragraph.
// ──────────────────────────────────────────────────────────────────────────────

const sections: Section[] = [
    {
        title: "Introduction",
        body: [
            "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.",
            "Please read this policy carefully. By accessing or using our services, you agree to this Privacy Policy. If you do not agree, please discontinue use.",
        ],
    },
    {
        title: "Information We Collect",
        body: [
            "We may collect information you provide directly (such as account details or support messages) and information collected automatically (such as device data, cookies, analytics).",
            "You can control certain data collection via your browser settings and, where available, in-product controls.",
        ],
    },
    {
        title: "How We Use Information",
        body: [
            "We use your information to operate and improve our services, personalize your experience, communicate with you, provide support, and ensure safety and compliance.",
            "We may aggregate or de-identify data to analyze trends and improve features.",
        ],
    },
    {
        title: "Sharing & Disclosure",
        body: [
            "We do not sell your personal information. We may share data with service providers who help us operate the services, subject to confidentiality and security obligations.",
            "We may disclose information to comply with legal obligations, enforce our terms, or protect rights, property, and safety.",
        ],
    },
    {
        title: "Cookies & Tracking",
        body: [
            "We use cookies and similar technologies for essential functionality, analytics, and (where applicable) personalization.",
            "You can manage preferences via your browser or device settings. Some features may not function properly without cookies.",
        ],
    },
    {
        title: "Data Retention",
        body: [
            "We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.",
        ],
    },
    {
        title: "Your Rights & Choices",
        body: [
            "Subject to applicable laws, you may have rights to access, correct, delete, or restrict processing of your personal information, and to object to certain processing activities.",
            "To exercise rights, contact us using the details provided below.",
        ],
    },
    {
        title: "International Transfers",
        body: [
            "Your information may be processed in countries other than your own. We implement appropriate safeguards to protect your information in accordance with applicable law.",
        ],
    },
    {
        title: "Security",
        body: [
            "We employ technical and organizational measures designed to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.",
        ],
    },
    {
        title: "Children’s Privacy",
        body: [
            "Our services are not directed to children under the age specified by applicable law. We do not knowingly collect personal information from children without appropriate consent.",
        ],
    },
    {
        title: "Changes to This Policy",
        body: [
            "We may update this Privacy Policy from time to time. We will revise the \"Last updated\" date above and, where appropriate, provide additional notice.",
        ],
    },
    {
        title: "Contact Us",
        body: [
            "If you have questions about this Privacy Policy or our data practices, contact us at contact@heygaudi.ai.",
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────────────
// Page Component
// ──────────────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
    return (
        <main className="min-h-screen w-full bg-white text-slate-900">
            {/* Header */}
            <header className="border-b bg-gray-50/60">
                <div className="mx-auto max-w-5xl px-6 py-10">
                    <div className="flex justify-center mb-6">
                        <Link href="/" aria-label="Home">
                        <Image src="/logo_text.png" alt="Company logo" width={220} height={60} priority className="h-12 w-auto" />
                        </Link>
                    </div>
                    <nav className="mb-6 text-sm text-slate-600" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2">
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li aria-hidden>›</li>
                            <li className="text-slate-800 font-medium">Privacy Policy</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="mt-3 text-slate-600">Last updated <time dateTime={LAST_UPDATED}>{new Date(LAST_UPDATED).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
                </div>
            </header>

            {/* Body */}
            <div className="mx-auto max-w-5xl px-6 py-12 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-10">
                {/* Table of Contents */}
                <aside className="md:sticky md:top-6 md:self-start border rounded-2xl p-5 bg-gray-50">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 ">Contents</h2>
                    <ul className="mt-4 space-y-2">
                        {sections.map((s) => {
                            const id = slugify(s.title);
                            return (
                                <li key={id}>
                                    <a href={`#${id}`} className="block text-slate-700 hover:text-slate-900 hover:underline">
                                        {s.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* Main Content */}
                <article className="prose prose-slate max-w-none">
                    {sections.map((s) => {
                        const id = slugify(s.title);
                        return (
                            <section id={id} key={id} className="scroll-mt-28 border-b border-slate-200 pb-6 mb-10 last:border-0 last:mb-0">
                                <h2 className="mt-10 text-1xl md:text-2xl font-bold tracking-tight text-slate-900 text-primary">{s.title}</h2>
                                {s.body.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </section>
                        );
                    })}

                    {/* Optional: Contact card */}
                    <div className="not-prose mt-12">
                        <div className="rounded-2xl border bg-gray-50 p-6">
                            <h3 className="text-lg font-semibold">Questions?</h3>
                            <p className="mt-2 text-slate-700">Reach us at <a className="underline" href="mailto:contact@heygaudi.ai">contact@heygaudi.ai</a>.</p>
                        </div>
                    </div>
                </article>
            </div>

            {/* Footer hint */}
            <footer className="mx-auto max-w-5xl px-6 pb-14 text-sm text-slate-500">
                <p>
                    This page is provided for informational purposes only and does not constitute legal advice. Consult qualified counsel to tailor your policy.
                </p>
            </footer>
        </main>
    );
}
