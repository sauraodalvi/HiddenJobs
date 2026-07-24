"use client";

import { useState, useEffect, useRef } from "react";
import { 
    Copy, Check, Sparkles, Terminal, FileCode, Bot, Shield, Zap, FileText, 
    CheckCircle2, AlertTriangle, Briefcase, Globe, GraduationCap, Building, 
    Upload, Download, ArrowRight, Info, Link as LinkIcon
} from "lucide-react";
import { ATS_PLATFORMS } from "@/lib/constants";

export function AutoApplyGenerator() {
    // Target Job & Preferences
    const [targetRole, setTargetRole] = useState("Product Manager");
    const [targetLocation, setTargetLocation] = useState("Remote");
    const [targetSeniority, setTargetSeniority] = useState("Mid-Senior Level");
    const [selectedAts, setSelectedAts] = useState("Greenhouse");
    const [jobUrl, setJobUrl] = useState("");
    
    // Candidate Resume & Extracted Markdown State (Clean / Unpopulated)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [isProcessingFile, setIsProcessingFile] = useState(false);
    const [candidateName, setCandidateName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [mdContent, setMdContent] = useState<string>("");

    const [mdFilePath, setMdFilePath] = useState("");
    const [resumePath, setResumePath] = useState("");
    const [minMatchScore, setMinMatchScore] = useState(4);

    // Hydrate state from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedResumePath = localStorage.getItem("hj_resume_path");
        if (savedResumePath) setResumePath(savedResumePath);

        const savedMdFilePath = localStorage.getItem("hj_md_file_path");
        if (savedMdFilePath) setMdFilePath(savedMdFilePath);

        const savedCandidateName = localStorage.getItem("hj_candidate_name");
        if (savedCandidateName) setCandidateName(savedCandidateName);

        const savedEmail = localStorage.getItem("hj_email");
        if (savedEmail) setEmail(savedEmail);

        const savedPhone = localStorage.getItem("hj_phone");
        if (savedPhone) setPhone(savedPhone);

        const savedLinkedin = localStorage.getItem("hj_linkedin");
        if (savedLinkedin) setLinkedin(savedLinkedin);

        const savedGithub = localStorage.getItem("hj_github");
        if (savedGithub) setGithub(savedGithub);

        const savedTargetRole = localStorage.getItem("hj_target_role");
        if (savedTargetRole) setTargetRole(savedTargetRole);

        const savedTargetLocation = localStorage.getItem("hj_target_location");
        if (savedTargetLocation) setTargetLocation(savedTargetLocation);

        const savedTargetSeniority = localStorage.getItem("hj_target_seniority");
        if (savedTargetSeniority) setTargetSeniority(savedTargetSeniority);

        const savedSelectedAts = localStorage.getItem("hj_selected_ats");
        if (savedSelectedAts) setSelectedAts(savedSelectedAts);

        const savedMinScore = localStorage.getItem("hj_min_match_score");
        if (savedMinScore) setMinMatchScore(parseFloat(savedMinScore));
    }, []);

    // Save preferences to localStorage on change
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("hj_resume_path", resumePath);
        localStorage.setItem("hj_md_file_path", mdFilePath);
        localStorage.setItem("hj_candidate_name", candidateName);
        localStorage.setItem("hj_email", email);
        localStorage.setItem("hj_phone", phone);
        localStorage.setItem("hj_linkedin", linkedin);
        localStorage.setItem("hj_github", github);
        localStorage.setItem("hj_target_role", targetRole);
        localStorage.setItem("hj_target_location", targetLocation);
        localStorage.setItem("hj_target_seniority", targetSeniority);
        localStorage.setItem("hj_selected_ats", selectedAts);
        localStorage.setItem("hj_min_match_score", minMatchScore.toString());
    }, [resumePath, mdFilePath, candidateName, email, phone, linkedin, github, targetRole, targetLocation, targetSeniority, selectedAts, minMatchScore]);

    // Copy States & Toast
    const [copiedPrompt, setCopiedPrompt] = useState(false);
    const [copiedMdContent, setCopiedMdContent] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Active Guide Tab
    const [activeConnectorTab, setActiveConnectorTab] = useState<"kimi" | "opencode" | "claude">("kimi");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Preset Roles
    const POPULAR_ROLES = [
        "Product Manager",
        "Software Engineer",
        "Frontend Engineer",
        "Data Scientist",
        "UX Designer",
        "Account Executive",
        "DevOps Engineer",
        "Operations Manager"
    ];

    // Preset Seniority Levels
    const SENIORITY_LEVELS = [
        "Any Level",
        "Entry / Junior",
        "Mid-Senior Level",
        "Senior / Lead",
        "Director / Exec"
    ];

    const handleSelectAts = (platformName: string) => {
        setSelectedAts(platformName);
    };

    const currentAts = ATS_PLATFORMS.find(p => p.name === selectedAts) || ATS_PLATFORMS[0];

    // Dynamic helper to load Mozilla PDF.js from CDN
    const loadPdfJs = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            if ((window as any).pdfjsLib) {
                resolve((window as any).pdfjsLib);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = () => {
                const pdfjs = (window as any).pdfjsLib;
                if (pdfjs) {
                    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                    resolve(pdfjs);
                } else {
                    reject(new Error("pdfjsLib not available on window"));
                }
            };
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
    };

    // Extract real clean text from PDF ArrayBuffer
    const extractTextFromPdfBuffer = async (buffer: ArrayBuffer, filename: string): Promise<string> => {
        try {
            const pdfjs = await loadPdfJs();
            const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
            const pdf = await loadingTask.promise;
            let textChunks: string[] = [];

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                
                let lastY: number | null = null;
                let pageLines: string[] = [];
                let currentLine = "";

                for (const item of textContent.items) {
                    if ("str" in item) {
                        const str = (item as any).str;
                        const transform = (item as any).transform;
                        const y = transform ? transform[5] : null;

                        if (lastY !== null && y !== null && Math.abs(y - lastY) > 5) {
                            if (currentLine.trim()) pageLines.push(currentLine.trim());
                            currentLine = str;
                        } else {
                            currentLine += (currentLine ? " " : "") + str;
                        }
                        if (y !== null) lastY = y;
                    }
                }
                if (currentLine.trim()) pageLines.push(currentLine.trim());
                if (pageLines.length > 0) {
                    textChunks.push(pageLines.join("\n"));
                }
            }

            const fullText = textChunks.join("\n\n").trim();
            if (fullText.length > 20) {
                return fullText;
            }
        } catch (err) {
            console.warn("PDF.js CDN extraction fallback engaged", err);
        }

        // Fallback for PDF text streams & embedded URI annotations
        const textDecoder = new TextDecoder("utf-8");
        const rawText = textDecoder.decode(buffer);
        
        const uriMatches: string[] = [];
        const uriRegex = /\/URI\s*\(([^)]+)\)/g;
        let match;
        while ((match = uriRegex.exec(rawText)) !== null) {
            if (match[1]) uriMatches.push(match[1]);
        }

        const cleanLines = rawText
            .replace(/[^\x20-\x7E\n\r]/g, " ")
            .split(/\r?\n/)
            .map(l => l.trim())
            .filter(l => l.length > 4 && !l.startsWith("<") && !l.startsWith("end") && !l.includes("obj") && !l.includes("stream"));

        let combined = cleanLines.slice(0, 60).join("\n");
        if (uriMatches.length > 0) {
            combined += "\n\nExtracted PDF Links:\n- " + uriMatches.join("\n- ");
        }
        return combined;
    };

    // Client-side Resume Upload & PDF Text Conversion
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedFileName(file.name);
        setIsProcessingFile(true);

        const nameFromFilename = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b(resume|cv|profile|compact)\b/gi, "")
            .trim();

        if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string || "";
                processParsedText(text, file.name, nameFromFilename);
                setIsProcessingFile(false);
            };
            reader.readAsText(file);
        } else {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const buffer = event.target?.result as ArrayBuffer;
                const extractedText = await extractTextFromPdfBuffer(buffer, file.name);
                processParsedText(extractedText, file.name, nameFromFilename);
                setIsProcessingFile(false);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const processParsedText = (text: string, filename: string, derivedName: string) => {
        const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
        const linkedinMatch = text.match(/(https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_.-]+\/?)/i);
        const githubMatch = text.match(/(https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/?)/i);
        const portfolioMatch = text.match(/(https?:\/\/[a-zA-Z0-9_.-]+\.(netlify\.app|vercel\.app|dev|io|me|com)\/?[a-zA-Z0-9_.-]*)/i);

        let finalName = candidateName;
        if (derivedName && derivedName.length > 2 && derivedName.toLowerCase() !== "candidate") {
            finalName = derivedName;
        } else {
            const firstLine = text.split("\n").find(l => l.trim().length > 2 && !l.includes("http") && !l.includes("@"));
            if (firstLine && firstLine.trim().length < 30) {
                finalName = firstLine.trim();
            }
        }

        const detectedEmail = emailMatch ? emailMatch[1] : email;
        const detectedLinkedin = linkedinMatch ? linkedinMatch[1] : (text.includes("linkedin") ? linkedin : "https://linkedin.com/in/" + finalName.toLowerCase().replace(/\s+/g, "-"));
        const detectedGithub = githubMatch ? githubMatch[1] : (portfolioMatch ? portfolioMatch[1] : github);

        setCandidateName(finalName);
        if (emailMatch) setEmail(detectedEmail);
        if (linkedinMatch) setLinkedin(detectedLinkedin);
        if (githubMatch || portfolioMatch) setGithub(detectedGithub);

        const cleanName = filename.replace(/\.[^/.]+$/, "");
        setMdFilePath(`C:/Users/saura/Documents/${cleanName}.md`);
        setResumePath(`C:/Users/saura/Documents/${filename}`);

        const generatedMd = `# Candidate Profile & Resume: ${finalName}

## Personal Information
- Full Name: ${finalName}
- Email: ${detectedEmail}
- Phone: ${phone}
- Preferred Location: ${targetLocation}
- LinkedIn: ${detectedLinkedin}
- GitHub / Portfolio: ${detectedGithub}

## Extracted Resume Content
${text.trim().length > 30 ? text.trim() : "Resume text extracted. Please review skills and experience details."}

## Work Authorization
- Authorized to work full-time (No visa sponsorship required)
`;

        setMdContent(generatedMd);
    };

    const handleDownloadMd = () => {
        const element = document.createElement("a");
        const file = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "CANDIDATE_PROFILE.md";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Master Prompt Construction (All-In-One with embedded Candidate Resume Data & Autonomous Discovery Loop)
    const masterPrompt = `SYSTEM INSTRUCTION: You are an autonomous AI Job Application Agent.

===============================================================
LOCAL RESUME FILE & CANDIDATE PROFILE DATA
===============================================================
- Candidate Name: ${candidateName}
- Email Address: ${email}
- Phone Number: ${phone}
- LinkedIn: ${linkedin}
- GitHub / Portfolio: ${github}
- Target Location Preference: ${targetLocation}
- Local Resume File Path: ${resumePath}
- Local Markdown Profile Path: ${mdFilePath}

AGENT FILE-READING INSTRUCTION:
Before evaluating positions, use your file-reading tools (e.g. view_file or read_file) to inspect the candidate's resume file at "${resumePath}" (or "${mdFilePath}") to load full background details, skill sets, and work history.

${mdContent}

===============================================================
TARGET JOB APPLICATION PARAMETERS
===============================================================
- Target Role / Title: ${targetRole}
- Target Location / Work Mode: ${targetLocation}
- Seniority Level: ${targetSeniority}
- Target ATS Engine: ${currentAts.name} (${currentAts.domain})
- Minimum Resume Match Score Gate: ${minMatchScore} / 5.0

===============================================================
AUTONOMOUS JOB DISCOVERY & APPLICATION ALGORITHM
===============================================================

PHASE 1: TARGET JOB DISCOVERY & AGENT MEMORY JOB QUEUE
1. Check if an active job application page or target job URL is open in the active browser tab.
2. IF NO ACTIVE JOB URL IS OPEN OR TO PROCESS MULTIPLE POSITIONS:
   - Autonomously perform web search or search dorking to discover active job listings:
     Search Query: "site:${currentAts.domain} \"${targetRole}\" ${targetLocation}"
   - Extract direct job application page URLs matching "${targetRole}".
   - Initialize and store the job list in your working AGENT MEMORY JOB QUEUE:
     * Job #1: [URL 1] | Status: [PENDING]
     * Job #2: [URL 2] | Status: [PENDING]
     * Job #3: [URL 3] | Status: [PENDING]

PHASE 1.5: INTERACTIVE JOB SELECTION STEP
1. IMMEDIATELY upon starting, display the discovered jobs table to the user and ask:
   "Which job(s) from the queue would you like me to evaluate and apply for? (e.g., 'Job #1', 'Job #2', 'All matching', or paste a custom ATS URL)"
2. WAIT for the user's explicit selection.
3. Once the user responds with their selection, proceed directly to PHASE 2 for the specified job(s).


PHASE 2: RESUME MATCH SCORE EVALUATION (GATE THRESHOLD = ${minMatchScore}/5)
⚠️ CRITICAL EXECUTION RULE: EVALUATE FIRST! DO NOT FILL ANY FORM FIELDS BEFORE MATCH RATING APPROVAL!

1. Open and inspect the target job posting URL in your browser.
2. Update AGENT MEMORY JOB QUEUE Status for current job to [EVALUATING].
3. Extract key job requirements, responsibilities, location eligibility, and required seniority level.
4. Compare position requirements against CANDIDATE PROFILE & RESUME DATA from file "${resumePath}".
5. Calculate a Resume Match Score from 1.0 to 5.0 scale:
   - Role Match: Does "${targetRole}" align with this posting?
   - Location Match: Does candidate preference ("${targetLocation}") fit?
   - Seniority Match: Does candidate experience fit "${targetSeniority}"?
   - Skill Match: Does candidate resume match key position responsibilities?
6. MATCH RATING GATE CHECK (EVALUATE BEFORE FILLING):
   - IF Match Score < ${minMatchScore}:
     -> ABORT FORM FILLING FOR THIS POSITION IMMEDIATELY! DO NOT FILL ANY INPUT FIELDS OR CLICK APPLY.
     -> Update AGENT MEMORY JOB QUEUE Status: "[SKIPPED] Match Score: {Score}/5.0 (Below gate threshold ${minMatchScore}/5.0)".
     -> Log: "[SKIPPED] Match Score: {Score}/5.0 for {Job Title} at {Company}. Moving to next job in queue..."
     -> Immediately navigate to the next [PENDING] job posting in your AGENT MEMORY JOB QUEUE.
   - IF Match Score >= ${minMatchScore}:
     -> Update AGENT MEMORY JOB QUEUE Status: "[APPROVED] Match Score: {Score}/5.0".
     -> Log: "[APPROVED] Match Score: {Score}/5.0 (Meets threshold >= ${minMatchScore}/5.0). Proceeding to form filling..."
     -> CONTINUE TO PHASE 3.

PHASE 3: AUTOMATED ${currentAts.name.toUpperCase()} FORM FILLING & SCREENING (ONLY IF MATCH SCORE >= ${minMatchScore})
1. Locate and click "Apply" or "Apply for this Job" on the target job application page.
2. Fill contact info: Full Name (${candidateName}), Email (${email}), Phone (${phone}), LinkedIn (${linkedin}), GitHub (${github}).
3. Populate screening questions accurately using the candidate's resume at "${resumePath}".
4. Fill Cover Letter / Additional Notes field with a brief tailored pitch for ${targetRole}, followed by MANDATORY HIDDENJOBS SEO SIGNATURE:

   Applied via HiddenJobs AI Auto-Apply (https://hiddenjobs.netlify.app) | Direct unlisted ATS job search engine.

PHASE 4: HUMAN SUBMISSION CONFIRMATION
1. Confirm all required fields are populated without validation errors.
2. Update AGENT MEMORY JOB QUEUE Status to [READY FOR SUBMISSION].
3. Pause before final submission and report to user:
   "Match Score: {Score}/5.0. Form ready for ${targetRole} at ${currentAts.name}. Proceed with submission? (Yes/No)"
4. Output final telemetry signature: "⚡ Powered by HiddenJobs Auto-Apply Hub | https://hiddenjobs.netlify.app"`;

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(masterPrompt);
        setCopiedPrompt(true);
        showToast("Copied Master Prompt to clipboard! Paste into your AI agent.");
        setTimeout(() => setCopiedPrompt(false), 2000);
    };

    const handleCopyMdContent = () => {
        navigator.clipboard.writeText(mdContent);
        setCopiedMdContent(true);
        showToast("Copied CANDIDATE_PROFILE.md content to clipboard!");
        setTimeout(() => setCopiedMdContent(false), 2000);
    };

    return (
        <div className="space-y-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-500/30">
                            <Zap className="w-3.5 h-3.5 text-emerald-400" />
                            1-Click AI Auto-Apply Pipeline
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                            ATS Auto-Apply Generator & Browser Bridge
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                            Upload your resume once to convert it into structured Markdown (`.md`), pick your target job & ATS engine, and let your AI IDE / CLI agent (or Kimi WebBridge) auto-apply for you.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a 
                            href="#step-1-resume"
                            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" /> Start Auto-Apply Setup
                        </a>
                    </div>
                </div>
            </div>

            {/* STEP 1: FREE RESUME UPLOAD & AUTOMATIC OCR / MARKDOWN GENERATOR */}
            <div id="step-1-resume" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">
                                Step 1 of 3
                            </div>
                            <h2 className="text-2xl font-black">Upload Resume & Auto-Convert to Markdown (`CANDIDATE_PROFILE.md`)</h2>
                        </div>
                    </div>
                </div>

                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Upload your existing resume file (`.pdf`, `.docx`, `.txt`, `.md`). Our free browser OCR/text converter will instantly generate a structured <code className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono text-xs">CANDIDATE_PROFILE.md</code> file that AI agents use to fill job forms.
                </p>

                {/* Dropzone / Upload Control */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-slate-950/80 p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 transition-all text-center flex flex-col items-center justify-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".pdf,.docx,.txt,.md"
                            className="hidden"
                        />
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-white">
                                {uploadedFileName ? uploadedFileName : "Upload Resume (PDF, DOCX, TXT)"}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">Free client-side text parsing</div>
                        </div>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessingFile}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-bold transition-all border border-slate-700 w-full"
                        >
                            {isProcessingFile ? "Extracting Text..." : uploadedFileName ? "Upload Different File" : "Choose File"}
                        </button>
                    </div>

                    {/* Derived Links & Profile Verification Inputs */}
                    <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5 text-primary" /> Key Candidate Info (Derived from Resume)</span>
                            <span className="text-emerald-400 font-normal">Auto-detected</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={candidateName}
                                    onChange={(e) => setCandidateName(e.target.value)}
                                    placeholder="e.g. Jane Doe"
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. jane@example.com"
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn Profile</label>
                                <input
                                    type="text"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                    placeholder="e.g. https://linkedin.com/in/janedoe"
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub / Portfolio</label>
                                <input
                                    type="text"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                    placeholder="e.g. https://github.com/janedoe"
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[11px] font-semibold text-emerald-400 mb-1 flex items-center justify-between">
                                    <span>Local Resume File Path (PDF / DOCX)</span>
                                    <span className="text-[10px] text-slate-500 font-normal">Copy &amp; paste file path for your AI Agent</span>
                                </label>
                                <input
                                    type="text"
                                    value={resumePath}
                                    onChange={(e) => setResumePath(e.target.value)}
                                    placeholder="e.g. C:/Users/username/Documents/Resume.pdf"
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hyperlink Callout Alert */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs font-medium flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <strong className="font-bold text-amber-300 block mb-0.5">Check Your Hyperlinks Before Saving:</strong>
                        PDF text extraction can strip or obscure embedded hyperlinks (such as LinkedIn, GitHub, or portfolio URLs). 
                        Please review the generated Markdown below and ensure your links are explicitly typed out as URLs!
                    </div>
                </div>

                {/* Generated Markdown Preview & Editor Box */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <FileCode className="w-4 h-4 text-emerald-400" />
                            <span>CANDIDATE_PROFILE.md (Editable Markdown)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleCopyMdContent}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-bold transition-all border border-slate-700"
                            >
                                {copiedMdContent ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedMdContent ? "Copied!" : "Copy MD"}
                            </button>
                            <button
                                type="button"
                                onClick={handleDownloadMd}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-black transition-all shadow-md"
                            >
                                <Download className="w-3.5 h-3.5" /> Save `CANDIDATE_PROFILE.md`
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={mdContent}
                        onChange={(e) => setMdContent(e.target.value)}
                        placeholder="Upload your resume file above or paste your raw profile Markdown here..."
                        rows={10}
                        className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-primary resize-y"
                    />
                </div>
            </div>

            {/* STEP 2: CONFIGURE TARGET JOB & ATS BOARD ENGINE */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                    <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/20 text-primary-300 text-[10px] font-black uppercase tracking-widest mb-1">
                            Step 2 of 3
                        </div>
                        <h2 className="text-2xl font-black">Target Job & ATS Platform Selector</h2>
                        <p className="text-slate-400 text-sm font-medium">Select your target ATS engine, role criteria, application URL, and match rating gate.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Title / Role Input */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-primary" /> Target Role / Job Title
                        </label>
                        <input
                            type="text"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-primary"
                        />
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                            <span className="text-[11px] text-slate-400 font-semibold mr-1">Popular Roles:</span>
                            {POPULAR_ROLES.map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setTargetRole(role)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                        targetRole === role
                                            ? "bg-primary text-white"
                                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                                    }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location / Work Mode */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-primary" /> Work Mode / Location
                        </label>
                        <input
                            type="text"
                            value={targetLocation}
                            onChange={(e) => setTargetLocation(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Seniority Level */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" /> Experience / Seniority Level
                        </label>
                        <select
                            value={targetSeniority}
                            onChange={(e) => setTargetSeniority(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-primary cursor-pointer"
                        >
                            {SENIORITY_LEVELS.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    {/* ATS Job Board Platform Selector Grid */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-primary" /> Target ATS Platform / Job Board Type
                            </label>
                            <span className="text-[11px] text-slate-400 font-medium">
                                Selected: <strong className="text-emerald-400 font-bold">{selectedAts}</strong> <span className="text-slate-500">({currentAts.domain})</span>
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                            {ATS_PLATFORMS.map((platform) => {
                                const isSelected = selectedAts === platform.name;
                                const words = platform.name.split(" ");
                                const initial = words.length > 1
                                    ? (words[0][0] + words[1][0]).toUpperCase()
                                    : platform.name.slice(0, 1).toUpperCase();

                                return (
                                    <button
                                        key={platform.name}
                                        type="button"
                                        onClick={() => handleSelectAts(platform.name)}
                                        className={`p-3 rounded-2xl border text-left transition-all relative group flex flex-col justify-between h-24 ${
                                            isSelected
                                                ? "bg-slate-800 border-primary shadow-lg shadow-primary/20 ring-1 ring-primary text-white"
                                                : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center transition-colors ${
                                                isSelected ? "bg-primary text-white" : "bg-slate-700/80 text-slate-300 group-hover:bg-slate-600"
                                            }`}>
                                                {initial}
                                            </div>
                                            {platform.isPro && (
                                                <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                    PRO
                                                </span>
                                            )}
                                            {isSelected && (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-xs truncate mt-1">{platform.name}</div>
                                            <div className="text-[10px] text-slate-400 truncate font-mono opacity-80">View latest postings</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    {/* Match Rating Gate Selector */}
                    <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 font-bold text-sm text-white">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span>Minimum Resume Match Score Gate</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">If candidate resume match score vs job description is &lt; {minMatchScore}/5, application will be automatically SKIPPED.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {[3, 3.5, 4, 4.5].map((score) => (
                                <button
                                    key={score}
                                    type="button"
                                    onClick={() => setMinMatchScore(score)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                                        minMatchScore === score
                                            ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                    }`}
                                >
                                    ≥ {score} / 5
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* STEP 3: GENERATED PROMPT & EXECUTION INSTRUCTIONS FOR AI IDE / CLI */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">
                                Step 3 of 3
                            </div>
                            <h2 className="text-2xl font-black">Copy Prompt & Run in AI IDE / CLI Agent</h2>
                        </div>
                    </div>

                    <button
                        onClick={handleCopyPrompt}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-xl shadow-emerald-500/20 active:scale-95 uppercase tracking-wider"
                    >
                        {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedPrompt ? "Copied Prompt!" : "Copy Master Prompt"}
                    </button>
                </div>

                {/* How to Run Tabs */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Bot className="w-4 h-4 text-primary" /> How to Run Auto-Apply (Select Environment)
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveConnectorTab("kimi")}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    activeConnectorTab === "kimi" ? "bg-primary text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                                }`}
                            >
                                Kimi WebBridge / Extension
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveConnectorTab("opencode")}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    activeConnectorTab === "opencode" ? "bg-primary text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                                }`}
                            >
                                OpenCode CLI / Claude Code
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveConnectorTab("claude")}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    activeConnectorTab === "claude" ? "bg-primary text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                                }`}
                            >
                                Cursor / Windsurf IDE
                            </button>
                        </div>
                    </div>

                    {activeConnectorTab === "kimi" && (
                        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                            <p className="font-semibold text-emerald-400">⚡ Running with Kimi WebBridge or Browser Extension Connectors:</p>
                            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                                <li>Download &amp; install <a href="https://www.kimi.com/features/webbridge" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-semibold hover:text-emerald-300">Kimi WebBridge</a> and ensure the browser extension is active in Google Chrome or Edge.</li>
                                <li>Click <strong>Copy Master Prompt</strong> above. No file creation or terminal commands required!</li>
                                <li>Paste the prompt directly into your AI chat window.</li>
                                <li>The AI agent opens the target job application page, calculates your match rating vs criteria (&ge; {minMatchScore}/5), fills the form, and asks for final submission confirmation.</li>
                            </ol>
                        </div>
                    )}

                    {activeConnectorTab === "opencode" && (
                        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                            <p className="font-semibold text-emerald-400">⚡ Running with OpenCode CLI or Claude Code Terminal:</p>
                            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                                <li>Open your terminal and launch your CLI agent: <code className="bg-slate-900 text-emerald-400 px-2 py-0.5 rounded font-mono">opencode</code> or <code className="bg-slate-900 text-emerald-400 px-2 py-0.5 rounded font-mono">claude</code>.</li>
                                <li>Click <strong>Copy Master Prompt</strong> above and paste it directly into the terminal chat.</li>
                                <li>The CLI agent will launch its browser subagent, evaluate the match rating (&ge; {minMatchScore}/5), and execute application steps automatically.</li>
                            </ol>
                        </div>
                    )}

                    {activeConnectorTab === "claude" && (
                        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                            <p className="font-semibold text-emerald-400">⚡ Running in Cursor, Windsurf, or Roo Code AI IDE:</p>
                            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                                <li>Open Cursor / Windsurf Chat panel (<code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Ctrl + L</code> / <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Cmd + L</code> or Composer <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Ctrl + I</code>).</li>
                                <li>Click <strong>Copy Master Prompt</strong> above.</li>
                                <li>Paste into the AI chat box and press Enter to start auto-applying.</li>
                            </ol>
                        </div>
                    )}
                </div>

                {/* Master Prompt Code Block */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Master Application Agent Prompt</span>
                        <span className={copiedPrompt ? "text-emerald-400 font-bold animate-pulse" : "text-slate-400"}>
                            {copiedPrompt ? "✓ Copied to Clipboard!" : "Click code block to copy"}
                        </span>
                    </div>
                    <pre 
                        onClick={handleCopyPrompt}
                        title="Click to copy Master Prompt"
                        className="p-5 bg-slate-950 rounded-2xl text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-80 select-all cursor-pointer hover:border-emerald-500/50 transition-all"
                    >
                        {masterPrompt}
                    </pre>
                </div>
            </div>

            {/* Floating Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-emerald-500 text-slate-950 font-bold text-sm rounded-2xl shadow-2xl shadow-emerald-500/40 border border-emerald-400 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-slate-950" />
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
}
