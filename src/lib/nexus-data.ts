export type Urgency = "DUE TODAY" | "DUE TOMORROW" | "DUE THIS WEEK" | "UPCOMING";

export type Opportunity = {
  id: string;
  name: string;
  category:
    | "Hackathons"
    | "Ideathons"
    | "Project Expos"
    | "Competitions"
    | "Internships"
    | "Research"
    | "Workshops"
    | "Certifications";
  organizer: string;
  date: string;
  deadline: string;
  urgency: Urgency;
  eligibility: string;
  location: string;
  skills: string[];
  description: string;
  details: string;
  prize: string;
  registration: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "xyz-hackathon",
    name: "XYZ National Hackathon 2026",
    category: "Hackathons",
    organizer: "XYZ Tech Foundation",
    date: "Aug 24 - Aug 26",
    deadline: "Aug 15",
    urgency: "DUE THIS WEEK",
    eligibility: "All UG students (Year 1-4)",
    location: "Bengaluru + Online rounds",
    skills: ["Python", "Web Development", "UI/UX"],
    description: "36-hour national hackathon across fintech, health and climate tracks.",
    details:
      "Teams of 2-4 build a working prototype in 36 hours. Round 1 is an online idea screening, finalists travel to Bengaluru for the on-site build. Mentors from partner startups are available throughout.",
    prize: "₹3,00,000 pool + internship interviews",
    registration: "Register with team details on the XYZ portal; team lead submits the abstract.",
  },
  {
    id: "ai-ideathon",
    name: "AI Ideathon — Campus Edition",
    category: "Ideathons",
    organizer: "Department of CSE (AIML)",
    date: "Aug 22",
    deadline: "Aug 18",
    urgency: "UPCOMING",
    eligibility: "CSE / AIML / ECE students",
    location: "Seminar Hall B, Main Block",
    skills: ["AI/ML", "Data Science", "Python"],
    description: "Pitch an AI solution for a real campus or community problem.",
    details:
      "A one-day ideation sprint. Submit a 3-slide concept, get shortlisted, then pitch to a faculty and industry jury. Winning ideas move directly into the R&D support pipeline.",
    prize: "R&D grant of ₹25,000 + mentorship",
    registration: "Submit abstract through the department Ideathon form.",
  },
  {
    id: "project-expo",
    name: "Annual Project Expo",
    category: "Project Expos",
    organizer: "Innovation & Incubation Cell",
    date: "Sep 05",
    deadline: "Aug 20",
    urgency: "UPCOMING",
    eligibility: "All branches, 2nd year and above",
    location: "Central Atrium",
    skills: ["Hardware", "Web Development", "AI/ML"],
    description: "Showcase working projects to industry visitors and recruiters.",
    details:
      "Every shortlisted team gets a booth, a poster slot and a 5-minute jury walkthrough. Recruiters from 12 companies attend the afternoon session.",
    prize: "Best project trophy + incubation shortlist",
    registration: "One entry per team with a project abstract and demo plan.",
  },
  {
    id: "google-cloud-cert",
    name: "Google Cloud Associate Engineer Drive",
    category: "Certifications",
    organizer: "Google Cloud + Training Cell",
    date: "Aug 30",
    deadline: "Aug 12",
    urgency: "DUE TODAY",
    eligibility: "Pre-final and final year students",
    location: "Online proctored",
    skills: ["Cloud", "Linux", "Networking"],
    description: "Subsidised certification drive with 4 weeks of prep sessions.",
    details:
      "Voucher cost is subsidised by 60% for registered students. Includes weekend labs, mock exams and a Qwiklabs credit pack.",
    prize: "Industry-recognised certification",
    registration: "Register with roll number; vouchers released 3 days before exam.",
  },
  {
    id: "summer-internship",
    name: "Product Engineering Internship — Zentra Labs",
    category: "Internships",
    organizer: "Zentra Labs",
    date: "Starts Oct 01",
    deadline: "Aug 26",
    urgency: "UPCOMING",
    eligibility: "2nd / 3rd year, CGPA 7.5+",
    location: "Hybrid — Hyderabad",
    skills: ["Web Development", "Java", "DSA"],
    description: "6-month paid internship building customer-facing product features.",
    details:
      "Interns join a squad of 5 engineers, own small features end to end and get a weekly mentor review. Strong performers receive a PPO.",
    prize: "₹25,000/month stipend + PPO track",
    registration: "Apply with resume and GitHub link; online assessment follows.",
  },
  {
    id: "research-assistantship",
    name: "Undergraduate Research Assistantship — Edge AI",
    category: "Research",
    organizer: "R&D Cell + Prof. Meera Nair",
    date: "Sep 10",
    deadline: "Aug 28",
    urgency: "UPCOMING",
    eligibility: "Students with ML coursework",
    location: "Edge Computing Lab",
    skills: ["AI/ML", "Python", "Hardware"],
    description: "Assist on a funded project deploying vision models on edge devices.",
    details:
      "Selected students work 8 hours a week on dataset curation, model quantisation and on-device benchmarking. Co-authorship on the resulting paper is offered.",
    prize: "Stipend + publication credit",
    registration: "Submit a statement of interest and relevant coursework.",
  },
  {
    id: "smart-india-hack",
    name: "Smart Campus Hackathon",
    category: "Hackathons",
    organizer: "College Innovation Council",
    date: "Sep 12 - Sep 13",
    deadline: "Aug 29",
    urgency: "UPCOMING",
    eligibility: "All years, teams of 4",
    location: "Innovation Lab",
    skills: ["Web Development", "Cloud", "UI/UX"],
    description: "Solve real campus operations problems posted by departments.",
    details:
      "Problem statements are contributed by the administration — attendance, lab booking, energy usage and transport. Winning builds get piloted on campus.",
    prize: "₹75,000 + campus deployment",
    registration: "Team registration through the Innovation Council portal.",
  },
  {
    id: "cyber-ctf",
    name: "CyberShield CTF Championship",
    category: "Competitions",
    organizer: "CyberShield Security Club",
    date: "Aug 23",
    deadline: "Aug 19",
    urgency: "UPCOMING",
    eligibility: "Open to all students",
    location: "Online",
    skills: ["Cybersecurity", "Linux", "Python"],
    description: "Jeopardy-style capture the flag with web, crypto and forensics tracks.",
    details:
      "8-hour online CTF. Beginner track included with guided challenges. Top 3 teams represent the college at the regional finals.",
    prize: "₹40,000 + regional finals entry",
    registration: "Teams of up to 3; register with a team handle.",
  },
  {
    id: "uiux-workshop",
    name: "Product Design & UI/UX Bootcamp",
    category: "Workshops",
    organizer: "Design Guild + Alumni Network",
    date: "Aug 17 - Aug 18",
    deadline: "Aug 13",
    urgency: "DUE TOMORROW",
    eligibility: "All branches",
    location: "Design Studio, Block C",
    skills: ["UI/UX", "Figma"],
    description: "Two-day hands-on bootcamp ending with a portfolio-ready case study.",
    details:
      "Covers research, wireframing, design systems and handoff. Every participant ships one case study reviewed by working designers.",
    prize: "Certificate + portfolio review",
    registration: "Limited to 60 seats, first come first served.",
  },
  {
    id: "iot-competition",
    name: "IoT Build Challenge",
    category: "Competitions",
    organizer: "Robotics & Embedded Systems Club",
    date: "Sep 02",
    deadline: "Aug 25",
    urgency: "UPCOMING",
    eligibility: "ECE / EEE / CSE students",
    location: "Embedded Systems Lab",
    skills: ["Hardware", "C", "Cloud"],
    description: "Build a sensor-driven prototype within a fixed component budget.",
    details:
      "Component kits are provided. Judging weighs reliability, power efficiency and the demo. Lab access is open for two weeks before the event.",
    prize: "₹30,000 + component grant",
    registration: "Teams of 3 with a component request list.",
  },
  {
    id: "data-viz-challenge",
    name: "Open Data Visualisation Challenge",
    category: "Competitions",
    organizer: "Data Science Society",
    date: "Aug 27",
    deadline: "Aug 21",
    urgency: "UPCOMING",
    eligibility: "All students",
    location: "Online submission",
    skills: ["Data Science", "Python", "UI/UX"],
    description: "Turn a public dataset into a compelling interactive story.",
    details:
      "Pick any dataset from the provided catalogue and submit an interactive dashboard plus a 300-word narrative.",
    prize: "₹20,000 + featured showcase",
    registration: "Individual or pairs; submit a link to the live dashboard.",
  },
  {
    id: "startup-pitch",
    name: "Campus Startup Pitch Night",
    category: "Ideathons",
    organizer: "Entrepreneurship Cell",
    date: "Sep 08",
    deadline: "Aug 31",
    urgency: "UPCOMING",
    eligibility: "Student founders and aspiring founders",
    location: "Auditorium",
    skills: ["Business", "UI/UX", "Web Development"],
    description: "Pitch a venture idea to angel investors and alumni founders.",
    details:
      "Five minutes to pitch, five minutes of Q&A. Shortlisted teams get pre-pitch coaching from the E-Cell mentor panel.",
    prize: "Seed grant of ₹1,00,000",
    registration: "Submit a one-page pitch summary.",
  },
];

export type Certification = {
  id: string;
  name: string;
  provider: string;
  deadline: string;
  examDate: string;
  validity: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  domain: "AI/ML" | "Programming" | "Cloud" | "Data Science" | "Cybersecurity" | "Management" | "Other";
  skills: string[];
  description: string;
};

export const certifications: Certification[] = [
  {
    id: "gcp-ace",
    name: "Google Cloud Associate Cloud Engineer",
    provider: "Google Cloud",
    deadline: "Aug 12",
    examDate: "Aug 30",
    validity: "3 years",
    difficulty: "Intermediate",
    domain: "Cloud",
    skills: ["Cloud", "Networking", "Linux"],
    description: "Deploy and operate workloads on Google Cloud with hands-on labs.",
  },
  {
    id: "python-pcep",
    name: "PCEP — Certified Entry-Level Python Programmer",
    provider: "Python Institute",
    deadline: "Aug 14",
    examDate: "Aug 14",
    validity: "Lifetime",
    difficulty: "Beginner",
    domain: "Programming",
    skills: ["Python", "DSA"],
    description: "Fundamentals of Python syntax, data types and control flow.",
  },
  {
    id: "aws-ml",
    name: "AWS Certified Machine Learning — Specialty",
    provider: "Amazon Web Services",
    deadline: "Sep 02",
    examDate: "Sep 20",
    validity: "3 years",
    difficulty: "Advanced",
    domain: "AI/ML",
    skills: ["AI/ML", "Cloud", "Python"],
    description: "Design, build and deploy ML solutions on AWS at production scale.",
  },
  {
    id: "comptia-sec",
    name: "CompTIA Security+",
    provider: "CompTIA",
    deadline: "Sep 05",
    examDate: "Sep 25",
    validity: "3 years",
    difficulty: "Intermediate",
    domain: "Cybersecurity",
    skills: ["Cybersecurity", "Networking"],
    description: "Baseline security skills: threats, architecture and risk management.",
  },
  {
    id: "tableau-da",
    name: "Tableau Desktop Specialist",
    provider: "Tableau",
    deadline: "Aug 29",
    examDate: "Sep 14",
    validity: "Lifetime",
    difficulty: "Beginner",
    domain: "Data Science",
    skills: ["Data Science", "Analytics"],
    description: "Core analytics and visualisation workflows in Tableau.",
  },
  {
    id: "pmi-capm",
    name: "CAPM — Certified Associate in Project Management",
    provider: "PMI",
    deadline: "Sep 10",
    examDate: "Oct 04",
    validity: "5 years",
    difficulty: "Intermediate",
    domain: "Management",
    skills: ["Business", "Communication"],
    description: "Project management fundamentals for student leads and coordinators.",
  },
  {
    id: "tf-developer",
    name: "TensorFlow Developer Certificate",
    provider: "Google",
    deadline: "Sep 12",
    examDate: "Oct 10",
    validity: "3 years",
    difficulty: "Advanced",
    domain: "AI/ML",
    skills: ["AI/ML", "Python"],
    description: "Build and train neural networks for vision, NLP and time series.",
  },
];

export type AcademicUpdate = {
  id: string;
  title: string;
  category: "Academic" | "Club" | "College" | "Workshop" | "Event";
  date: string;
  source: string;
  description: string;
  details: string;
  deadline?: string;
};

export const academicUpdates: AcademicUpdate[] = [
  {
    id: "mid-sem-schedule",
    title: "Mid-Semester Examination Schedule Released",
    category: "Academic",
    date: "Aug 11",
    source: "Controller of Examinations",
    description: "Mid-sem exams for all branches begin Sep 01. Hall tickets from Aug 25.",
    details:
      "Exams run from Sep 01 to Sep 09 in two sessions. Students with pending internal assessments must clear them before Aug 24. Seating plans go up on the department board three days prior.",
    deadline: "Aug 24",
  },
  {
    id: "dbms-assignment",
    title: "DBMS Assignment-2 Submission",
    category: "Academic",
    date: "Aug 10",
    source: "Dept. of CSE",
    description: "Normalisation and query optimisation assignment due Aug 16.",
    details:
      "Submit a single PDF on the LMS with your roll number in the filename. Late submissions lose 20% per day. Viva for selected submissions on Aug 19.",
    deadline: "Aug 16",
  },
  {
    id: "elective-registration",
    title: "Open Elective Registration Window",
    category: "College",
    date: "Aug 09",
    source: "Academic Section",
    description: "Choose open electives for Semester 4 before the window closes.",
    details:
      "Seats are allotted first come first served. Once locked, changes require HOD approval. Course outlines are attached on the academic portal.",
    deadline: "Aug 18",
  },
  {
    id: "industry-workshop",
    title: "Industry Workshop: MLOps in Production",
    category: "Workshop",
    date: "Aug 20",
    source: "Training & Placement Cell",
    description: "Half-day workshop by engineers from a leading fintech.",
    details:
      "Covers CI/CD for models, feature stores, drift monitoring and incident response. Laptops required. Attendance counts towards skill credits.",
    deadline: "Aug 17",
  },
  {
    id: "library-hours",
    title: "Extended Library Hours During Exams",
    category: "College",
    date: "Aug 08",
    source: "Central Library",
    description: "Library open till 11:30 PM from Aug 25 to Sep 10.",
    details:
      "Reading halls 1 and 2 stay open with ID card entry after 9 PM. Group discussion rooms can be booked for two-hour slots.",
  },
  {
    id: "tech-fest-announce",
    title: "Annual Tech Fest 'Nexus Verse' Announced",
    category: "Event",
    date: "Aug 07",
    source: "Student Affairs",
    description: "Three-day tech fest in October; volunteer registrations open.",
    details:
      "Over 30 events across coding, robotics, design and gaming. Core team applications are open for content, sponsorship, logistics and design verticals.",
    deadline: "Aug 30",
  },
];

export type Club = {
  id: string;
  name: string;
  category: string;
  president: string;
  faculty: string;
  members: number;
  upcomingEvent: string;
  about: string;
  leadership: { name: string; role: string }[];
  events: { name: string; date: string }[];
  announcements: string[];
  contact: string;
};

export const clubs: Club[] = [
  {
    id: "ai-club",
    name: "AI & Machine Learning Club",
    category: "Technical",
    president: "Ishita Verma",
    faculty: "Dr. Meera Nair",
    members: 184,
    upcomingEvent: "Paper Reading Night — Aug 19",
    about:
      "A community of students building and studying machine learning systems, from weekend model builds to research paper discussions.",
    leadership: [
      { name: "Ishita Verma", role: "President" },
      { name: "Rohan Iyer", role: "Vice President" },
      { name: "Sana Qureshi", role: "Research Lead" },
    ],
    events: [
      { name: "Paper Reading Night", date: "Aug 19" },
      { name: "AI Ideathon Prep Session", date: "Aug 21" },
      { name: "Model Deployment Workshop", date: "Sep 03" },
    ],
    announcements: [
      "Ideathon mentoring slots open for 2nd year students.",
      "GPU lab access forms due Aug 16.",
    ],
    contact: "aiclub@college.edu",
  },
  {
    id: "coding-club",
    name: "Competitive Coding Club",
    category: "Technical",
    president: "Karthik Menon",
    faculty: "Prof. S. Rajagopal",
    members: 312,
    upcomingEvent: "Weekly Contest #48 — Aug 14",
    about:
      "Weekly contests, editorial sessions and interview prep ladders for students serious about DSA.",
    leadership: [
      { name: "Karthik Menon", role: "President" },
      { name: "Nidhi Rao", role: "Contest Lead" },
    ],
    events: [
      { name: "Weekly Contest #48", date: "Aug 14" },
      { name: "Graph Algorithms Bootcamp", date: "Aug 23" },
    ],
    announcements: ["Interview prep ladder for 3rd years starts Aug 18."],
    contact: "coding@college.edu",
  },
  {
    id: "robotics-club",
    name: "Robotics & Embedded Systems Club",
    category: "Technical",
    president: "Aditya Kulkarni",
    faculty: "Dr. P. Venkatesh",
    members: 146,
    upcomingEvent: "IoT Build Challenge — Sep 02",
    about:
      "Hands-on club for embedded systems, drones and autonomous robots with a fully stocked component library.",
    leadership: [
      { name: "Aditya Kulkarni", role: "President" },
      { name: "Farhan Sheikh", role: "Hardware Lead" },
    ],
    events: [
      { name: "IoT Build Challenge", date: "Sep 02" },
      { name: "Soldering & PCB Basics", date: "Aug 16" },
    ],
    announcements: ["Component library inventory refreshed — request kits early."],
    contact: "robotics@college.edu",
  },
  {
    id: "design-guild",
    name: "Design Guild",
    category: "Creative",
    president: "Ananya Pillai",
    faculty: "Prof. Kavita Desai",
    members: 98,
    upcomingEvent: "UI/UX Bootcamp — Aug 17",
    about:
      "Product design, branding and motion. Members ship real design work for campus events and startups.",
    leadership: [
      { name: "Ananya Pillai", role: "President" },
      { name: "Vikram Sethi", role: "Motion Lead" },
    ],
    events: [
      { name: "UI/UX Bootcamp", date: "Aug 17" },
      { name: "Portfolio Review Night", date: "Aug 28" },
    ],
    announcements: ["Bootcamp seats limited to 60 — registration closes Aug 13."],
    contact: "design@college.edu",
  },
  {
    id: "ecell",
    name: "Entrepreneurship Cell",
    category: "Business",
    president: "Rhea Kapoor",
    faculty: "Dr. Anil Bhatt",
    members: 205,
    upcomingEvent: "Startup Pitch Night — Sep 08",
    about:
      "Supports student founders with mentorship, pitch practice, legal basics and investor connections.",
    leadership: [
      { name: "Rhea Kapoor", role: "President" },
      { name: "Manav Joshi", role: "Mentorship Lead" },
    ],
    events: [
      { name: "Startup Pitch Night", date: "Sep 08" },
      { name: "Founder Fireside: Building in Public", date: "Aug 22" },
    ],
    announcements: ["Pitch coaching slots open for shortlisted teams."],
    contact: "ecell@college.edu",
  },
  {
    id: "cyber-club",
    name: "CyberShield Security Club",
    category: "Technical",
    president: "Tanvi Deshmukh",
    faculty: "Prof. R. Krishnan",
    members: 121,
    upcomingEvent: "CyberShield CTF — Aug 23",
    about:
      "Offensive and defensive security practice: CTFs, lab exercises and responsible disclosure workshops.",
    leadership: [
      { name: "Tanvi Deshmukh", role: "President" },
      { name: "Yash Agarwal", role: "CTF Lead" },
    ],
    events: [
      { name: "CyberShield CTF Championship", date: "Aug 23" },
      { name: "Web Exploitation 101", date: "Aug 18" },
    ],
    announcements: ["Beginner track added to the CTF this year."],
    contact: "cybershield@college.edu",
  },
];

export type TeamPost = {
  id: string;
  teamName: string;
  event: string;
  eventId?: string;
  lookingFor: string;
  currentSize: number;
  maxSize: number;
  skills: string[];
  deadline: string;
  description: string;
  contact: string;
  postedBy: string;
};

export const teamPosts: TeamPost[] = [
  {
    id: "t1",
    teamName: "Team Cipher",
    event: "XYZ National Hackathon 2026",
    eventId: "xyz-hackathon",
    lookingFor: "Python Developer",
    currentSize: 2,
    maxSize: 4,
    skills: ["Python", "AI/ML"],
    deadline: "Aug 20",
    description:
      "Building a fraud detection prototype for the fintech track. We have backend and design covered; need someone strong in Python and model training.",
    contact: "WhatsApp",
    postedBy: "Rohan Iyer — 3rd Year CSE",
  },
  {
    id: "t2",
    teamName: "PixelForge",
    event: "Smart Campus Hackathon",
    eventId: "smart-india-hack",
    lookingFor: "UI/UX Designer",
    currentSize: 3,
    maxSize: 4,
    skills: ["UI/UX", "Web Development"],
    deadline: "Aug 27",
    description:
      "Working on a lab booking system for the campus. Need a designer to own the flows and a clean design system.",
    contact: "Email",
    postedBy: "Ananya Pillai — 2nd Year IT",
  },
  {
    id: "t3",
    teamName: "EdgeMinds",
    event: "AI Ideathon — Campus Edition",
    eventId: "ai-ideathon",
    lookingFor: "ML Engineer",
    currentSize: 1,
    maxSize: 3,
    skills: ["AI/ML", "Data Science", "Python"],
    deadline: "Aug 17",
    description:
      "Idea: on-device attendance using face embeddings with strict privacy. Looking for two people comfortable with model compression.",
    contact: "Campus meet",
    postedBy: "Sana Qureshi — 3rd Year AIML",
  },
  {
    id: "t4",
    teamName: "NullByte",
    event: "CyberShield CTF Championship",
    eventId: "cyber-ctf",
    lookingFor: "Web Exploitation Specialist",
    currentSize: 2,
    maxSize: 3,
    skills: ["Cybersecurity", "Python"],
    deadline: "Aug 19",
    description: "Two of us handle crypto and forensics. Need one person for web and misc.",
    contact: "Discord",
    postedBy: "Yash Agarwal — 4th Year CSE",
  },
  {
    id: "t5",
    teamName: "VoltLoop",
    event: "IoT Build Challenge",
    eventId: "iot-competition",
    lookingFor: "Embedded C Developer",
    currentSize: 2,
    maxSize: 3,
    skills: ["Hardware", "C", "Cloud"],
    deadline: "Aug 24",
    description:
      "Smart energy monitoring for hostel blocks. Need help with firmware on ESP32 and MQTT plumbing.",
    contact: "WhatsApp",
    postedBy: "Farhan Sheikh — 3rd Year ECE",
  },
  {
    id: "t6",
    teamName: "DataCanvas",
    event: "Open Data Visualisation Challenge",
    eventId: "data-viz-challenge",
    lookingFor: "Frontend Developer",
    currentSize: 1,
    maxSize: 2,
    skills: ["Web Development", "Data Science", "UI/UX"],
    deadline: "Aug 21",
    description: "I have the dataset and analysis ready; need someone to build the dashboard.",
    contact: "Email",
    postedBy: "Nidhi Rao — 2nd Year CSE",
  },
];

export const skillFilters = [
  "Python",
  "Java",
  "C",
  "AI/ML",
  "Web Development",
  "UI/UX",
  "Cloud",
  "Data Science",
  "Cybersecurity",
  "Hardware",
];

export type Resource = {
  id: string;
  name: string;
  category: string;
  expertise: string;
  description: string;
  availability: string;
  details: string;
};

export const resources: Resource[] = [
  {
    id: "rnd-cell",
    name: "R&D Cell",
    category: "R&D Cell",
    expertise: "Research proposals, funding, publications",
    description: "Central body supporting student research projects and funded proposals.",
    availability: "Mon-Fri, 10 AM - 4 PM",
    details:
      "The R&D Cell reviews student proposals every fortnight, helps map ideas to funding schemes, connects teams with faculty guides and supports conference submissions.",
  },
  {
    id: "patent-cell",
    name: "Patent & IPR Support Desk",
    category: "Patent Support",
    expertise: "Patent drafting, prior-art search, filing",
    description: "Guidance on protecting student inventions and filing provisional patents.",
    availability: "Tue & Thu, 2 PM - 5 PM",
    details:
      "Provides prior-art searches, drafting templates, and a partnership with a patent attorney for student filings. Filing fees are subsidised for shortlisted innovations.",
  },
  {
    id: "incubation",
    name: "Incubation & Innovation Centre",
    category: "Innovation Support",
    expertise: "Prototyping grants, startup incubation",
    description: "Workspace, seed grants and mentors for student ventures.",
    availability: "Mon-Sat, 9 AM - 7 PM",
    details:
      "Offers desk space, a prototyping fund of up to ₹1,00,000, legal and accounting clinics, and a demo day every semester.",
  },
  {
    id: "edge-lab",
    name: "Edge Computing & AI Lab",
    category: "Labs",
    expertise: "GPU compute, edge devices, vision datasets",
    description: "GPU workstations and edge kits available for approved student projects.",
    availability: "Slot booking, 8 AM - 8 PM",
    details:
      "Four RTX workstations, Jetson Nano and Coral kits, and a curated dataset library. Book slots through the lab coordinator with a project brief.",
  },
  {
    id: "fablab",
    name: "Fabrication Lab",
    category: "Labs",
    expertise: "3D printing, laser cutting, PCB fabrication",
    description: "Rapid prototyping facility for hardware projects.",
    availability: "Mon-Fri, 10 AM - 6 PM",
    details:
      "3D printers, laser cutter, CNC mill and a PCB etching station. Material costs are charged at cost price; safety induction is mandatory.",
  },
  {
    id: "alumni-network",
    name: "Alumni Mentor Network",
    category: "Alumni",
    expertise: "Career guidance, referrals, industry insight",
    description: "300+ alumni across product, research and startups open to mentoring.",
    availability: "Scheduled calls",
    details:
      "Browse alumni by company and domain, request a 30-minute call, and get resume and interview feedback. Referrals are at the alumnus's discretion.",
  },
  {
    id: "industry-panel",
    name: "Industrial Expert Panel",
    category: "Industrial Experts",
    expertise: "Domain reviews, feasibility, industry problems",
    description: "Visiting industry professionals who review projects and share live problems.",
    availability: "Fortnightly review sessions",
    details:
      "A rotating panel from cloud, fintech, manufacturing and healthcare. Teams can book a feasibility review before submitting to competitions.",
  },
  {
    id: "faculty-mentors",
    name: "Faculty Mentorship Programme",
    category: "Faculty Mentors",
    expertise: "Academic guidance, project supervision",
    description: "Match with a faculty mentor aligned to your domain of interest.",
    availability: "Weekly office hours",
    details:
      "Each student can request one primary mentor per semester. Mentors help with project scoping, paper writing and higher-studies planning.",
  },
  {
    id: "ecell-support",
    name: "Entrepreneurship Support Desk",
    category: "Entrepreneurship Support",
    expertise: "Business models, pitching, compliance",
    description: "Practical help turning a project into a venture.",
    availability: "Wed & Fri, 3 PM - 6 PM",
    details:
      "Business model canvas clinics, pitch deck reviews, registration and compliance guidance, and introductions to angel networks.",
  },
];

export type Expert = {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  experience: string;
  availableFor: string[];
  bio: string;
};

export const experts: Expert[] = [
  {
    id: "meera-nair",
    name: "Dr. Meera Nair",
    role: "Professor, CSE (AIML) & R&D Coordinator",
    expertise: ["AI/ML", "Computer Vision", "Edge AI"],
    experience: "16 years teaching, 40+ publications",
    availableFor: ["Mentorship", "Research", "Project Guidance"],
    bio: "Leads the Edge AI lab and supervises undergraduate research assistantships. Focus areas are efficient vision models and privacy-preserving inference.",
  },
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    role: "Principal Engineer, Cloud Platform (Alumnus)",
    expertise: ["Cloud", "Distributed Systems", "DevOps"],
    experience: "11 years in industry",
    availableFor: ["Career Guidance", "Mentorship", "Project Guidance"],
    bio: "Builds multi-region platform infrastructure. Happy to review architecture for student projects and help plan cloud certification paths.",
  },
  {
    id: "kavita-desai",
    name: "Prof. Kavita Desai",
    role: "Associate Professor, Design & HCI",
    expertise: ["UI/UX", "HCI Research", "Design Systems"],
    experience: "12 years, design consultant",
    availableFor: ["Mentorship", "Project Guidance"],
    bio: "Runs the design studio and mentors the Design Guild. Interested in accessible interfaces and research-led product design.",
  },
  {
    id: "sameer-khan",
    name: "Sameer Khan",
    role: "Security Architect, Fintech (Industry Expert)",
    expertise: ["Cybersecurity", "Threat Modelling", "AppSec"],
    experience: "9 years in security engineering",
    availableFor: ["Mentorship", "Career Guidance"],
    bio: "Mentors the CyberShield club and coaches CTF teams. Can review the security posture of student projects.",
  },
  {
    id: "p-venkatesh",
    name: "Dr. P. Venkatesh",
    role: "Professor, ECE & Robotics Lab In-charge",
    expertise: ["Hardware", "Embedded Systems", "IoT"],
    experience: "18 years, 6 patents",
    availableFor: ["Research", "Project Guidance", "Patent Guidance"],
    bio: "Supervises embedded and robotics projects and guides students through patent filing for hardware inventions.",
  },
  {
    id: "rhea-menon",
    name: "Rhea Menon",
    role: "Founder, Climate-tech Startup (Alumna)",
    expertise: ["Business", "Product", "Fundraising"],
    experience: "7 years, raised two rounds",
    availableFor: ["Mentorship", "Career Guidance"],
    bio: "Built a climate analytics startup from a campus project. Advises student founders on early traction and fundraising.",
  },
];

export type Reminder = {
  id: string;
  title: string;
  related: string;
  when: "Today" | "Tomorrow" | "This Week";
  time: string;
  priority: "Urgent" | "High" | "Normal";
  linkTo?: string;
};

export const initialReminders: Reminder[] = [
  {
    id: "r1",
    title: "Club registration closes tonight",
    related: "Design Guild",
    when: "Today",
    time: "Today, 11:59 PM",
    priority: "Urgent",
    linkTo: "/app/clubs/design-guild",
  },
  {
    id: "r2",
    title: "Team meeting — Team Cipher",
    related: "XYZ National Hackathon",
    when: "Today",
    time: "Today, 6:00 PM",
    priority: "High",
    linkTo: "/app/teams",
  },
  {
    id: "r3",
    title: "Hackathon registration closes tomorrow",
    related: "XYZ National Hackathon 2026",
    when: "Tomorrow",
    time: "Tomorrow, 5:00 PM",
    priority: "Urgent",
    linkTo: "/app/opportunities/xyz-hackathon",
  },
  {
    id: "r4",
    title: "Python certification exam",
    related: "PCEP — Python Institute",
    when: "This Week",
    time: "Aug 14, 10:00 AM",
    priority: "High",
    linkTo: "/app/certifications",
  },
  {
    id: "r5",
    title: "R&D idea submission deadline in 3 days",
    related: "AI Ideathon — Campus Edition",
    when: "This Week",
    time: "Aug 18, 11:59 PM",
    priority: "Normal",
    linkTo: "/app/rnd",
  },
];

export type NexusNotification = {
  id: string;
  category:
    | "Academic"
    | "Clubs"
    | "Opportunities"
    | "Teams"
    | "Deadlines"
    | "Mentorship"
    | "R&D"
    | "Reminders";
  title: string;
  body: string;
  time: string;
  read: boolean;
  linkTo: string;
};

export const initialNotifications: NexusNotification[] = [
  {
    id: "n1",
    category: "Deadlines",
    title: "Google Cloud certification closes today",
    body: "Registration for the subsidised drive closes at midnight.",
    time: "10 min ago",
    read: false,
    linkTo: "/app/opportunities/google-cloud-cert",
  },
  {
    id: "n2",
    category: "Teams",
    title: "Team Cipher is looking for a Python developer",
    body: "Your Python skill matches this open team request.",
    time: "40 min ago",
    read: false,
    linkTo: "/app/teams",
  },
  {
    id: "n3",
    category: "Academic",
    title: "Mid-sem examination schedule released",
    body: "Exams start Sep 01. Clear pending internals by Aug 24.",
    time: "2 hours ago",
    read: false,
    linkTo: "/app/academic",
  },
  {
    id: "n4",
    category: "Clubs",
    title: "AI Club: Paper Reading Night on Aug 19",
    body: "This week's paper is on efficient vision transformers.",
    time: "5 hours ago",
    read: false,
    linkTo: "/app/clubs/ai-club",
  },
  {
    id: "n5",
    category: "Opportunities",
    title: "New internship posted — Zentra Labs",
    body: "Product engineering internship matching your skills.",
    time: "Yesterday",
    read: true,
    linkTo: "/app/opportunities/summer-internship",
  },
  {
    id: "n6",
    category: "Mentorship",
    title: "Dr. Meera Nair opened mentorship slots",
    body: "Research assistantship guidance slots for this month.",
    time: "Yesterday",
    read: true,
    linkTo: "/app/experts",
  },
  {
    id: "n7",
    category: "R&D",
    title: "R&D pipeline review on Aug 21",
    body: "Submitted ideas will be reviewed by the faculty panel.",
    time: "2 days ago",
    read: true,
    linkTo: "/app/rnd",
  },
];

export type Student = {
  id: string;
  name: string;
  branch: string;
  year: string;
  skills: string[];
};

export const students: Student[] = [
  { id: "s1", name: "Rohan Iyer", branch: "CSE", year: "3rd Year", skills: ["Python", "AI/ML", "Cloud"] },
  { id: "s2", name: "Ananya Pillai", branch: "IT", year: "2nd Year", skills: ["UI/UX", "Web Development"] },
  { id: "s3", name: "Sana Qureshi", branch: "CSE - AIML", year: "3rd Year", skills: ["AI/ML", "Python", "Data Science"] },
  { id: "s4", name: "Farhan Sheikh", branch: "ECE", year: "3rd Year", skills: ["Hardware", "C", "Cloud"] },
  { id: "s5", name: "Nidhi Rao", branch: "CSE", year: "2nd Year", skills: ["Web Development", "Data Science"] },
  { id: "s6", name: "Yash Agarwal", branch: "CSE", year: "4th Year", skills: ["Cybersecurity", "Python"] },
];

export type Ticker = {
  id: string;
  label: string;
  date: string;
  urgency: Urgency;
  linkTo: string;
};

export const tickerItems: Ticker[] = [
  {
    id: "tk1",
    label: "Google Cloud Certification — Registration closes",
    date: "Aug 12",
    urgency: "DUE TODAY",
    linkTo: "/app/opportunities/google-cloud-cert",
  },
  {
    id: "tk2",
    label: "UI/UX Bootcamp — Registration closes",
    date: "Aug 13",
    urgency: "DUE TOMORROW",
    linkTo: "/app/opportunities/uiux-workshop",
  },
  {
    id: "tk3",
    label: "XYZ Hackathon — Team registration closes",
    date: "Aug 15",
    urgency: "DUE THIS WEEK",
    linkTo: "/app/opportunities/xyz-hackathon",
  },
  {
    id: "tk4",
    label: "DBMS Assignment-2 — Submission due",
    date: "Aug 16",
    urgency: "DUE THIS WEEK",
    linkTo: "/app/academic",
  },
  {
    id: "tk5",
    label: "AI Ideathon — Submission deadline",
    date: "Aug 18",
    urgency: "UPCOMING",
    linkTo: "/app/opportunities/ai-ideathon",
  },
  {
    id: "tk6",
    label: "Project Expo — Registration closes",
    date: "Aug 20",
    urgency: "UPCOMING",
    linkTo: "/app/opportunities/project-expo",
  },
  {
    id: "tk7",
    label: "CyberShield CTF — Team entry closes",
    date: "Aug 19",
    urgency: "UPCOMING",
    linkTo: "/app/opportunities/cyber-ctf",
  },
];

export const opportunityCategories = [
  "All",
  "Hackathons",
  "Ideathons",
  "Project Expos",
  "Competitions",
  "Internships",
  "Research",
  "Workshops",
  "Certifications",
] as const;
