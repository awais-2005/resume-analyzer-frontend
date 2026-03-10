import { analyzeResume } from "@/app/utils/serverRequests";

const resumeContent = `
Johnathan Smith
Email: john.smith.dev@gmail.com
Phone: +1 555 913 2210
LinkedIn: linkedin.com/in/johnsmithdev
GitHub: github.com/johnsmith-dev
Location: Austin, Texas

Professional Summary
Motivated software engineer with 3 year experience building web applications. Skilled in JavaScript, React and backend development. Passionate about solving complex problems and building scalable systems. Looking for opportunity where I can grow my technical skills and contribute to innovative products.

Skills
JavaScript, TypeScript, React, Node.js, Express, MongoDB
HTML, CSS, REST APIs, Git, Docker
Basic knowledge of AWS and CI/CD pipelines

Work Experience

Software Engineer
TechNova Solutions
June 2022 - Present

- Developed multiple frontend features using React.
- Improved application performance by optimizing database queries and API calls.
- Work closely with design team to create user friendly interfaces.
- Built REST APIs with Node.js and Express for internal services.
- Responsible for fixing bugs and maintaining existing systems.

Junior Web Developer
BrightApps Studio
Jan 2021 - May 2022

- Assisted in building company web applications.
- Developed several components using React and JavaScript.
- Participated in code reviews and debugging sessions.
- Worked on improving website responsiveness.
- Created basic documentation for internal tools.

Projects

Expense Tracker App
- Built a personal finance mobile app using React Native and Firebase.
- Implement authentication and cloud data storage.
- Designed UI screens and handled state management.

Task Manager Web App
- Developed full stack task management system.
- Backend built with Node.js and Express.
- Frontend created using React.
- Application allow users to create, edit and delete tasks.

Education
Bachelor of Computer Science
University of Texas
2017 - 2021

Achievements
- Built several personal coding projects.
- Participated in university hackathons.

Additional Information
Languages: English (Fluent), Spanish (Intermediate)
Interests: Open source, AI technologies, problem solving
`;


(async function () {
    try {
        const analysis = await analyzeResume(resumeContent);
        console.log(analysis);
    } catch (err) {
        console.log(err);
    }
})




// const response = `{
//   "overallScore": 72,
//   "atsScore": 90,
//   "formattingScore": 95,
//   "keywordScore": 90,
//   "impactScore": 45,
//   "grade": "C",
//   "strengths": [
//     "Excellent ATS keyword compatibility across skills, experience, and projects. Technologies like JavaScript, React, Node.js, Express, MongoDB, AWS, and CI/CD are well-represented.",
//     "Clean, standard formatting with clear headings and bullet points, making it highly suitable for ATS parsing and readability.",
//     "Comprehensive and relevant skills list demonstrating a strong grasp of modern web
// development technologies and tools.",
//     "Dedicated 'Projects' section effectively showcases practical application of skills and full-stack capabilities through personal initiatives.",
//     "Clear and easy-to-read contact information including LinkedIn and GitHub profiles, which are crucial for tech roles."
//   ],
//   "weaknesses": [
//     "Significant lack of measurable achievements and quantifiable results in work experience descriptions. Phrases like 'Improved application performance' lack impact without metrics (e.g., 'by X%', 'resulting in Y reduction').",
//     "Professional Summary is somewhat generic; it could be more specific about unique contributions, career goals, or the type of innovative products Johnathan wishes to build.",
//     "The 'Achievements' section is weak and redundant with the 'Projects' section, offering little additional value. It should either be enhanced with impactful accomplishments or removed.",
//     "Some experience descriptions could utilize stronger, more impactful action verbs and provide more context or specific details of contributions.",
//     "Minor grammatical errors that could be easily corrected to enhance professionalism and clarity."
//   ],
//   "grammarIssues": [
//     {
//       "original": "Motivated software engineer with 3 year experience building web applications.",
//       "suggestion": "Motivated software engineer with 3 years of experience building web applications.",
//       "context": "Professional Summary: Motivated software engineer with 3 year experience building web applications."
//     },
//     {
//       "original": "Looking for opportunity where I can grow my technical skills and contribute to innovative products.",
//       "suggestion": "Looking for an opportunity where I can grow my technical skills and contribute to innovative products.",
//       "context": "Professional Summary: Looking for opportunity where I can grow my technical skills and contribute to innovative products."
//     },
//     {
//       "original": "- Work closely with design team to create user friendly interfaces.",
//       "suggestion": "- Worked closely with the design team to create user-friendly interfaces.",
//       "context": "Work Experience (TechNova Solutions): - Work closely with design team to create user friendly interfaces."
//     }
//   ],
//   "keywordSuggestions": [
//     "Agile Methodologies",
//     "Scrum",
//     "Test-Driven Development (TDD)",
//     "Cloud Platforms (mention specific AWS services like S3, EC2, Lambda if applicable)",
//     "Microservices Architecture",
//     "Continuous Integration/Continuous Deployment (CI/CD)",
//     "Version Control (Git workflows like GitFlow)",
//     "Problem-Solving",
//     "Cross-functional Teams",
//     "API Design"
//   ],
//   "formattingTips": [
//     "Ensure consistent use of hyphens in compound adjectives (e.g., 'user-friendly' instead of 'user friendly').",
//     "While current formatting is excellent for ATS, a brief, one-line technical stack or outcome summary for each project could enhance human readability.",
//     "Consider condensing the 'Additional Information' section or integrating relevant points into the summary or skills to optimize space."
//   ],
//   "overallFeedback": "Johnathan's resume presents a solid technical foundation, demonstrating strong proficiency in modern web development stacks and excellent ATS compatibility due to its clear structure and rich keyword usage. The 'Skills' and 'Projects' sections effectively highlight his hands-on capabilities. However, a significant area for improvement is the lack of measurable achievements and quantifiable impact in his 'Work
// Experience'. Transforming bullet points into accomplishments with specific numbers, percentages, or outcomes would significantly elevate the resume's strength and appeal to recruiters. For instance, instead of 'Improved application performance,' consider 'Improved application performance by X% through optimizing database queries.' The 'Professional Summary' and 'Achievements' section could also be refined for greater impact and relevance to target roles."
// }`

// const demo = `{"name": "Awais","age": 22}`

// let obj;

// try {
//     obj = JSON.parse(demo);
//     console.log("Object: ", obj);
// } catch(err) {
//     console.log(err);
// }
