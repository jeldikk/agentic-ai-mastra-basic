import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { locationTool } from "../tools/location-tool";
import { saveNoteTool } from "../tools/save-note-tool";
import { Memory } from "@mastra/memory";
import { listNotesTool } from "../tools/list-note-tool";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { ModelRouterEmbeddingModel } from "@mastra/core/llm";

const instruction = `
## Role
You are a helpful personal assistant.

## Style
Answer clearly and concisely. Be friendly but direct

## Tools
- **getWeather**: Get the current weather for a specific location based on latitude and longitude information.
- **getLocationDetails**: Get detailed information about a specific location based on latitude and longitude information.
- **saveNote**: Save a note with a title and content.
- **listNotes**: List all saved notes.

NEVER PROVIDE INFORMATION YOU DO NOT HAVE. Always respond truthfully and indicate when you do not have enough information.
`.trim();

export const personalAssistanceAgent = new Agent({
  id: "personal-assistant",
  name: "Personal Assistant",
  instructions: instruction,
  model: "openai/gpt-4o-mini",
  tools: {
    getWeather: weatherTool,
    getLocationDetails: locationTool,
    saveNote: saveNoteTool,
    listNotes: listNotesTool,
  },
  memory: new Memory({
    // storage: new LibSQLStore({
    //   id: "agent-store",
    //   url: "file:./agent-store.db",
    // }),
    vector: new LibSQLVector({
      id: "agent-vector",
      url: "file:./agent-vector.db",
    }),
    embedder: new ModelRouterEmbeddingModel("openai/text-embedding-3-small"),
    options: {
      lastMessages: 10,
      semanticRecall: {
        topK: 10,
        messageRange: 3,
        scope: "resource",
      },
      generateTitle: {
        model: "openai/gpt-4o-mini",
        instructions:
          "Generate a concise title for the conversation based on the last messages.",
      },
    },
  }),
});
