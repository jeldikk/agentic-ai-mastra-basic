import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const weatherToolInputSchema = z.object({
  latitude: z.number().describe("The latitude of the location"),
  longitude: z.number().describe("The longitude of the location"),
});

const weatherToolOutputSchema = z.object({
  temperature: z.string().describe("The current temperature in the city"),
  humidity: z.string().describe("The current humidity in the city"),
  windSpeed: z.string().describe("The current wind speed in the city"),
  rain: z.string().describe("The current rainfall in the city"),
  weatherCode: z.number().describe("The current weather code for the location"),
});

export const weatherTool = createTool({
  id: "get-weather-by-coordinates",
  description:
    "Get the current weather for a specific location based on latitude and longitude information",
  inputSchema: weatherToolInputSchema,
  outputSchema: weatherToolOutputSchema,
  execute: async (
    inputArgs: z.infer<typeof weatherToolInputSchema>,
    { abortSignal },
  ) => {
    const latitude = inputArgs.latitude;
    const longitude = inputArgs.longitude;

    console.log({ latitude, longitude });
    const fetchUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,weather_code`;
    console.log({ fetchUrl });

    const response = await fetch(fetchUrl, { signal: abortSignal });
    // Implement the logic to fetch weather data for the given city

    const data = (await response.json()) as {
      current_units: {
        temperature_2m: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
        rain: number;
        weather_code: number;
      };
      current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        rain: number;
        weather_code: number;
      };
    };
    console.log({ data });
    console.dir({
      temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
      humidity: `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`,
      windSpeed: `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,
      rain: `${data.current.rain} ${data.current_units.rain}`,
      weatherCode: data.current.weather_code,
    });
    return {
      temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
      humidity: `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`,
      windSpeed: `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,
      rain: `${data.current.rain} ${data.current_units.rain}`,
      weatherCode: data.current.weather_code,
    };
  },
});
