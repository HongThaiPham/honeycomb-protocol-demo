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

const db = new Dexie("HoneycombDB") as Dexie & {
  projects: EntityTable<Project, "address">;
  projectBadges: EntityTable<ProjectBadge, "id">;
};

// Schema declaration:
db.version(1).stores({
  projects: "address, tx",
  projectBadges: "++id, projectAddress, badgeId, tx",
});

export type { Project };
export { db };
