import { useState } from "react";

const styles = {
  // Layout
  page: {
    fontFamily: "var(--font-body)",
    color: "var(--slate-700)",
    backgroundColor: "var(--white)",
    margin: 0,
    padding: 0,
  },

  // Navbar
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-4) var(--space-8)",
    backgroundColor: "var(--navy-900)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    textDecoration: "none",
  },
  navLogoIcon: {
    width: 32,
    height: 32,
    borderRadius: "var(--radius-md)",
    background: "var(--gradient-emerald)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  navLogoText: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: 18,
    color: "var(--white)",
    letterSpacing: "-0.3px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-8)",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "var(--slate-300)",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: "var(--weight-medium)",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  navCta: {
    backgroundColor: "var(--emerald-600)",
    color: "var(--white)",
    padding: "var(--space-2) var(--space-5)",
    borderRadius: "var(--radius-md)",
    border: "none",
    fontSize: 14,
    fontWeight: "var(--weight-semibold)",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontFamily: "var(--font-body)",
  },

  // Hero
  hero: {
    background: "var(--gradient-brand)",
    padding: "var(--space-16) var(--space-8) var(--space-16)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    backgroundColor: "rgba(52, 211, 153, 0.15)",
    border: "1px solid rgba(52, 211, 153, 0.35)",
    borderRadius: "var(--radius-full)",
    padding: "var(--space-1) var(--space-4)",
    fontSize: 13,
    fontWeight: "var(--weight-semibold)",
    color: "var(--emerald-400)",
    marginBottom: "var(--space-6)",
  },
  heroHeadline: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: "clamp(36px, 5vw, 64px)",
    color: "var(--white)",
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
    margin: "0 auto var(--space-6)",
    maxWidth: 800,
  },
  heroHeadlineAccent: {
    color: "var(--emerald-400)",
  },
  heroSubtext: {
    fontSize: "clamp(16px, 2vw, 20px)",
    color: "var(--slate-300)",
    maxWidth: 580,
    margin: "0 auto var(--space-10)",
    lineHeight: 1.65,
  },
  heroCtas: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-4)",
    flexWrap: "wrap",
    marginBottom: "var(--space-14)",
  },
  btnPrimary: {
    backgroundColor: "var(--emerald-600)",
    color: "var(--white)",
    padding: "var(--space-4) var(--space-8)",
    borderRadius: "var(--radius-lg)",
    border: "none",
    fontSize: 16,
    fontWeight: "var(--weight-semibold)",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    boxShadow: "0 4px 24px rgba(16, 185, 129, 0.35)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  btnSecondary: {
    backgroundColor: "transparent",
    color: "var(--white)",
    padding: "var(--space-4) var(--space-8)",
    borderRadius: "var(--radius-lg)",
    border: "1.5px solid rgba(255,255,255,0.25)",
    fontSize: 16,
    fontWeight: "var(--weight-semibold)",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
  },

  // Dashboard card
  dashboardCard: {
    maxWidth: 720,
    margin: "0 auto",
    backgroundColor: "var(--navy-800)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "var(--shadow-xl)",
    overflow: "hidden",
  },
  dashboardBar: {
    backgroundColor: "var(--navy-900)",
    padding: "var(--space-3) var(--space-5)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  dashboardTitle: {
    marginLeft: "var(--space-3)",
    fontSize: 13,
    color: "var(--slate-400)",
    fontWeight: "var(--weight-medium)",
  },
  dashboardBody: {
    padding: "var(--space-5) var(--space-6)",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "var(--space-4)",
  },
  dashboardSectionTitle: {
    fontSize: 12,
    fontWeight: "var(--weight-semibold)",
    color: "var(--slate-400)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  dashboardFilterBtn: {
    fontSize: 11,
    color: "var(--emerald-400)",
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    border: "1px solid rgba(52, 211, 153, 0.25)",
    borderRadius: "var(--radius-md)",
    padding: "2px 10px",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },
  dealRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-3) var(--space-4)",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "var(--radius-md)",
    marginBottom: "var(--space-2)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  dealLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  dealName: {
    fontSize: 14,
    fontWeight: "var(--weight-semibold)",
    color: "var(--white)",
    marginBottom: 2,
  },
  dealCompany: {
    fontSize: 12,
    color: "var(--slate-400)",
  },
  dealRight: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
  },
  dealValue: {
    fontSize: 14,
    fontWeight: "var(--weight-semibold)",
    color: "var(--white)",
  },
  dealScore: {
    fontSize: 12,
    fontWeight: "var(--weight-bold)",
    color: "var(--emerald-400)",
    minWidth: 36,
    textAlign: "right",
  },

  // Stats
  statsBar: {
    background: "var(--navy-900)",
    padding: "var(--space-10) var(--space-8)",
    display: "flex",
    justifyContent: "center",
    gap: "var(--space-16)",
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: "clamp(28px, 4vw, 40px)",
    color: "var(--white)",
    letterSpacing: "-1px",
    marginBottom: "var(--space-1)",
  },
  statLabel: {
    fontSize: 14,
    color: "var(--slate-400)",
    fontWeight: "var(--weight-medium)",
  },

  // Section
  section: {
    padding: "var(--space-16) var(--space-8)",
    maxWidth: 1120,
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "var(--weight-semibold)",
    color: "var(--emerald-600)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "var(--space-3)",
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: "clamp(28px, 3.5vw, 44px)",
    color: "var(--navy-900)",
    lineHeight: 1.15,
    letterSpacing: "-0.8px",
    margin: "0 0 var(--space-4) 0",
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "var(--slate-600)",
    maxWidth: 540,
    lineHeight: 1.6,
    marginBottom: "var(--space-12)",
  },

  // Features
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "var(--space-6)",
  },
  featureCard: {
    backgroundColor: "var(--white)",
    border: "1px solid var(--slate-200)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-7)",
    boxShadow: "var(--shadow-md)",
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: "var(--space-4)",
    display: "block",
  },
  featureTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-semibold)",
    fontSize: 18,
    color: "var(--navy-900)",
    marginBottom: "var(--space-2)",
  },
  featureDesc: {
    fontSize: 15,
    color: "var(--slate-600)",
    lineHeight: 1.65,
  },

  // AI Demo section
  aiSection: {
    backgroundColor: "var(--navy-900)",
    padding: "var(--space-16) var(--space-8)",
  },
  aiInner: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--space-14)",
    alignItems: "center",
  },
  aiLabelDark: {
    fontSize: 13,
    fontWeight: "var(--weight-semibold)",
    color: "var(--emerald-400)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "var(--space-3)",
  },
  aiTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: "clamp(26px, 3vw, 40px)",
    color: "var(--white)",
    lineHeight: 1.2,
    letterSpacing: "-0.8px",
    marginBottom: "var(--space-5)",
  },
  aiDesc: {
    fontSize: 17,
    color: "var(--slate-300)",
    lineHeight: 1.65,
    marginBottom: "var(--space-8)",
  },
  aiFeatureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
  },
  aiFeatureItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    fontSize: 15,
    color: "var(--slate-300)",
    fontWeight: "var(--weight-medium)",
  },
  aiFeatureDot: {
    width: 8,
    height: 8,
    borderRadius: "var(--radius-full)",
    backgroundColor: "var(--emerald-500)",
    flexShrink: 0,
  },

  // Chat UI
  chatCard: {
    backgroundColor: "var(--navy-800)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "var(--shadow-xl)",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "var(--navy-900)",
    padding: "var(--space-4) var(--space-5)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  chatHeaderIcon: {
    width: 36,
    height: 36,
    borderRadius: "var(--radius-md)",
    background: "var(--gradient-emerald)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 14,
    fontWeight: "var(--weight-semibold)",
    color: "var(--white)",
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: "var(--emerald-400)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
  },
  chatBody: {
    padding: "var(--space-5)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)",
  },
  chatMsgUser: {
    display: "flex",
    justifyContent: "flex-end",
  },
  chatMsgAi: {
    display: "flex",
    justifyContent: "flex-start",
  },
  chatBubbleUser: {
    backgroundColor: "var(--emerald-600)",
    color: "var(--white)",
    borderRadius: "var(--radius-lg) var(--radius-lg) var(--radius-md) var(--radius-lg)",
    padding: "var(--space-3) var(--space-4)",
    fontSize: 14,
    maxWidth: "75%",
    lineHeight: 1.55,
  },
  chatBubbleAi: {
    backgroundColor: "rgba(255,255,255,0.07)",
    color: "var(--slate-200)",
    borderRadius: "var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-md)",
    padding: "var(--space-3) var(--space-4)",
    fontSize: 14,
    maxWidth: "85%",
    lineHeight: 1.55,
    border: "1px solid rgba(255,255,255,0.07)",
  },
  chatLeadItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    marginTop: "var(--space-2)",
    paddingTop: "var(--space-2)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    fontSize: 13,
    color: "var(--slate-300)",
  },
  chatLeadScore: {
    marginLeft: "auto",
    fontSize: 12,
    fontWeight: "var(--weight-bold)",
    color: "var(--emerald-400)",
  },
  chatInput: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "var(--space-3) var(--space-5)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    backgroundColor: "var(--navy-900)",
  },
  chatInputField: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "var(--radius-md)",
    padding: "var(--space-2) var(--space-4)",
    fontSize: 13,
    color: "var(--slate-400)",
    fontFamily: "var(--font-body)",
    outline: "none",
  },
  chatSendBtn: {
    width: 34,
    height: 34,
    borderRadius: "var(--radius-md)",
    backgroundColor: "var(--emerald-600)",
    border: "none",
    color: "var(--white)",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-body)",
  },

  // Pricing
  pricingSection: {
    backgroundColor: "var(--slate-100)",
    padding: "var(--space-16) var(--space-8)",
  },
  pricingInner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "var(--space-6)",
    alignItems: "start",
  },
  pricingBadge: {
    position: "absolute",
    top: -14,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "var(--emerald-600)",
    color: "var(--white)",
    fontSize: 12,
    fontWeight: "var(--weight-bold)",
    padding: "var(--space-1) var(--space-4)",
    borderRadius: "var(--radius-full)",
    whiteSpace: "nowrap",
  },
  pricingTier: {
    fontSize: 13,
    fontWeight: "var(--weight-semibold)",
    color: "var(--slate-400)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "var(--space-3)",
  },
  pricingPrice: {
    display: "flex",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: "var(--space-2)",
  },
  pricingAmount: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: 48,
    color: "var(--navy-900)",
    lineHeight: 1,
    letterSpacing: "-2px",
  },
  pricingPer: {
    fontSize: 15,
    color: "var(--slate-400)",
    paddingBottom: 6,
  },
  pricingDesc: {
    fontSize: 14,
    color: "var(--slate-600)",
    marginBottom: "var(--space-6)",
    lineHeight: 1.5,
  },
  pricingFeatures: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 var(--space-8) 0",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
  },
  pricingFeatureItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    fontSize: 14,
    color: "var(--slate-700)",
  },
  pricingCheck: {
    color: "var(--emerald-600)",
    fontWeight: "var(--weight-bold)",
    fontSize: 15,
    flexShrink: 0,
  },

  // FAQ
  faqSection: {
    padding: "var(--space-16) var(--space-8)",
    maxWidth: 760,
    margin: "0 auto",
  },
  faqItem: {
    border: "1px solid var(--slate-200)",
    borderRadius: "var(--radius-lg)",
    marginBottom: "var(--space-3)",
    overflow: "hidden",
  },
  faqAnswer: {
    padding: "0 var(--space-6) var(--space-5)",
    fontSize: 15,
    color: "var(--slate-600)",
    lineHeight: 1.7,
    backgroundColor: "var(--white)",
  },

  // Footer
  footer: {
    backgroundColor: "var(--navy-900)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "var(--space-12) var(--space-8) var(--space-8)",
  },
  footerInner: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "var(--space-10)",
    marginBottom: "var(--space-10)",
    paddingBottom: "var(--space-10)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  footerBrand: {
    maxWidth: 300,
  },
  footerLogoRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    marginBottom: "var(--space-4)",
  },
  footerLogoIcon: {
    width: 30,
    height: 30,
    borderRadius: "var(--radius-md)",
    background: "var(--gradient-emerald)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  footerLogoText: {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-bold)",
    fontSize: 17,
    color: "var(--white)",
    letterSpacing: "-0.3px",
  },
  footerTagline: {
    fontSize: 14,
    color: "var(--slate-400)",
    lineHeight: 1.65,
    margin: 0,
  },
  footerLinks: {
    display: "flex",
    gap: "var(--space-12)",
    flexWrap: "wrap",
  },
  footerLinkGroupTitle: {
    fontSize: 13,
    fontWeight: "var(--weight-semibold)",
    color: "var(--white)",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    marginBottom: "var(--space-4)",
  },
  footerLinkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
  },
  footerLink: {
    fontSize: 14,
    color: "var(--slate-400)",
    textDecoration: "none",
    cursor: "pointer",
  },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--space-4)",
  },
  footerCopy: {
    fontSize: 13,
    color: "var(--slate-400)",
  },
  footerLegal: {
    display: "flex",
    gap: "var(--space-6)",
  },
};

const deals = [
  {
    initials: "AC",
    avatarBg: "#6366f1",
    name: "Alex Chen",
    company: "Stripe Inc.",
    value: "$48,500",
    stage: "Negotiation",
    stageColor: "#f59e0b",
    stageBg: "rgba(245,158,11,0.12)",
    score: "94",
  },
  {
    initials: "SM",
    avatarBg: "#ec4899",
    name: "Sarah Miller",
    company: "Notion Labs",
    value: "$32,000",
    stage: "Proposal",
    stageColor: "#3b82f6",
    stageBg: "rgba(59,130,246,0.12)",
    score: "87",
  },
  {
    initials: "JR",
    avatarBg: "#10b981",
    name: "Jake Rivera",
    company: "Linear HQ",
    value: "$15,750",
    stage: "Demo",
    stageColor: "#10b981",
    stageBg: "rgba(16,185,129,0.12)",
    score: "76",
  },
  {
    initials: "LP",
    avatarBg: "#f97316",
    name: "Laura Park",
    company: "Figma Co.",
    value: "$91,200",
    stage: "Closed Won",
    stageColor: "#22c55e",
    stageBg: "rgba(34,197,94,0.12)",
    score: "99",
  },
];

const features = [
  {
    icon: "🎯",
    title: "AI Lead Scoring",
    desc: "Our ML models analyze 200+ behavioral signals to rank every lead so your team always knows who to call first.",
  },
  {
    icon: "📊",
    title: "Pipeline Management",
    desc: "Visual drag-and-drop pipelines with deal health indicators, stage velocity tracking, and revenue forecasting.",
  },
  {
    icon: "📧",
    title: "Email Automation",
    desc: "Send hyper-personalized outreach sequences that adapt based on opens, clicks, and reply sentiment.",
  },
  {
    icon: "📈",
    title: "Real-time Analytics",
    desc: "Live dashboards with cohort analysis, rep performance rankings, and churn prediction models built in.",
  },
  {
    icon: "📱",
    title: "Mobile CRM",
    desc: "Full-featured iOS and Android apps with offline sync so your reps can close deals from anywhere.",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    desc: "Shared deal rooms, internal notes, @mentions, and activity feeds keep every stakeholder aligned.",
  },
];

const faqs = [
  {
    q: "How does AI lead scoring work?",
    a: "Our AI analyzes over 200 behavioral and firmographic signals — including email engagement, website visits, company size, industry, and historical close rates — to generate a real-time score (0–100) for every lead. Scores refresh hourly as new activity is detected, so your team always works from the freshest data.",
  },
  {
    q: "Can I import my existing CRM data?",
    a: "Yes. AutoPilot CRM supports one-click imports from Salesforce, HubSpot, Pipedrive, and any CSV export. Our onboarding team runs a live data migration session at no extra charge to make sure field mappings and historical records come across cleanly.",
  },
  {
    q: "Is there a free trial?",
    a: "Absolutely. Every plan starts with a 14-day free trial — no credit card required. You get full access to all features so you can properly evaluate AutoPilot CRM with your real data and team.",
  },
  {
    q: "How many users can I add?",
    a: "The Starter plan includes up to 5 users. The Professional plan supports up to 25 users with role-based permissions. Enterprise plans include unlimited seats with advanced SSO and directory sync via Okta, Azure AD, or Google Workspace.",
  },
  {
    q: "What integrations do you support?",
    a: "We natively integrate with Gmail, Outlook, Slack, Zoom, Calendly, LinkedIn Sales Navigator, Stripe, Zapier, and 60+ more tools. Our public REST API and webhooks let you connect any custom tool your team relies on.",
  },
];

const pricingTiers = [
  {
    tier: "Starter",
    amount: "$49",
    per: "/mo",
    desc: "Perfect for small sales teams getting started with CRM and AI automation.",
    features: [
      "Up to 5 users",
      "AI lead scoring",
      "500 contacts",
      "Email automation",
      "Mobile app",
      "Standard support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    ctaAction: true,
  },
  {
    tier: "Professional",
    amount: "$99",
    per: "/mo",
    desc: "Everything your growing team needs to accelerate revenue and close bigger deals.",
    features: [
      "Up to 25 users",
      "Advanced AI copilot",
      "Unlimited contacts",
      "Pipeline automation",
      "Real-time analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
    ctaAction: true,
  },
  {
    tier: "Enterprise",
    amount: "Custom",
    per: "",
    desc: "Tailored pricing and dedicated support for large-scale enterprise deployments.",
    features: [
      "Unlimited users",
      "Custom AI models",
      "SSO & directory sync",
      "Dedicated success manager",
      "SLA guarantees",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
    ctaAction: false,
  },
];

export default function LandingPage({ onLaunchApp }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <a style={styles.navLogo} href="#">
          <div style={styles.navLogoIcon}>🚀</div>
          <span style={styles.navLogoText}>AutoPilot CRM</span>
        </a>
        <ul style={styles.navLinks}>
          <li><a style={styles.navLink} href="#features">Features</a></li>
          <li><a style={styles.navLink} href="#pricing">Pricing</a></li>
          <li><a style={styles.navLink} href="#demo">Demo</a></li>
        </ul>
        <button style={styles.navCta} onClick={onLaunchApp}>
          Get Started Free
        </button>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span>✨</span>
          <span>Powered by GPT-4 + Proprietary ML</span>
        </div>
        <h1 style={styles.heroHeadline}>
          Close More Deals with{" "}
          <span style={styles.heroHeadlineAccent}>AI-Powered CRM</span>
        </h1>
        <p style={styles.heroSubtext}>
          AutoPilot CRM uses machine learning to prioritize your leads, automate follow-ups, and give your sales team superpowers.
        </p>
        <div style={styles.heroCtas}>
          <button style={styles.btnPrimary} onClick={onLaunchApp}>
            Start Free Trial
          </button>
          <button style={styles.btnSecondary}>
            <span>▶</span>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Dashboard Preview Card */}
        <div style={styles.dashboardCard}>
          <div style={styles.dashboardBar}>
            <div style={{ width: 11, height: 11, borderRadius: "var(--radius-full)", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 11, height: 11, borderRadius: "var(--radius-full)", backgroundColor: "#febc2e" }} />
            <div style={{ width: 11, height: 11, borderRadius: "var(--radius-full)", backgroundColor: "#28c840" }} />
            <span style={styles.dashboardTitle}>AutoPilot CRM — Active Pipeline</span>
          </div>
          <div style={styles.dashboardBody}>
            <div style={styles.dashboardHeader}>
              <span style={styles.dashboardSectionTitle}>Top Deals · Q2 Pipeline</span>
              <button style={styles.dashboardFilterBtn}>AI Sorted ↑</button>
            </div>
            {deals.map((deal, i) => (
              <div key={i} style={styles.dealRow}>
                <div style={styles.dealLeft}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "var(--radius-md)",
                      backgroundColor: deal.avatarBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: "var(--weight-bold)",
                      color: "var(--white)",
                      flexShrink: 0,
                    }}
                  >
                    {deal.initials}
                  </div>
                  <div>
                    <div style={styles.dealName}>{deal.name}</div>
                    <div style={styles.dealCompany}>{deal.company}</div>
                  </div>
                </div>
                <div style={styles.dealRight}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: "var(--weight-semibold)",
                      color: deal.stageColor,
                      backgroundColor: deal.stageBg,
                      borderRadius: "var(--radius-full)",
                      padding: "2px 10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {deal.stage}
                  </span>
                  <span style={styles.dealValue}>{deal.value}</span>
                  <span style={styles.dealScore}>⚡ {deal.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={styles.statsBar}>
        {[
          { number: "10,000+", label: "Sales Teams" },
          { number: "$2.4B", label: "Revenue Tracked" },
          { number: "94%", label: "Customer Satisfaction" },
        ].map((stat, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statNumber}>{stat.number}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div id="features">
        <div style={styles.section}>
          <div style={styles.sectionLabel}>Features</div>
          <h2 style={styles.sectionTitle}>Everything your team needs to win</h2>
          <p style={styles.sectionSubtitle}>
            From first touch to closed-won, AutoPilot CRM handles the heavy lifting so your reps can focus on relationships.
          </p>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureCard}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI DEMO */}
      <div id="demo" style={styles.aiSection}>
        <div style={styles.aiInner}>
          <div>
            <div style={styles.aiLabelDark}>AI Copilot</div>
            <h2 style={styles.aiTitle}>Your AI sales assistant, always on</h2>
            <p style={styles.aiDesc}>
              Ask AutoPilot anything about your pipeline. It surfaces the right leads at the right time, drafts personalized outreach, and flags deals at risk — all in plain English.
            </p>
            <ul style={styles.aiFeatureList}>
              {[
                "Understands context across your entire pipeline",
                "Drafts follow-up emails in your voice",
                "Flags deals that have gone cold",
                "Summarizes call transcripts and action items",
              ].map((item, i) => (
                <li key={i} style={styles.aiFeatureItem}>
                  <div style={styles.aiFeatureDot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Preview */}
          <div style={styles.chatCard}>
            <div style={styles.chatHeader}>
              <div style={styles.chatHeaderIcon}>🤖</div>
              <div style={styles.chatHeaderText}>
                <div style={styles.chatHeaderName}>AutoPilot AI</div>
                <div style={styles.chatHeaderStatus}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      display: "inline-block",
                    }}
                  />
                  Online — analyzing your pipeline
                </div>
              </div>
            </div>
            <div style={styles.chatBody}>
              <div style={styles.chatMsgUser}>
                <div style={styles.chatBubbleUser}>
                  Which leads should I focus on today?
                </div>
              </div>
              <div style={styles.chatMsgAi}>
                <div style={styles.chatBubbleAi}>
                  Based on engagement signals from the last 24 hours, here are your top 3 leads to prioritize:
                  <div style={styles.chatLeadItem}>
                    <span>🎯</span>
                    <span>Alex Chen — Stripe Inc. (visited pricing page 3×)</span>
                    <span style={styles.chatLeadScore}>94</span>
                  </div>
                  <div style={styles.chatLeadItem}>
                    <span>🔥</span>
                    <span>Sarah Miller — Notion Labs (opened proposal twice)</span>
                    <span style={styles.chatLeadScore}>87</span>
                  </div>
                  <div style={styles.chatLeadItem}>
                    <span>⚡</span>
                    <span>Jake Rivera — Linear HQ (booked a demo)</span>
                    <span style={styles.chatLeadScore}>76</span>
                  </div>
                </div>
              </div>
              <div style={styles.chatMsgUser}>
                <div style={styles.chatBubbleUser}>
                  Draft a follow-up email for Alex Chen.
                </div>
              </div>
              <div style={styles.chatMsgAi}>
                <div style={styles.chatBubbleAi}>
                  Sure! Here's a personalized follow-up based on Alex's activity and the enterprise tier he explored:
                  <br /><br />
                  <em>Subject: Quick question about your Stripe team's workflow</em>
                  <br /><br />
                  "Hi Alex, noticed you spent some time on our enterprise pricing — happy to walk you through a custom quote for Stripe's team size. Would Thursday at 2pm PT work for a 20-min call?"
                </div>
              </div>
            </div>
            <div style={styles.chatInput}>
              <input
                style={styles.chatInputField}
                placeholder="Ask AutoPilot anything..."
                readOnly
              />
              <button style={styles.chatSendBtn}>↑</button>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={styles.pricingSection}>
        <div style={styles.pricingInner}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
            <div style={{ ...styles.sectionLabel, textAlign: "center" }}>Pricing</div>
            <h2 style={{ ...styles.sectionTitle, textAlign: "center", margin: "0 auto var(--space-4)" }}>
              Simple, transparent pricing
            </h2>
            <p style={{ ...styles.sectionSubtitle, textAlign: "center", margin: "0 auto" }}>
              Start free. Upgrade when you're ready. No hidden fees, ever.
            </p>
          </div>
          <div style={styles.pricingGrid}>
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "var(--white)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-8)",
                  border: tier.highlighted
                    ? "2px solid var(--emerald-500)"
                    : "1px solid var(--slate-200)",
                  boxShadow: tier.highlighted ? "var(--shadow-xl)" : "var(--shadow-md)",
                  position: "relative",
                  transform: tier.highlighted ? "scale(1.03)" : "none",
                }}
              >
                {tier.badge && (
                  <div style={styles.pricingBadge}>{tier.badge}</div>
                )}
                <div style={styles.pricingTier}>{tier.tier}</div>
                <div style={styles.pricingPrice}>
                  <span style={styles.pricingAmount}>{tier.amount}</span>
                  {tier.per && <span style={styles.pricingPer}>{tier.per}</span>}
                </div>
                <div style={styles.pricingDesc}>{tier.desc}</div>
                <ul style={styles.pricingFeatures}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={styles.pricingFeatureItem}>
                      <span style={styles.pricingCheck}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    width: "100%",
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-lg)",
                    border: tier.highlighted ? "none" : "1.5px solid var(--slate-300)",
                    backgroundColor: tier.highlighted ? "var(--emerald-600)" : "transparent",
                    color: tier.highlighted ? "var(--white)" : "var(--navy-900)",
                    fontSize: 15,
                    fontWeight: "var(--weight-semibold)",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                  onClick={tier.ctaAction ? onLaunchApp : undefined}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ backgroundColor: "var(--white)" }}>
        <div style={styles.faqSection}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
            <div style={{ ...styles.sectionLabel, textAlign: "center" }}>FAQ</div>
            <h2 style={{ ...styles.sectionTitle, textAlign: "center", margin: "0 auto var(--space-3)" }}>
              Common questions
            </h2>
            <p style={{ ...styles.sectionSubtitle, textAlign: "center", margin: "0 auto" }}>
              Everything you need to know about AutoPilot CRM.
            </p>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "var(--space-5) var(--space-6)",
                  backgroundColor: openFaq === i ? "var(--slate-100)" : "var(--white)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 16,
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--navy-900)",
                  fontFamily: "var(--font-body)",
                }}
                onClick={() => toggleFaq(i)}
              >
                <span>{faq.q}</span>
                <span
                  style={{
                    fontSize: 20,
                    color: "var(--emerald-600)",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div style={styles.faqAnswer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerTop}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogoRow}>
                <div style={styles.footerLogoIcon}>🚀</div>
                <span style={styles.footerLogoText}>AutoPilot CRM</span>
              </div>
              <p style={styles.footerTagline}>
                The AI-powered CRM that helps modern sales teams close more deals, faster.
              </p>
            </div>
            <div style={styles.footerLinks}>
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "Changelog", "Roadmap"],
                },
                {
                  title: "Company",
                  links: ["About", "Blog", "Careers", "Press"],
                },
                {
                  title: "Legal",
                  links: ["Privacy Policy", "Terms of Service", "Security", "GDPR"],
                },
              ].map((group, i) => (
                <div key={i}>
                  <div style={styles.footerLinkGroupTitle}>{group.title}</div>
                  <ul style={styles.footerLinkList}>
                    {group.links.map((link, j) => (
                      <li key={j}>
                        <a style={styles.footerLink} href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.footerBottom}>
            <span style={styles.footerCopy}>© 2024 AutoPilot CRM. All rights reserved.</span>
            <div style={styles.footerLegal}>
              <a style={styles.footerLink} href="#">Privacy</a>
              <a style={styles.footerLink} href="#">Terms</a>
              <a style={styles.footerLink} href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
