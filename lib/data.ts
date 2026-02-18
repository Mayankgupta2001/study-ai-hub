export type ExamKey = "upsc" | "jee" | "neet" | "ssc";

export interface Exam {
  key: ExamKey;
  name: string;
  fullName: string;
  tools: string[];
  href: string;
  tagColor: string;
  borderColor: string;
  textColor: string;
  linkColor: string;
}

export interface Tool {
  icon: string;
  title: string;
  description: string;
  badge: "Free" | "Pro";
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  exam: ExamKey;
  dotColor: string;
}

export interface TrustPoint {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const EXAMS: Exam[] = [
  {
    key: "upsc",
    name: "UPSC",
    fullName: "Civil Services Examination",
    tools: [
      "Answer writing evaluator",
      "Current affairs summariser",
      "Mains essay structurer",
      "Prelims mock quizzes",
    ],
    href: "/upsc",
    tagColor: "bg-exam-upsc-bg text-exam-upsc",
    borderColor: "border-t-exam-upsc",
    textColor: "text-exam-upsc",
    linkColor: "text-exam-upsc",
  },
  {
    key: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination",
    tools: [
      "Step-by-step problem solver",
      "Concept gap identifier",
      "Formula revision sheets",
      "Chapterwise mock tests",
    ],
    href: "/jee",
    tagColor: "bg-exam-jee-bg text-exam-jee",
    borderColor: "border-t-exam-jee",
    textColor: "text-exam-jee",
    linkColor: "text-exam-jee",
  },
  {
    key: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    tools: [
      "Biology diagram explainer",
      "NCERT passage analyser",
      "Revision flashcard generator",
      "Previous year Q&A bot",
    ],
    href: "/neet",
    tagColor: "bg-exam-neet-bg text-exam-neet",
    borderColor: "border-t-exam-neet",
    textColor: "text-exam-neet",
    linkColor: "text-exam-neet",
  },
  {
    key: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    tools: [
      "Quant shortcut trainer",
      "English grammar drills",
      "GK topic-wise notes",
      "Speed & accuracy tracker",
    ],
    href: "/ssc",
    tagColor: "bg-exam-ssc-bg text-exam-ssc",
    borderColor: "border-t-exam-ssc",
    textColor: "text-exam-ssc",
    linkColor: "text-exam-ssc",
  },
];

export const TOOLS: Tool[] = [
  {
    icon: "✍️",
    title: "Answer Writing Coach",
    description:
      "Paste your UPSC Mains answer. Get feedback on structure, content relevance, intro/conclusion quality, and a score with improvement tips.",
    badge: "Pro",
    href: "/tools/answer-writing-coach",
  },
  {
    icon: "🧮",
    title: "JEE Problem Breakdown",
    description:
      "Enter any Physics, Chemistry, or Maths problem. The tool walks through each step with clear explanations — not just the final answer.",
    badge: "Free",
    href: "/tools/jee-problem-breakdown",
  },
  {
    icon: "📰",
    title: "Current Affairs Digest",
    description:
      "Daily news simplified with UPSC relevance tags. Connects events to static syllabus topics so you know exactly what to revise.",
    badge: "Free",
    href: "/tools/current-affairs",
  },
  {
    icon: "🗂️",
    title: "Flashcard Generator",
    description:
      "Paste any notes or NCERT chapter text. The tool creates concise flashcards you can review and export — works for NEET and SSC GK.",
    badge: "Free",
    href: "/tools/flashcard-generator",
  },
  {
    icon: "📊",
    title: "Weak Area Identifier",
    description:
      "Take a short topic quiz. Based on your responses, the tool identifies knowledge gaps and suggests which subtopics to revisit first.",
    badge: "Pro",
    href: "/tools/weak-area-identifier",
  },
  {
    icon: "📖",
    title: "NCERT Concept Explainer",
    description:
      "Ask any question from NCERT Class 11–12. Get a clear, exam-oriented explanation with examples — no fluff, no off-syllabus content.",
    badge: "Free",
    href: "/tools/ncert-explainer",
  },
];

export const TRUST_POINTS: TrustPoint[] = [
  {
    icon: "📚",
    title: "Syllabus-accurate, always",
    description:
      "Every tool is constrained to official UPSC, JEE, NEET, and SSC syllabi. No irrelevant foreign exam content slips through.",
  },
  {
    icon: "🎓",
    title: "No misleading shortcuts",
    description:
      "We don't promise rank guarantees. We give you better tools and let your effort do the rest — honest and practical.",
  },
  {
    icon: "🔒",
    title: "Your data stays private",
    description:
      "Your queries, answers, and practice data are never shared or used to train external models without your consent.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The answer writing feedback is the most useful thing I've found in two years of UPSC prep. It's blunt, accurate, and specific.",
    author: "Riya S. — UPSC 2024 aspirant, Delhi",
    exam: "upsc",
    dotColor: "bg-exam-upsc",
  },
  {
    quote:
      "I used the JEE problem explainer for a full month before my Mains. Finally understood the derivation behind formulas I was just memorising.",
    author: "Arjun M. — JEE Advanced 2025, Pune",
    exam: "jee",
    dotColor: "bg-exam-jee",
  },
  {
    quote:
      "The flashcard generator saved me weeks. I just paste my handwritten notes and it builds the revision set automatically.",
    author: "Priya K. — NEET 2025 dropper, Chennai",
    exam: "neet",
    dotColor: "bg-exam-neet",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Study AI Hub free to use?",
    answer:
      "Core tools — including the NCERT explainer, flashcard generator, and problem breakdown — are completely free. Advanced tools like the answer writing coach and weak area tracker require a Pro subscription.",
  },
  {
    question: "Does this replace my coaching or books?",
    answer:
      "No, and we don't claim it does. This is a supplementary study aid. Use it alongside your standard preparation materials to clarify doubts, practise writing, and consolidate revision.",
  },
  {
    question: "How accurate is the AI for exam-specific content?",
    answer:
      "All tools are tuned specifically to official syllabi and NCERT content. That said, always cross-verify factual claims against authoritative sources — especially for UPSC, where nuance matters.",
  },
  {
    question: "Is the content available in Hindi?",
    answer:
      "Hindi interface support is coming in Q2 2025. Currently, all tools work best in English, but you can ask questions in Hindi and receive responses in English.",
  },
];

export const STATS = [
  { num: "2.4L+", label: "Students" },
  { num: "40+", label: "AI Tools" },
  { num: "4", label: "Exams Covered" },
];

export const NAV_LINKS = [
  { label: "Exams", href: "#exams" },
  { label: "AI Tools", href: "#tools" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];
