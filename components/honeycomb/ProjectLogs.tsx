"use client";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/dexie";
import { getExplorerUrl } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

const ProjectLogs = () => {
  const projects = useLiveQuery(() => db.projects.toArray());
  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <ul className="space-y-3">
        {projects?.map((project) => (
          <li key={project.address} className="text-wrap border-b p-3">
            <div>
              tx:{" "}
              <a
                href={getExplorerUrl(project.tx)}
                target="_blank"
                className="text-green-500 text-wrap"
              >
                {project.tx}
              </a>
            </div>
            <div>
              address:{" "}
              <Link
                href={"/project/" + project.address}
                className="text-orange-500 text-wrap"
              >
                {project.address}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default ProjectLogs;
