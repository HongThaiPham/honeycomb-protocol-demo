"use client";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/dexie";
import { getExplorerUrl } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
type Props = {
  projectAddress: string;
};
const ProjectBadgeLogs: React.FC<Props> = ({ projectAddress }) => {
  const badges = useLiveQuery(() =>
    db.projectBadges
      .where({
        projectAddress,
      })
      .toArray()
  );
  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <ul className="space-y-3">
        {badges?.map((badge) => (
          <li key={badge.tx} className="text-wrap border-b p-3">
            <div>
              tx:{" "}
              <a
                href={getExplorerUrl(badge.tx)}
                target="_blank"
                className="text-green-500 text-wrap"
              >
                {badge.tx}
              </a>
            </div>
            <div>
              Index:{" "}
              <Link
                href={
                  "/project/" + badge.projectAddress + "/badge/" + badge.badgeId
                }
                className="text-orange-500 text-wrap"
              >
                {badge.badgeId}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default ProjectBadgeLogs;
