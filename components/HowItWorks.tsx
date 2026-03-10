interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload Your Resume",
    description: "Drag and drop or browse to upload your resume in PDF, DOC, or DOCX format.",
  },
  {
    number: "02",
    title: "AI Analyzes It",
    description: "Our AI engine scans your resume for ATS compatibility, keywords, formatting, and impact.",
  },
  {
    number: "03",
    title: "Get Your Score",
    description: "Receive a detailed breakdown with scores, suggestions, and actionable improvements.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-emerald-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="mt-4 text-gray-600">Three simple steps to a better resume</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-emerald-200" />
              )}
              <div className="w-20 h-20 bg-white border-2 border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10">
                <span className="text-2xl font-bold text-emerald-600">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
