import { useState } from "react";
import { API_BASE_URL, API_KEY } from "../utils/constants";

// Define message type
interface Message {
  text: string;
  sender: "user" | "ai";
  created: number; // Timestamp for message
}

const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAIResponse = async (input: string) => {
    try {
      setLoading(true);

      // Add user message to state with timestamp
      setMessages((prev) => [
        ...prev,
        { text: input?.trim(), sender: "user", created: Date.now() / 1000 },
      ]);

      const response = await fetch(
        `${API_BASE_URL}/stream?prompt=${input?.trim()}`,
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        setLoading(false);
        return;
      }

      let accumulatedMessage: string = "";
      const createdTimestamp = Date.now() / 1000;

      // Add an initial empty AI message with timestamp
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "ai", created: createdTimestamp },
      ]);

      const processChunk = (chunk: string) => {
        if (chunk.startsWith("data:")) {
          try {
            const jsonData = JSON.parse(chunk.replace("data: ", ""));
            const newContent = jsonData?.choices?.[0]?.delta?.content;

            if (newContent) {
              accumulatedMessage += newContent;

              // Update only the last AI message
              setMessages((prev) => {
                const updatedMessages = [...prev];
                const lastIndex = updatedMessages.length - 1;

                if (updatedMessages[lastIndex]?.sender === "ai") {
                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    text: accumulatedMessage,
                  };
                }

                return updatedMessages;
              });
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });

        chunkText.split("\n").forEach(processChunk);
      }
    } catch (err) {
      console.error("Error while getting message:", err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, fetchAIResponse };
};

export default useChatStream;
