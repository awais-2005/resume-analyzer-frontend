"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import MinimalNavBar from "@/components/MinimalNavBar";

const templates = [
  {
    id: "temp1",
    name: "Modern Professional",
    image: "/templates/temp1.jpg",
  },
  {
    id: "temp2",
    name: "Classic Elegant",
    image: "/templates/temp2.jpg",
  },
  {
    id: "temp3",
    name: "Creative Bold",
    image: "/templates/temp3.jpg",
  },
  {
    id: "temp5",
    name: "Minimal Clean",
    image: "/templates/temp5.jpg",
  },
  {
    id: "temp6",
    name: "Executive Premium",
    image: "/templates/temp6.jpg",
  },
  {
    id: "temp7",
    name: "Tech Focused",
    image: "/templates/temp7.jpg",
  }
];

export default function FixTemplatePage() {
  const router = useRouter();

  const handleSelect = (templateId: string) => {
    router.push(`/download?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <MinimalNavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Almost there
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pick a <span className="text-emerald-600">Template</span> for Your Fixed Resume
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Your improvements are ready. Choose a template and we&apos;ll generate your polished resume.
          </p>
        </div>

        {/* Template Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="group w-[140px] md:w-[200px] flex-shrink-0 text-left"
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-transparent group-hover:border-emerald-500">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="bg-emerald-600 text-white text-xs md:text-sm px-3 py-2 md:px-5 md:py-2 rounded font-medium shadow-lg">
                    Use template
                  </span>
                </div>
              </div>

              {/* Template Name */}
              <p className="mt-3 text-center text-gray-700 font-medium text-sm group-hover:text-emerald-600 transition-colors truncate">
                {template.name}
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
