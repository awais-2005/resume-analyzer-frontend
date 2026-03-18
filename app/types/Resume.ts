export interface ResumeMetadata {
    filename: string;
    originalName: string;
    content: string;
    size: number;
    path: string;
    uploadedAt: Date;
    pages?: number;
    encrypted?: boolean;
    author?: string;
    title?: string;
}

export interface ResumeProcessOptions {
    extractText?: boolean;
    generateThumbnail?: boolean;
    validateStructure?: boolean;
}

export interface StructuredResume {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
    headline: string;
    summary: string;
    experience: {
        title: string;
        company: string;
        location: string;
        dates: string;
        bullets: string[];
        keyAchievement?: string;
    }[];
    projects: {
        name: string;
        description: string;
        technologies: string;
        link?: string;
        dates?: string;
        bullets: string[];
        impact?: string;
    }[];
    education: {
        degree: string;
        school: string;
        dates: string;
        details: string;
        highlights?: string[];
    }[];
    skills: {
        category: string;
        items: string;
    }[];
    certifications: string[];
    languages?: string[];
    additionalSections?: {
        title: string;
        entries: {
            label: string;
            description: string;
            date?: string;
        }[];
    }[];
    polishSummary: PolishSummary;
}

export interface PolishSummary {
    changesApplied: string[];
    scoreImprovementAreas: string[];
    atsKeywordsInjected: string[];
    estimatedNewScore: number;
};

// Generic resume model that works across all professions
export interface ResumeModel {
    // Personal Info
    name: string;
    email: string;
    phone: string;
    location: string;
    headline: string;       // e.g. "Marketing Manager", "Registered Nurse", "Software Engineer"
    summary: string;

    // Online Presence (all optional — not every profession uses these)
    linkedin?: string;
    website?: string;        // portfolio, personal site, etc.
    additionalLinks?: string[];  // any other relevant URLs (GitHub, Behance, Dribbble, etc.)

    // Work Experience
    experience: ResumeExperience[];

    // Education
    education: ResumeEducation[];

    // Projects / Portfolio Work (optional — relevant for many professions)
    projects?: ResumeProject[];

    // Skills — flat list of skill strings
    skills: string[];

    // Certifications (optional)
    certifications?: ResumeCertification[];

    // Languages (optional)
    languages?: ResumeLanguage[];

    // Catch-all for profession-specific sections (e.g. Publications, Volunteer Work, Awards)
    customSections?: ResumeCustomSection[];
}

export interface ResumeExperience {
    title: string;           // Job title / role
    organization: string;    // Company, hospital, school, firm, etc.
    location?: string;
    startDate: string;       // e.g. "Jan 2020"
    endDate: string;         // e.g. "Present"
    employmentType?: string; // Full-time, Part-time, Contract, Freelance, Internship
    description: string[];   // bullet points / key responsibilities
    keyAchievement?: string;
}

export interface ResumeEducation {
    degree: string;
    institution: string;
    fieldOfStudy?: string;
    startYear?: string;
    endYear?: string;
    details?: string;        // GPA, honors, relevant coursework, etc.
}

export interface ResumeProject {
    name: string;
    description: string;
    toolsUsed?: string;      // generic: could be tech stack, software, methods, etc.
    link?: string;
    dates?: string;
    highlights?: string[];   // key outcomes / bullet points
    impact?: string;
}

export interface ResumeCertification {
    name: string;
    organization: string;
    year?: string;
}

export interface ResumeLanguage {
    name: string;
    proficiency: string;     // Native, Fluent, Advanced, Intermediate, Basic
}

export interface ResumeCustomSection {
    title: string;           // e.g. "Publications", "Volunteer Work", "Awards"
    entries: {
        label: string;
        description: string;
        date?: string;
    }[];
}
