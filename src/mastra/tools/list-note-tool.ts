import { createTool } from "@mastra/core/tools";
import path from "path";
import fs from "fs/promises";
import { z } from "zod";

const listNotesToolOutputSchema = z.array(
  z.object({
    noteId: z.string().describe("unique uuid for the note"),
    title: z.string().describe("summary of the note"),
    content: z.string().describe("The content of the note"),
    createdAt: z
      .string()
      .describe(
        "The date and time when the note was created in ISO 8601 format",
      ),
  }),
);

const filePath = path.resolve(process.cwd(), "notes", "notes.json");
export const listNotesTool = createTool({
  id: "list-notes-tool",
  description: "List all saved notes",
  outputSchema: listNotesToolOutputSchema,
  execute: async () => {
    console.log("Listing all notes...", filePath);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  },
});
