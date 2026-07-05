"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import ResumeBuilderForm from "@/components/ResumeBuilderForm";
import { ResumeModel } from "@/app/types/Resume";
import { createResume } from "@/app/utils/serverRequests";
import { LoadingResume2 } from "@/components/LoadingResume";
import MinimalNavBar from "@/components/MinimalNavBar";

const validTemplates = ["temp1", "temp2", "temp3", "temp5", "temp6"];

const templatesRequiringProfileImage = ["temp1", "temp3"];

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export default function CreateResumeWithTemplatePage({ params }: PageProps) {
  const { templateId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!validTemplates.includes(templateId)) {
    notFound();
  }

  const requiresProfileImage = templatesRequiringProfileImage.includes(templateId);

  async function handleSubmit(data: ResumeModel & { profileImage?: File }) {
    try {
      setLoading(true);
      const res = await createResume(data, templateId);
      localStorage.setItem('buffer', JSON.stringify(res.buffer));
      localStorage.setItem('summary', JSON.stringify(res.polishSummary));
      router.push(`/download?template=${templateId}`);
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : typeof e === "string" ? e : "Failed to create resume. Please try again.";
      router.push(`/error-page?message=${encodeURIComponent(message)}`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-100svh flex flex-col">
        <MinimalNavBar />
        <section className="flex-1 py-10 bg-gray-50/50 flex items-center justify-center">
          <LoadingResume2 />
        </section>
      </div>
    );
  }

  return (
    <ResumeBuilderForm
      templateId={templateId}
      requiresProfileImage={requiresProfileImage}
      onSubmit={handleSubmit}
    />
  );
}
