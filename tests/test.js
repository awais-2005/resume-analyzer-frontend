const jsonString = `{
  "overallScore": 78,
  "atsScore": 82,
  "formattingScore": 74,
  "keywordScore": 80,
  "impactScore": 68,
  "clarityScore": 76,
  "creativityScore": 62,

  "grade": "B+",

  "recruiterVerdict": "Solid early-career backend candidate with relevant internship experience and practical projects. Resume shows technical capability but lacks measurable achievements and deeper technical depth.",

  "strengths": [
    "Relevant backend stack including Node.js, Express, and MongoDB",
    "Hands-on internship experience building APIs",
    "Portfolio projects demonstrate practical application of skills",
    "Clear focus on backend engineering career path",
    "Includes modern tools like Docker and Git"
  ],

  "weaknesses": [
    "Most bullet points lack measurable results or metrics",
    "Projects described at a high level without technical depth",
    "Formatting could be more concise and structured",
    "Summary section is generic and could be more specific",
    "Limited evidence of system design or scalability work"
  ],

  "keywordSuggestions": [
    "Microservices",
    "API Design",
    "System Design",
    "CI/CD",
    "Unit Testing",
    "Integration Testing",
    "Redis",
    "Scalable Architecture",
    "Performance Optimization"
  ],

  "formattingTips": [
    "Add metrics to experience bullets (performance improvement, users served, etc.)",
    "Limit summary to 2–3 concise lines",
    "Group technical skills by category more clearly",
    "Ensure consistent verb tense across experience sections",
    "Highlight most impressive projects with slightly more detail"
  ],

  "overallFeedback": "The resume demonstrates a good foundation for a backend engineering role. The internship and projects align well with the stated career direction. However, the resume would be significantly stronger with quantified achievements, deeper technical descriptions, and clearer demonstration of impact.",

  "grammarIssues": [
    {
      "original": "Implement authentication system with JWT.",
      "suggestion": "Implemented an authentication system using JWT.",
      "context": "Experience bullet point",
      "severity": "moderate"
    },
    {
      "original": "Worked with MongoDB to store and retrieve user data.",
      "suggestion": "Worked with MongoDB to efficiently store and retrieve user data.",
      "context": "Experience bullet point",
      "severity": "minor"
    },
    {
      "original": "Used MongoDB for storing task and user data.",
      "suggestion": "Used MongoDB to store task and user data.",
      "context": "Project description",
      "severity": "minor"
    }
  ],

  "impactUpgrades": [
    {
      "original": "Developed REST API endpoints using Node.js and Express.",
      "upgraded": "Developed 12+ REST API endpoints using Node.js and Express supporting authentication, user management, and data retrieval.",
      "reason": "Adds measurable scope and demonstrates scale of work."
    },
    {
      "original": "Improved API performance by optimizing database queries.",
      "upgraded": "Improved API response time by ~35% by optimizing MongoDB queries and indexing frequently accessed fields.",
      "reason": "Quantifies the performance improvement."
    },
    {
      "original": "Built small business websites using React and Node.js.",
      "upgraded": "Built and deployed 5+ small business websites using React and Node.js, handling both frontend UI and backend API development.",
      "reason": "Shows volume of work and responsibility."
    }
  ],

  "creativityBoosts": [
    {
      "original": "TaskFlow – Task Management API",
      "suggestion": "TaskFlow – Scalable Task Management API with Role-Based Access Control",
      "context": "Project title"
    },
    {
      "original": "Expense Tracker App",
      "suggestion": "Expense Tracker – Personal Finance Analytics App",
      "context": "Project title"
    }
  ],

  "missedOpportunities": [
    "No GitHub repository links for projects",
    "No mention of automated testing or test coverage",
    "No production deployment examples",
    "No indication of team size or collaboration details",
    "No metrics such as number of users or requests handled"
  ],

  "candidatePersona": {
    "archetype": "Early-career backend builder",
    "tone": "Practical and technically focused",
    "standoutFactor": "Relevant backend internship combined with API-focused projects",
    "hiringRisk": "medium",
    "hiringRiskReason": "Candidate shows strong potential but limited production experience and lacks measurable achievements."
  },

  "redFlags": [
    {
      "issue": "Lack of quantified achievements",
      "impact": "Makes it difficult for recruiters to evaluate the scale of contributions.",
      "fix": "Add metrics such as performance improvements, number of users, or number of features built."
    },
    {
      "issue": "Projects described superficially",
      "impact": "Technical depth and engineering complexity are unclear.",
      "fix": "Include architecture details, libraries used, and challenges solved."
    }
  ]
}`;

// console.log(JSON.parse(jsonString));
