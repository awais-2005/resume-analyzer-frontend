import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import MinimalNavBar from "@/components/MinimalNavBar";

const templates = [
  {
    id: "tmp1",
    name: "Modern Professional",
    description: "Clean and contemporary design with a focus on readability and modern aesthetics. Perfect for tech and creative roles.",
    image: "/templates/tmp1.jpg",
    features: ["Profile picture support", "Two-column layout", "Skills highlight"],
    requiresProfileImage: true,
  },
  {
    id: "tmp2",
    name: "Classic Elegant",
    description: "Timeless design with a traditional layout. Ideal for conservative industries and senior positions.",
    image: "/templates/tmp2.jpg",
    features: ["Single-column layout", "Traditional formatting", "Professional look"],
    requiresProfileImage: false,
  },
  {
    id: "temp3",
    name: "Creative Bold",
    description: "Stand out with this eye-catching design. Features accent colors and modern typography for creative professionals.",
    image: "/templates/temp3.jpg",
    features: ["Profile picture support", "Color accents", "Modern typography"],
    requiresProfileImage: true,
  },
  {
    id: "temp5",
    name: "Minimal Clean",
    description: "Less is more. A minimalist approach that lets your experience speak for itself. Great for any industry.",
    image: "/templates/temp5.jpg",
    features: ["Minimal design", "Maximum whitespace", "Easy to scan"],
    requiresProfileImage: false,
  },
  {
    id: "temp6",
    name: "Executive Premium",
    description: "Sophisticated design for senior professionals and executives. Conveys authority and expertise.",
    image: "/templates/temp6.jpg",
    features: ["Premium styling", "Executive layout", "Authority design"],
    requiresProfileImage: false,
  },
];

export default function CreateResumePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      {/* <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-900">ResumeAI</span>
          </div>
        </div>
      </header> */}

      <MinimalNavBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-emerald-600">Template</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Select a template to get started. You can always change it later.
          </p>
        </div>

        {/* Templates Row */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group w-[140px] md:w-[200px] flex-shrink-0"
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                
                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Link
                    href={`/create/${template.id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm px-3 py-2 md:px-5 md:py-2 rounded font-medium transition-colors shadow-lg"
                  >
                    Use template
                  </Link>
                </div>
              </div>

              {/* Template Name */}
              <p className="mt-3 text-center text-gray-700 font-medium text-sm">
                {template.name}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze an existing resume instead
          </Link>
        </div>
      </main>
    </div>
  );
}
