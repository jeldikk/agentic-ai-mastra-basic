import dotenv from "dotenv";
import { personalAssistanceAgent } from "./agents/personal-assistance";
import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";

dotenv.config();

console.log(
  "Environment loaded. NODE_ENV:",
  process.env.NODE_ENV ?? "development",
);

export const mastra = new Mastra({
  agents: {
    personalAssistanceAgent,
  },
  storage: new LibSQLStore({
    id: "mastra-sql-storage",
    url: "file:./mastra.db",
  }),
});
