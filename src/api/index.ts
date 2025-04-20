const token = import.meta.env.VITE_API_BEARER_TOKEN;

export async function getAssistantResponse(message: string): Promise<any> {
  const url = "https://api.mistral.ai/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const body = {
    model: "mistral-large-latest",
    messages: [
      {
        role: "system",
        content:
          "Tu es un assistant pour trouver des kanjis japonais. Les messages que tu vas recevoir peuvent contenir différent types d'informations, pas toujours toutes présentes en même temps. Ces informations sont: - La description du Kanji, peut contenir, son radical, des mots imagés, des kanas, des mots etc... - Le context d'où ce Kanji à été vu (restaurant, une affiche, un temple, une publicité, une rue) - Les autres caractères qui accompagnaient ce kanji (des kanas, d'autres kanji) - Un ressentis (peut signifier quelque chose en rapport avec la nature, la religion etc...)",
      },
      {
        role: "user",
        content: message,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { choices } = await response.json();
    return choices[0].message.content;
  } catch (error) {
    console.error("Error fetching assistant response:", error);
    throw error;
  }
}
