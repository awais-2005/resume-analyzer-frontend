"use client";

import { useState, useCallback } from "react";
import { ResumeModel } from "@/app/types/Resume";
import {
  Plus,
  X,
  ChevronRight,
  User,
  Mail,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  Languages,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MinimalNavBar from "./MinimalNavBar";

interface ResumeBuilderFormProps {
  templateId: string;
  requiresProfileImage: boolean;
  onSubmit: (data: ResumeModel & { profileImage?: File }) => void;
}

const emptyExperience = {
  title: "",
  organization: "",
  location: "",
  startDate: "",
  endDate: "",
  description: [""],
  keyAchievement: "",
  employmentType: "Full-time",
};

const emptyProject = {
  name: "",
  description: "",
  toolsUsed: "",
  link: "",
  dates: "",
  highlights: [""],
  impact: "",
};

const emptyEducation = {
  degree: "",
  institution: "",
  details: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
};

const emptyCertification = {
  name: "",
  organization: "",
  year: "",
};

const emptyLanguage = {
  name: "",
  proficiency: "Native",
};

export default function ResumeBuilderForm({
  templateId,
  requiresProfileImage,
  onSubmit,
}: ResumeBuilderFormProps) {
  const [formData, setFormData] = useState<ResumeModel>({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    headline: "",
    summary: "",
    experience: [{ ...emptyExperience }],
    projects: [{ ...emptyProject }],
    education: [{ ...emptyEducation }],
    skills: [],
    certifications: [],
    languages: [],
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [skillsInput, setSkillsInput] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(["Project Management", "Customer Service", "Communication", "Team Leadership", "Problem Solving"]);
  const [projectsIncluded, setProjectsIncluded] = useState(true);
  const [certifications, setCertifications] = useState([{ ...emptyCertification }]);
  const [languages, setLanguages] = useState([{ ...emptyLanguage }]);

  const updateField = useCallback(
    <K extends keyof ResumeModel>(field: K, value: ResumeModel[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillsInput.trim()) {
      setSkills([...skills, skillsInput.trim()]);
      setSkillsInput("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Experience handlers
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Education handlers
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateEducation = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Project handlers
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { ...emptyProject }],
    }));
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  // Certification handlers
  const addCertification = () => {
    setCertifications([...certifications, { ...emptyCertification }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setCertifications(certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    ));
  };

  // Language handlers
  const addLanguage = () => {
    setLanguages([...languages, { ...emptyLanguage }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    setLanguages(languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requiresProfileImage && !profileImage) {
      alert("Please upload a profile image for this template.");
      return;
    }
    onSubmit({ ...formData, profileImage: profileImage || undefined });
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-emerald-600" />
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <MinimalNavBar />

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={User} title="Personal Information" />
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Photo */}
              <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-emerald-600 text-center mt-2 cursor-pointer hover:underline">
                  Change Photo
                </p>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => updateField("headline", e.target.value)}
                    placeholder="Project Manager"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Short Bio / Summary</label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                    placeholder="Write a brief professional summary..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={Mail} title="Contact & Location" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="San Francisco"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.linkedin || ""}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={(formData.additionalLinks || [])[0] || ""}
                  onChange={(e) => updateField("additionalLinks", [e.target.value])}
                  placeholder="link-to-portfolio.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Portfolio URL</label>
                <input
                  type="text"
                  value={formData.website || ""}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="mywebsite.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={GraduationCap} title="Education" />
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Arts"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="State University"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                      placeholder="Business Administration"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Start Year</label>
                      <input
                        type="text"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                        placeholder="2018"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase mb-1">End Year</label>
                      <input
                        type="text"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                        placeholder="2022"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 text-xs hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={Briefcase} title="Work Experience" />
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Job Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                      placeholder="Senior Marketing Specialist"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.organization}
                      onChange={(e) => updateExperience(index, "organization", e.target.value)}
                      placeholder="Acme Corporation"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Employment Type</label>
                    <select
                      value={exp.employmentType}
                      onChange={(e) => updateExperience(index, "employmentType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                        placeholder="Jan 2020"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        placeholder="Present"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Description</label>
                  <textarea
                    value={exp.description.join("\n")}
                    onChange={(e) => updateExperience(index, "description", e.target.value.split("\n"))}
                    placeholder="Describe your key achievements and responsibilities..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 text-xs hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle icon={FolderGit2} title="Projects" />
              <button
                type="button"
                onClick={() => setProjectsIncluded(!projectsIncluded)}
                className="flex items-center gap-2"
              >
                {projectsIncluded ? (
                  <ToggleRight className="w-8 h-8 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-xs text-gray-500">Included</span>
              </button>
            </div>

            {projectsIncluded && (
              <>
                {(formData.projects || []).map((proj, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(index, "name", e.target.value)}
                          placeholder="Q3 Marketing Campaign"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Tech Stack</label>
                        <div className="flex gap-2">
                          {["Leadership", "Agile", "Strategy"].map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Description</label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProject(index, "description", e.target.value)}
                          placeholder="Describe your project..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Live URL</label>
                        <input
                          type="text"
                          value={proj.link || ""}
                          onChange={(e) => updateProject(index, "link", e.target.value)}
                          placeholder="project.com"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">GitHub Repository</label>
                        <input
                          type="text"
                          value={proj.link || ""}
                          onChange={(e) => updateProject(index, "link", e.target.value)}
                          placeholder="project-link.com/details"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    {(formData.projects || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-red-500 text-xs hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={Wrench} title="Skills" />
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm  rounded-full border border-emerald-100"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-1 hover:bg-emerald-600 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={handleSkillsKeyDown}
              placeholder="Type a skill and press Enter..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Extras */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <SectionTitle icon={Award} title="Certifications" />
            <div className="flex flex-col gap-2">
              {/* Certifications */}
              <div>
                {certifications.map((cert, index) => (
                  <div key={index} className="mb-3 p-3 rounded-lg">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                      placeholder="Project Management Professional (PMP)"
                      className="w-full mb-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cert.organization}
                        onChange={(e) => updateCertification(index, "organization", e.target.value)}
                        placeholder="Project Management Institute"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updateCertification(index, "year", e.target.value)}
                        placeholder="2023"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    {certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-red-500 text-xs hover:text-red-600 mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCertification}
                  className="flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Certification
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-medium text-gray-900">Languages</h4>
            </div>
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(index, "name", e.target.value)}
                  placeholder="English"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option>Native</option>
                  <option>Fluent</option>
                  <option>Advanced</option>
                  <option>Intermediate</option>
                  <option>Basic</option>
                </select>
                {languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
            >
              <Plus className="w-4 h-4" />
              Add Language
            </button>
          </div>
        </div>


        {/* Generate Resume Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Generate Resume
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="hidden flex-col sm:flex-row gap-4 mt-4">
            <button
              type="button"
              className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Download PDF Draft
            </button>
            <button
              type="button"
              className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Share Preview Link
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
