import CreateBadgeButton from "@/components/honeycomb/CreateBadgeButton";
import ProjectBadgeLogs from "@/components/honeycomb/ProjectBadgeLogs";
import React from "react";

type Props = {
  params: Promise<{ address: string }>;
};

const ProjectPage: React.FC<Props> = async ({ params }) => {
  const { address } = await params;
  return (
    <main className="min-h-screen container mx-auto py-5 space-y-5">
      <CreateBadgeButton projectAddress={address} />
      <ProjectBadgeLogs projectAddress={address} />
    </main>
  );
};

export default ProjectPage;