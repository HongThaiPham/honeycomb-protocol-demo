"use client";
import { db } from "@/lib/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { getExplorerUrl } from "@/lib/utils";
import Link from "next/link";

const TransactionLogs = () => {
  const logs = useLiveQuery(() => db.logs.toArray());
  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <ul className="space-y-3">
        {logs?.map((log) => (
          <li key={log.address} className="text-wrap border-b p-3">
            <div>
              tx:{" "}
              <a
                href={getExplorerUrl(log.tx)}
                target="_blank"
                className="text-green-500 text-wrap"
              >
                {log.tx}
              </a>
            </div>
            <div>
              address:{" "}
              <a
                href={getExplorerUrl(log.address, "address")}
                target="_blank"
                className="text-green-500 text-wrap"
              >
                {log.address}
              </a>
            </div>
            <div>
              Project address:{" "}
              <Link
                href={"/project/" + log.projectAddress}
                className="text-orange-500 text-wrap"
              >
                {log.projectAddress}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default TransactionLogs;
