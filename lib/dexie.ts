import Dexie, { type EntityTable } from "dexie";

interface Project {
  address: string;
  tx: string;
}

interface ProjectBadge {
  id: number;
  projectAddress: string;
  badgeId: number;
  tx: string;
}

interface Log {
  id: number;
  projectAddress: string;
  authority: string;
  title: string;
  address: string;
  tx: string;
}

const db = new Dexie("HoneycombDB") as Dexie & {
  projects: EntityTable<Project, "address">;
  projectBadges: EntityTable<ProjectBadge, "id">;
  logs: EntityTable<Log, "id">;
};

// Schema declaration:
db.version(1).stores({
  projects: "address, tx",
  projectBadges: "++id, projectAddress, badgeId, tx",
});

db.version(2).stores({
  logs: "++id, projectAddress, authority, title, address, tx",
});

export type { Project };
export { db };
