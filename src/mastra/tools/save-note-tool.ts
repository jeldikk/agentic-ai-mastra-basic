import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import fs from "fs/promises";
import crypto from "crypto";
import path from "node:path";

const filePath = path.resolve(process.cwd(), "notes", "notes.json");

const saveNoteToolInputSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .describe("The title of the note"),
  content: z
    .string()
    .min(1, "Content is required")
    .describe("The content of the note"),
});

const saveNoteToolOutputSchema = z.object({
  success: z.boolean().describe("Indicates if the note was successfully saved"),
  noteId: z.string().describe("The ID of the saved note"),
});

export const saveNoteTool = createTool({
  id: "save-note",
  description: "Tool to save a note",
  inputSchema: saveNoteToolInputSchema,
  outputSchema: saveNoteToolOutputSchema,
  execute: async (inputArgs: z.infer<typeof saveNoteToolInputSchema>) => {
    const { title, content } = inputArgs;
    console.log({ title, content, filePath });

    // check if file exists and create it if it doesn't
    try {
      await fs.access(filePath);
    } catch {
      console.log("Creating folder and notes file first time");
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
    }

    const existingNotes = await fs.readFile(filePath, "utf-8");
    const notes = existingNotes ? JSON.parse(existingNotes) : [];
    // Implement the logic to save the note here
    const noteId = crypto.randomUUID();
    await fs.writeFile(
      filePath,
      JSON.stringify(
        [
          ...notes,
          { noteId, title, content, createdAt: new Date().toISOString() },
        ],
        null,
        2,
      ),
    );
    const success = true; // Replace with actual save logic
    return { success, noteId };
  },
});
