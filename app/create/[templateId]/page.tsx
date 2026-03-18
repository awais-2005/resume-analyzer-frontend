import { notFound } from "next/navigation";
import ResumeBuilderForm from "@/components/ResumeBuilderForm";
import { ResumeModel } from "@/app/types/Resume";

const validTemplates = ["tmp1", "tmp2", "temp3", "temp5", "temp6"];

const templatesRequiringProfileImage = ["tmp1", "temp3"];

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export default async function CreateResumeWithTemplatePage({ params }: PageProps) {
  const { templateId } = await params;

  if (!validTemplates.includes(templateId)) {
    notFound();
  }

  const requiresProfileImage = templatesRequiringProfileImage.includes(templateId);

  async function handleSubmit(data: ResumeModel & { profileImage?: File }) {
    "use server";
    console.log("Resume data submitted:", data);
    console.log("Template ID:", templateId);
    console.log("Profile image:", data.profileImage?.name);
  }

  return (
    <ResumeBuilderForm
      templateId={templateId}
      requiresProfileImage={requiresProfileImage}
      onSubmit={handleSubmit}
    />
  );
}
