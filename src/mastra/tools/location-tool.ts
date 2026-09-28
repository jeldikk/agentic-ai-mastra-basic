import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const locationToolInputSchema = z.object({
  city: z
    .string()
    .min(1, "City name is required")
    .describe("The name of the city to get the location for"),
});

const locationToolOutputSchema = z.object({
  name: z.string().describe("The name of the city"),
  latitude: z.number().describe("The latitude of the city"),
  longitude: z.number().describe("The longitude of the city"),
});

export const locationTool = createTool({
  id: "get-location-coordinated-by-city",
  description: "Fetch latitude and longitude information for a given city name",
  inputSchema: locationToolInputSchema,
  outputSchema: locationToolOutputSchema,
  execute: async (
    inputArgs: z.infer<typeof locationToolInputSchema>,
    { abortSignal },
  ) => {
    const city = inputArgs.city;
    console.log({ city });
    // Implement the logic to fetch location data for the given city
    const fetchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    const response = await fetch(fetchUrl, {
      signal: abortSignal,
    });
    const data = (await response.json()) as {
      results?: { latitude: number; longitude: number; name: string }[];
    };
    const locationInformation = data.results?.[0];
    const latitude = locationInformation?.latitude ?? 0;
    const longitude = locationInformation?.longitude ?? 0;
    const name = locationInformation?.name ?? "";
    console.log({ latitude, longitude, name });
    return {
      name,
      latitude,
      longitude,
    };
  },
});
