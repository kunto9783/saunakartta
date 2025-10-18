
import { GoogleGenAI, Type } from "@google/genai";
import { Sauna } from '../types';

export const fetchInitialSaunas = async (): Promise<Sauna[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Provide a list of 15 diverse and interesting public saunas from around the world. Include a mix of traditional and modern saunas from different countries.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            saunas: {
              type: Type.ARRAY,
              description: "A list of public saunas.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "The name of the sauna."
                  },
                  description: {
                    type: Type.STRING,
                    description: "A brief, one-sentence description."
                  },
                  type: {
                    type: Type.STRING,
                    enum: ['wood', 'electric', 'smoke', 'other'],
                    description: "The type of sauna."
                  },
                  latitude: {
                    type: Type.NUMBER,
                    description: "The geographical latitude."
                  },
                  longitude: {
                    type: Type.NUMBER,
                    description: "The geographical longitude."
                  }
                },
                required: ["name", "description", "type", "latitude", "longitude"]
              }
            }
          },
          required: ["saunas"]
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed && parsed.saunas) {
      return parsed.saunas.map((sauna: Omit<Sauna, 'id'>) => ({
        ...sauna,
        id: `${sauna.latitude}-${sauna.longitude}-${Math.random()}`
      }));
    } else {
      console.error("Unexpected JSON structure:", parsed);
      return [];
    }

  } catch (error) {
    console.error("Error fetching saunas from Gemini API:", error);
    // Return some fallback data in case of an error
    return [
        { id: '1', name: 'Löyly Helsinki', description: 'A stunning architectural public sauna on the Helsinki waterfront.', type: 'wood', latitude: 60.151, longitude: 24.921 },
        { id: '2', name: 'Sandun-sauna, Kyoto', description: 'A traditional Japanese bathhouse experience with a sauna.', type: 'electric', latitude: 35.003, longitude: 135.772 },
        { id: '3', name: 'AIRE Ancient Baths, New York', description: 'A luxurious underground bathhouse with various temperature pools and a sauna.', type: 'other', latitude: 40.718, longitude: -74.004 },
    ];
  }
};
