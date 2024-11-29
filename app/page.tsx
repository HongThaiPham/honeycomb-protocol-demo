import CreateBadgeButton from "@/components/honeycomb/CreateBadgeButton";
import CreateProjectButton from "@/components/honeycomb/CreateProjectButton";
import ProjectLogs from "@/components/honeycomb/ProjectLogs";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto py-5 space-y-5">
      <CreateProjectButton />

      <ProjectLogs />
    </main>
  );
}
