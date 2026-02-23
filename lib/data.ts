// ─── Types ──────────────────────────────────────────────────────────────────

export type ExamKey = "upsc" | "jee" | "neet" | "ssc";

export interface Exam {
  key: ExamKey;
  name: string;
  fullName: string;
  description: string;
  tools: string[];
  href: string;
  accentBorder: string;
  accentText: string;
  accentLink: string;
}

export interface Tool {
  icon: string;
  title: string;
  description: string;
  exam: string;
  badge: "Free" | "Pro";
  href: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Step {
  num: string;
  title: string;
  description: string;
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Exams", href: "#exams" },
  { label: "Tools", href: "#tools" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

// ─── Exams ───────────────────────────────────────────────────────────────────

export const EXAMS: Exam[] = [
  {
    key: "upsc",
    name: "UPSC",
    fullName: "Civil Services Examination",
    description:
      "Tools built around GS papers, essay, and answer writing — mapped to the UPSC CSE syllabus.",
    tools: [
      "Answer writing evaluator",
      "Current affairs digest",
      "Mains essay structurer",
      "Prelims practice quizzes",
    ],
    href: "/ai-tools/upsc",
    accentBorder: "border-t-violet-600",
    accentText: "text-violet-700",
    accentLink: "text-violet-700 group-hover:text-violet-800",
  },
  {
    key: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination",
    description:
      "Step-by-step problem solving and concept gap analysis for Physics, Chemistry, and Mathematics.",
    tools: [
      "Step-by-step problem solver",
      "Concept gap identifier",
      "Formula revision sheets",
      "Chapter-wise practice sets",
    ],
    href: "/ai-tools/jee",
    accentBorder: "border-t-sky-600",
    accentText: "text-sky-700",
    accentLink: "text-sky-700 group-hover:text-sky-800",
  },
  {
    key: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description:
      "Biology, Physics, and Chemistry tools aligned with NCERT content and NEET exam pattern.",
    tools: [
      "Biology diagram explainer",
      "NCERT passage analyser",
      "Flashcard generator",
      "Previous year Q&A",
    ],
    href: "/ai-tools/neet",
    accentBorder: "border-t-emerald-600",
    accentText: "text-emerald-700",
    accentLink: "text-emerald-700 group-hover:text-emerald-800",
  },
  {
    key: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    description:
      "Quant, English, and GK tools designed for CGL, CHSL, and MTS exam patterns.",
    tools: [
      "Quant shortcut trainer",
      "English grammar drills",
      "GK topic-wise notes",
      "Speed and accuracy tracker",
    ],
    href: "/ai-tools/ssc",
    accentBorder: "border-t-amber-600",
    accentText: "text-amber-700",
    accentLink: "text-amber-700 group-hover:text-amber-800",
  },
];

// ─── Tools ───────────────────────────────────────────────────────────────────

export const TOOLS: Tool[] = [
  {
    icon: "✍️",
    title: "Answer Writing Coach",
    description:
      "Submit your UPSC Mains answer and receive structured feedback on argument quality, factual accuracy, and presentation — with an indicative score.",
    exam: "UPSC",
    badge: "Pro",
    href: "/tools/answer-writing-coach",
  },
  {
    icon: "🧮",
    title: "JEE Problem Breakdown",
    description:
      "Paste any JEE problem in Physics, Chemistry, or Maths. The tool works through it step by step, explaining the reasoning at each stage.",
    exam: "JEE",
    badge: "Free",
    href: "/tools/jee-problem-breakdown",
  },
  {
    icon: "📰",
    title: "Current Affairs Digest",
    description:
      "Daily news summarised with explicit tags showing which GS papers and static topics each story connects to.",
    exam: "UPSC",
    badge: "Free",
    href: "/tools/current-affairs",
  },
  {
    icon: "🗂️",
    title: "Flashcard Generator",
    description:
      "Paste chapter notes or NCERT text. The tool produces concise, exportable flashcards suited to NEET biology and SSC GK revision.",
    exam: "NEET · SSC",
    badge: "Free",
    href: "/tools/flashcard-generator",
  },
  {
    icon: "📊",
    title: "Weak Area Identifier",
    description:
      "Answer a short diagnostic quiz. Based on your responses, the tool flags which subtopics need immediate revision before your next practice test.",
    exam: "All exams",
    badge: "Pro",
    href: "/tools/weak-area-identifier",
  },
  {
    icon: "📖",
    title: "NCERT Concept Explainer",
    description:
      "Ask any question from NCERT Class 11 or 12. Get a concise, exam-focused explanation without content that falls outside the official syllabus.",
    exam: "JEE · NEET",
    badge: "Free",
    href: "/tools/ncert-explainer",
  },
];

// ─── How It Works ────────────────────────────────────────────────────────────

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Select your exam",
    description:
      "Choose from UPSC, JEE, NEET, or SSC. All tools and content are filtered to match that exam's official syllabus and paper pattern.",
  },
  {
    num: "02",
    title: "Use the right tool",
    description:
      "Each tool addresses a specific study task — writing practice, concept clarity, flashcard creation, or gap identification. No bloat, no overlap.",
  },
  {
    num: "03",
    title: "Identify and revise",
    description:
      "Review AI feedback, bookmark explanations, and return to weak areas with targeted revision sets. Everything stays in one place.",
  },
];

// ─── Trust Points ────────────────────────────────────────────────────────────

export const TRUST_POINTS: TrustPoint[] = [
  {
    title: "Syllabus-constrained output",
    description:
      "Every tool is scoped to the official UPSC, JEE, NEET, or SSC syllabus. Explanations and practice content do not stray beyond what the exam tests.",
  },
  {
    title: "No rank guarantees",
    description:
      "We do not make claims about outcomes. This platform gives you better tools — your preparation effort determines your result.",
  },
  {
    title: "Verify before you trust",
    description:
      "AI-generated content can contain errors. We recommend cross-checking factual output, particularly for UPSC, against authoritative sources.",
  },
  {
    title: "Your queries are not stored",
    description:
      "Inputs you submit are not logged, retained, or used to retrain models. Each session is independent.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which tools are free?",
    answer:
      "The NCERT Concept Explainer, JEE Problem Breakdown, Current Affairs Digest, and Flashcard Generator are free with no account required. The Answer Writing Coach and Weak Area Identifier require a Pro subscription.",
  },
  {
    question: "Does this replace coaching institutes or standard books?",
    answer:
      "No. This is a supplementary tool. Use it alongside your textbooks and coaching material to clarify concepts, practise writing, and organise revision. It does not cover the full breadth of any exam on its own.",
  },
  {
    question: "How reliable is the AI for exam-specific content?",
    answer:
      "Tools are scoped to official syllabi and NCERT content to reduce irrelevant output. However, AI can produce inaccurate information. Always verify answers against standard references, especially for factual questions in UPSC preparation.",
  },
  {
    question: "Can I use it in Hindi?",
    answer:
      "You can ask questions in Hindi and receive responses in English. A full Hindi interface is planned and will be announced when available.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "The web platform is fully responsive and works on mobile browsers. A dedicated app is on the roadmap.",
  },
];
