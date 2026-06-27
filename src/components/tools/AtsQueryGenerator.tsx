"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Search } from "lucide-react";
import { DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS, DIRECTORY_ROLES } from "@/lib/constants";
import { assembleDork, buildDorkComponents } from "@/lib/utils";

const DEFAULT_ROLE = "software-engineer";
const DEFAULT_LOCATION = "remote";
const DEFAULT_PLATFORM = "greenhouse";

export function AtsQueryGenerator() {
    const [roleSlug, setRoleSlug] = useState(DEFAULT_ROLE);
    const [locationSlug, setLocationSlug] = useState(DEFAULT_LOCATION);
    const [platformSlug, setPlatformSlug] = useState(DEFAULT_PLATFORM);
    const [experience, setExperience] = useState("");
    const [include, setInclude] = useState("");
    const [copied, setCopied] = useState(false);

    const role = DIRECTORY_ROLES.find(item => item.slug === roleSlug) || DIRECTORY_ROLES[0];
    const location = DIRECTORY_LOCATIONS.find(item => item.slug === locationSlug) || DIRECTORY_LOCATIONS[0];
    const platform = DIRECTORY_PLATFORMS.find(item => item.slug === platformSlug) || DIRECTORY_PLATFORMS[0];

    const query = useMemo(() => {
        const components = buildDorkComponents({
            role: role.label,
            customRole: "",
            isCustomRole: false,
            location: location.slug === "remote" ? "remote" : "specific",
            specificLocation: location.slug === "remote" ? "" : location.label,
            exclude: "intern, unpaid, volunteer",
            time: "30",
            include,
            experience,
            exactTitle: true,
        });

        return assembleDork(platform.domain, components);
    }, [experience, include, location, platform, role]);

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const directoryUrl = `/jobs/platform/${platform.slug}/${role.slug}/${location.slug}`;

    async function copyQuery() {
        await navigator.clipboard.writeText(query);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Role</span>
                        <select
                            value={roleSlug}
                            onChange={event => setRoleSlug(event.target.value)}
                            className="w-full rounded-2xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        >
                            {DIRECTORY_ROLES.map(item => (
                                <option key={item.slug} value={item.slug}>{item.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">ATS Platform</span>
                        <select
                            value={platformSlug}
                            onChange={event => setPlatformSlug(event.target.value)}
                            className="w-full rounded-2xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        >
                            {DIRECTORY_PLATFORMS.map(item => (
                                <option key={item.slug} value={item.slug}>{item.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Location</span>
                        <select
                            value={locationSlug}
                            onChange={event => setLocationSlug(event.target.value)}
                            className="w-full rounded-2xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        >
                            {DIRECTORY_LOCATIONS.map(item => (
                                <option key={item.slug} value={item.slug}>{item.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Seniority</span>
                        <select
                            value={experience}
                            onChange={event => setExperience(event.target.value)}
                            className="w-full rounded-2xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        >
                            <option value="">Any seniority</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid-level</option>
                            <option value="senior">Senior</option>
                            <option value="staff">Staff / Principal</option>
                            <option value="manager">Manager / Director</option>
                            <option value="intern">Intern</option>
                        </select>
                    </label>

                    <label className="space-y-2 sm:col-span-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Optional keywords</span>
                        <input
                            value={include}
                            onChange={event => setInclude(event.target.value)}
                            placeholder="React, Python, AI, Kubernetes"
                            className="w-full rounded-2xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                    </label>
                </div>
            </section>

            <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl dark:border-slate-800">
                <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-300">
                    <Search className="h-4 w-4" />
                    Generated Google Query
                </div>
                <code className="block min-h-32 whitespace-pre-wrap break-words rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-slate-100">
                    {query}
                </code>
                <div className="mt-5 grid gap-3">
                    <button
                        type="button"
                        onClick={copyQuery}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                    >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied" : "Copy Query"}
                    </button>
                    <a
                        href={googleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-blue-600"
                    >
                        Search Google
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link
                        href={directoryUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
                    >
                        Open HiddenJobs Directory
                    </Link>
                </div>
            </aside>
        </div>
    );
}
