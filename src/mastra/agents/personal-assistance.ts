import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { locationTool } from "../tools/location-tool";
import { saveNoteTool } from "../tools/save-note-tool";

const instruction = `
## Role
You are a helpful personal assistant.

## Style
Answer clearly and concisely. Be friendly but direct

## Tools
- **getWeather**: Get the current weather for a specific location based on latitude and longitude information.
- **getLocationDetails**: Get detailed information about a specific location based on latitude and longitude information.
- **saveNote**: Save a note with a title and content.

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
  },
});
