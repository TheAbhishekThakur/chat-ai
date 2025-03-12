import { useState } from "react";
import { API_BASE_URL, API_KEY } from "../utils/constants";

// Define message structure
interface Message {
  text: string;
  sender: "user" | "ai";
  created: number; // Timestamp for message
}

// Custom hook for handling chat streaming
const useChatStream = () => {
  // State to store chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to track loading status (indicates AI response processing)
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch AI response via streaming API
  const fetchAIResponse = async (input: string) => {
    try {
      setLoading(true);

      // Add user's input message to the chat history with a timestamp
      setMessages((prev) => [
        ...prev,
        { text: input?.trim(), sender: "user", created: Date.now() / 1000 },
      ]);

      // Make a GET request to the streaming API
      const response = await fetch(
        `${API_BASE_URL}/stream?prompt=${input?.trim()}`,
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      // Get a readable stream from the API response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      // If the reader is unavailable, exit the function
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

      // Function to process each incoming data chunk
      const processChunk = (chunk: string) => {
        if (chunk.startsWith("data:")) {
          try {
            const jsonData = JSON.parse(chunk.replace("data: ", ""));
            const newContent = jsonData?.choices?.[0]?.delta?.content;

            // If AI sends new content, append it to accumulated message
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

      // Continuously read and process response chunks
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

  // Return the chat state and function to fetch AI responses
  return { messages, loading, fetchAIResponse };
};

export default useChatStream;
