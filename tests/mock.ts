import { ResumeAnalysis } from "@/app/types/ResumeAnalysis";

export const mockATSAnalysis: ResumeAnalysis = {
  overallScore: 78,
  atsScore: 82,
  formattingScore: 74,
  keywordScore: 80,
  impactScore: 68,
  clarityScore: 76,
  creativityScore: 62,
  grade: "B+",
  recruiterVerdict:
    "Solid early-career backend candidate with internship experience — but metrics are nowhere to be found.",
  overallFeedback:
    "The resume demonstrates a good foundation for a backend engineering role. The internship and projects align well with the stated career direction. However, the resume would be significantly stronger with quantified achievements, deeper technical descriptions, and clearer demonstration of impact.",

  strengths: [
    "Relevant backend stack including Node.js, Express, and MongoDB",
    "Hands-on internship experience building APIs",
    "Portfolio projects demonstrate practical application of skills",
    "Clear focus on backend engineering career path",
    "Includes modern tools like Docker and Git",
  ],
  weaknesses: [
    "Most bullet points lack measurable results or metrics",
    "Projects described at a high level without technical depth",
    "Summary section is generic and could be more specific",
    "Limited evidence of system design or scalability work",
  ],
  missedOpportunities: [
    "No GitHub repository links attached to any project",
    "No mention of automated testing or test coverage",
    "No production deployment examples or live URLs",
    "No indication of team size or collaboration context",
    "No metrics such as number of users, requests handled, or uptime",
  ],

  grammarIssues: [
    {
      original: "Implement authentication system with JWT.",
      suggestion: "Implemented an authentication system using JWT.",
      context: "Experience bullet point — present tense used instead of past tense",
      severity: "moderate",
      apply: false,
    },
    {
      original: "Worked with MongoDB to store and retrieve user data.",
      suggestion: "Worked with MongoDB to efficiently store and retrieve user data.",
      context: "Experience bullet point — missing qualifier weakens clarity",
      severity: "minor",
      apply: false,
    },
    {
      original: "Used MongoDB for storing task and user data.",
      suggestion: "Used MongoDB to store task and user data.",
      context: "Project description — incorrect preposition usage",
      severity: "minor",
      apply: false,
    },
  ],

  impactUpgrades: [
    {
      original: "Developed REST API endpoints using Node.js and Express.",
      upgraded:
        "Developed 12+ REST API endpoints using Node.js and Express, supporting authentication, user management, and data retrieval.",
      reason: "Adds measurable scope and demonstrates the scale of work done.",
      apply: false,
    },
    {
      original: "Improved API performance by optimizing database queries.",
      upgraded:
        "Improved API response time by ~35% by optimizing MongoDB queries and indexing frequently accessed fields.",
      reason: "Quantifies the performance improvement with a concrete metric.",
      apply: false,
    },
    {
      original: "Built small business websites using React and Node.js.",
      upgraded:
        "Built and deployed 5+ small business websites using React and Node.js, handling full-stack development from UI to backend API.",
      reason: "Shows volume of work, deployment ownership, and full-stack responsibility.",
      apply: false,
    },
  ],

  creativityBoosts: [
    {
      original: "TaskFlow – Task Management API",
      suggestion: "TaskFlow – Scalable Task Management API with Role-Based Access Control",
      context: "Project title — generic name undersells the technical complexity",
      apply: false,
    },
    {
      original: "Expense Tracker App",
      suggestion: "Expense Tracker – Personal Finance Analytics App",
      context: "Project title — 'App' suffix adds no value; reframe around the user benefit",
      apply: false,
    },
  ],

  keywordSuggestions: [
    {
      keyword: "REST API Design",
      reason: "Directly evidenced by internship work building API endpoints",
      evidenceFrom: "Developed REST API endpoints using Node.js and Express",
      apply: false,
    },
    {
      keyword: "JWT Authentication",
      reason: "Explicitly mentioned in experience section",
      evidenceFrom: "Implement authentication system with JWT",
      apply: false,
    },
    {
      keyword: "MongoDB",
      reason: "Used across both internship and projects",
      evidenceFrom: "Used MongoDB for storing task and user data",
      apply: false,
    },
    {
      keyword: "Docker",
      reason: "Listed in skills section",
      evidenceFrom: "Includes modern tools like Docker and Git",
      apply: false,
    },
    {
      keyword: "CI/CD",
      reason: "Natural next step given Docker usage and deployment context implied by projects",
      evidenceFrom: "Built and deployed small business websites using React and Node.js",
      apply: false,
    },
    {
      keyword: "Unit Testing",
      reason: "Absent from resume despite backend API work — expected for Node.js roles",
      evidenceFrom: "Developed REST API endpoints using Node.js and Express",
      apply: false,
    },
    {
      keyword: "Microservices",
      reason: "Implied by multi-endpoint API architecture in internship",
      evidenceFrom: "Developed REST API endpoints using Node.js and Express supporting authentication, user management, and data retrieval",
      apply: false,
    },
    {
      keyword: "Redis",
      reason: "Common complement to MongoDB in Node.js stacks — implied by performance optimization work",
      evidenceFrom: "Improved API performance by optimizing database queries",
      apply: false,
    },
  ],

  formattingTips: [
    {
      tip: "Add metrics to every experience bullet — performance improvement %, users served, endpoints built",
      reason: "Recruiters scan for numbers; bullets without metrics are forgettable",
      apply: false,
    },
    {
      tip: "Limit summary to 2–3 concise lines focused on your stack and career goal",
      reason: "Current summary is generic and doesn't differentiate the candidate",
      apply: false,
    },
    {
      tip: "Group technical skills by category: Languages, Frameworks, Databases, Tools, Cloud",
      reason: "Flat skill lists are harder to scan and score lower in ATS keyword matching",
      apply: false,
    },
    {
      tip: "Ensure consistent past tense across all experience bullets",
      reason: "Mixed tense reads as careless to recruiters and fails some ATS parsers",
      apply: false,
    },
    {
      tip: "Add GitHub or live demo links next to each project name",
      reason: "Backend projects without links are unverifiable — links increase credibility significantly",
      apply: false,
    },
  ],

  redFlags: [
    {
      issue: "No quantified achievements anywhere in the resume",
      impact: "Recruiter cannot evaluate the scale or significance of any contribution",
      fix: "Add at least one metric per role: response time improvement, number of endpoints, users served, or team size",
      apply: false,
    },
    {
      issue: "Projects described superficially with no technical depth",
      impact: "Engineering complexity and problem-solving ability are invisible to the hiring team",
      fix: "Include architecture decisions, key libraries, challenges solved, and deployment environment for each project",
      apply: false,
    },
  ],

  candidatePersona: {
    archetype: "The Early-Career Backend Builder",
    tone: "Practical and technically focused but undersells accomplishments",
    standoutFactor: "Relevant backend internship combined with API-focused personal projects",
    hiringRisk: "medium",
    hiringRiskReason:
      "Strong potential and relevant direction, but absence of metrics and technical depth makes it hard to benchmark against other candidates.",
  },
};

export const mockResumeContent = `John Ahmed
Lahore, Pakistan
john.ahmed.dev@gmail.com
+92 300 1234567
github.com/johnahmed-dev
linkedin.com/in/johnahmed

SUMMARY
Motivated Computer Science graduate with strong interest in backend development and scalable web systems. Experience building REST APIs using Node.js and Express. Familiar with databases, authentication systems, and deploying applications to cloud platforms. Looking to contribute to a growing engineering team where I can improve my backend and system design skills.

SKILLS
Programming: JavaScript, Python, Java
Backend: Node.js, Express.js, REST APIs
Databases: MongoDB, MySQL
Tools: Git, Docker, Postman
Frontend: HTML, CSS, React
Cloud: AWS (basic), Firebase
Other: Data Structures, OOP, Agile

EXPERIENCE

Backend Developer Intern
TechNova Solutions
Jun 2024 – Sep 2024

- Developed REST API endpoints using Node.js and Express.
- Implement authentication system with JWT.
- Worked with MongoDB to store and retrieve user data.
- Collaborated with frontend team to integrate APIs.
- Improved API performance by optimizing database queries.

Junior Web Developer
Freelance
Jan 2023 – May 2024

- Built small business websites using React and Node.js.
- Integrated payment APIs and contact forms.
- Maintained client websites and fixed bugs.
- Communicated with clients to understand requirements.

PROJECTS

TaskFlow – Task Management API
- Built a REST API for task management using Node.js and Express.
- Implemented JWT authentication and role based access control.
- Used MongoDB for storing task and user data.
- Added pagination and filtering for better performance.

Expense Tracker App
- Developed a personal expense tracker using React and Node.js.
- Implemented CRUD operations for transactions.
- Created charts to visualize spending patterns.

EDUCATION
BS Computer Science
National University of Modern Languages (NUML)
2022 – 2026

CERTIFICATIONS
AWS Cloud Practitioner (In Progress)
Meta Backend Developer Certificate (Coursera)

ADDITIONAL
- Strong problem solving ability
- Quick learner and team player
- Interested in backend architecture and distributed systems`;


