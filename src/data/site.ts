export interface Cert {
  code: string;
  name: string;
  summary: string;
  tags: string[];
}

export const certifications: Cert[] = [
  {
    code: "OSCP+ / OSCP",
    name: "Offensive Security Certified Professional (Plus)",
    summary:
      "Advanced, hands-on certification built on the OSCP foundation with extra emphasis on realistic, multi-step attack paths across Active Directory and Linux/Windows targets.",
    tags: ["AD", "Pivoting", "Privilege Escalation", "Buffer Overflow"],
  },
  {
    code: "CRTP",
    name: "Certified Red Team Professional",
    summary:
      "Active Directory attack and abuse — Kerberos, ACL abuse, trust attacks, persistence and lateral movement across forests.",
    tags: ["Active Directory", "Kerberoasting", "DCSync", "Trusts"],
  },
  {
    code: "eWPTX",
    name: "eLearnSecurity Web Application Penetration Tester eXtreme",
    summary:
      "Advanced web exploitation beyond OWASP basics — chained logic flaws, SSRF, deserialization, and modern bypass techniques.",
    tags: ["Web", "SSRF", "Deserialization", "Auth Bypass"],
  },
  {
    code: "eCPPTv3",
    name: "Certified Professional Penetration Tester",
    summary:
      "End-to-end network and system pentesting — engagement methodology, exploitation, post-exploitation, and reporting.",
    tags: ["Network", "Pivoting", "Reporting"],
  },
  {
    code: "eCIR",
    name: "eLearnSecurity Certified Incident Responder",
    summary:
      "Full IR lifecycle — threat identification, containment, eradication and recovery using SIEM, EDR and forensic tooling.",
    tags: ["IR", "SIEM", "EDR", "Threat Hunting"],
  },
  {
    code: "eCDFP",
    name: "eLearnSecurity Certified Digital Forensics Professional",
    summary:
      "Hands-on DFIR across disk, memory and network evidence with Autopsy, Volatility, Wireshark and more.",
    tags: ["DFIR", "Volatility", "Autopsy", "Memory"],
  },
  {
    code: "eJPTv2",
    name: "eLearnSecurity Junior Penetration Tester",
    summary:
      "Foundational practical pentesting — networking, enumeration, exploitation and host-based attacks.",
    tags: ["Foundations", "Enumeration"],
  },
  {
    code: "Security+",
    name: "CompTIA Security+ SY0-701",
    summary:
      "Baseline security knowledge — risk, governance, cryptography, architecture and operations.",
    tags: ["Baseline", "GRC"],
  },
  {
    code: "CS50",
    name: "Harvard CS50 Introduction to Cybersecurity",
    summary:
      "Conceptual foundations of cybersecurity from Harvard's CS50 program.",
    tags: ["Foundations"],
  },
];

export interface LabItem {
  title: string;
  category: "Mobile" | "Web" | "Reverse Engineering" | "Malware" | "DFIR" | "Memory";
  description: string;
  href: string;
}

export const labs: LabItem[] = [
  {
    title: "Frida Lab 1 — Hooking Your First Method",
    category: "Mobile",
    description: "First steps with Frida on Android — locating, hooking and intercepting Java methods to control app flow.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/mobile-applications-pentesting/frida-labs-writeups/lab-1-hooking-your-first-method-in-an-android-app",
  },
  {
    title: "Frida Lab 2 — Class Fields & Logic",
    category: "Mobile",
    description: "Hooking class fields and modifying business logic at runtime to bypass checks.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/mobile-applications-pentesting/frida-labs-writeups/lab-2-hooking-class-fields-and-modifying-app-logic",
  },
  {
    title: "Frida Lab 3 — Static Variables in Singletons",
    category: "Mobile",
    description: "Manipulating singleton state to alter app behaviour without recompiling.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/mobile-applications-pentesting/frida-labs-writeups/lab-3-modifying-static-variables-in-singleton-classes",
  },
  {
    title: "Frida Lab 4 — Non‑Static Class Methods",
    category: "Mobile",
    description: "Invoking non-static class methods through Frida to reach hidden functionality.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/mobile-applications-pentesting/frida-labs-writeups/lab-4-calling-methods-of-a-non-static-class-using-frida",
  },
  {
    title: "Config Editor — Mobile RCE",
    category: "Mobile",
    description: "Full write-up of an Android lab leading to remote code execution via insecure config handling.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/mobile-applications-pentesting/lab-config-editor-mobile-rce-full-write-up",
  },
  {
    title: "Reverse Engineering — RE101",
    category: "Reverse Engineering",
    description: "Hands-on binary reversing fundamentals — static and dynamic analysis with Ghidra and gdb.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/projects/reverse-engineering-lab-re101",
  },
  {
    title: "XLMRat — Malware & Network Forensics",
    category: "Malware",
    description: "Analysing an Excel 4.0 macro-based RAT and reconstructing its C2 from packet captures.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/projects/xlmrat-lab-malware-analysis-and-network-forensics",
  },
  {
    title: "FakeGPT — Malware Walkthrough",
    category: "Malware",
    description: "Reversing a deceptive 'FakeGPT' sample end-to-end — unpacking, behaviour, IOCs.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/projects/fakegpt-malware-analysis-walkthrough",
  },
  {
    title: "Reveal Lab — Incident Response Scenario",
    category: "DFIR",
    description: "Working a simulated breach: triage, evidence collection, timeline and remediation steps.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/projects/reveal-lab-incident-response-scenario",
  },
  {
    title: "RedLine — Memory Analysis",
    category: "Memory",
    description: "Hunting RedLine stealer artefacts in volatile memory with Volatility.",
    href: "https://omar-4.gitbook.io/omar-khalid/pages/projects/redline-lab-memory-analysis",
  },
];

export interface CtfItem {
  title: string;
  event: string;
  category: string;
  href: string;
}

export const ctfs: CtfItem[] = [
  { title: "DISKO 1", event: "picoCTF", category: "Forensics", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/disko-1-picoctf" },
  { title: "PicoCTF — DISKO 2", event: "picoCTF", category: "Forensics", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/picoctf-writeup-disko2" },
  { title: "RED — Stego Fun with PNGs", event: "picoCTF", category: "Steganography", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/red-stego-fun-with-pngs" },
  { title: "Ph4nt0m 1ntrud3r", event: "picoCTF", category: "Forensics", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/ph4nt0m-1ntrud3r-picoctf" },
  { title: "Secret of the Polyglot", event: "picoCTF", category: "Misc", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/secret-of-the-polyglot-picoctf-write-up" },
  { title: "Flags Are Stepic", event: "picoCTF 2025", category: "Steganography", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/picoctf-2025-flags-are-stepic-writeup" },
  { title: "Event Viewing", event: "picoCTF", category: "Forensics", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/event-viewing-picoctf-writeup" },
  { title: "Dear-Diary", event: "picoCTF", category: "Forensics", href: "https://omar-4.gitbook.io/omar-khalid/pages/ctf-writeups/forensics-challenge-dear-diary-or-picoctf-writeup" },
];

export const stats = [
  { value: "9+", label: "Certifications" },
  { value: "+2", label: "CVEs published" },
  { value: "20+", label: "Labs & writeups" },
  { value: "8+", label: "CTF challenges" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Offensive",
    items: ["Network Pentesting", "Web App Pentesting", "Mobile (Android) Pentesting", "Active Directory", "Red Team Ops", "Privilege Escalation"],
  },
  {
    group: "Defensive / DFIR",
    items: ["Incident Response", "Digital Forensics", "Memory Analysis", "Malware Analysis", "Threat Hunting", "SIEM / EDR"],
  },
  {
    group: "Tooling",
    items: ["Burp Suite", "Nmap", "Metasploit", "Frida", "Ghidra", "Volatility", "Wireshark", "Autopsy", "BloodHound", "Impacket"],
  },
];