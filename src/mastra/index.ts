import dotenv from "dotenv";
import { personalAssistanceAgent } from "./agents/personal-assistance";
import { Mastra } from "@mastra/core/mastra";

dotenv.config();

console.log(
  "Environment loaded. NODE_ENV:",
  process.env.NODE_ENV ?? "development",
);

export const mastra = new Mastra({
  agents: {
    personalAssistanceAgent,
  },
});
