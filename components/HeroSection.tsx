export default function HeroSection() {
  return (
    <section className="bg-linear-to-br from-white via-emerald-50/40 to-white -mt-12 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            AI-Powered Resume Analysis
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Land Your Dream Job with a{" "}
            <span className="text-emerald-600">Perfect Resume</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered feedback. We analyze formatting,
            keywords, ATS compatibility, and more to help you stand out from the crowd.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#upload"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
            >
              Analyze My Resume
            </a>
            <a
              href="/create"
              className="bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
            >
              Create New Resume
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">50K+</p>
              <p className="text-sm text-gray-500 mt-1">Resumes Analyzed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">95%</p>
              <p className="text-sm text-gray-500 mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">3s</p>
              <p className="text-sm text-gray-500 mt-1">Avg. Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
