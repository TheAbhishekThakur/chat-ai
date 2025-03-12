import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  InputBase,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { format } from "date-fns";
import useChatStream from "../../hooks/useChatStream";

import ChatContainer from "./style";
import { useThemeStore } from "../../store/themeStore";

/**
 * Chat Component
 *
 * This component provides the chat interface where users can interact with an AI.
 * It includes message display, AI response streaming, input handling, and a loading indicator.
 */

const Chat: React.FC = () => {
  // Get the current theme from Zustand store
  const { theme } = useThemeStore();

  // State to store user input
  const [input, setInput] = useState<string>("");

  // Reference to automatically scroll to the latest message
  const msgEnd = useRef<HTMLDivElement>(null);

  // Fetch AI response and manage chat messages
  const { messages, loading, fetchAIResponse } = useChatStream();

  // Auto-scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    msgEnd.current?.scrollIntoView();
  }, [messages]);

  return (
    <ChatContainer data-theme={theme}>
      {messages && messages.length === 0 && (
        <Box className="heading-text">
          <Typography>Ask me anything and explore the power of AI!</Typography>
        </Box>
      )}
      <Box className="main-section">
        {/* Show Message List */}
        {messages.map((msg, index: number) => (
          <Box key={index}>
            <Box className="top-section">
              <Box>
                <AccountCircleRoundedIcon />
              </Box>
              <Typography className="user-text">
                {msg.sender === "user" ? "You" : "AI"}
              </Typography>
              <Typography>
                {msg?.created &&
                  format(
                    new Date(msg?.created * 1000 + 5.5 * 60 * 60 * 1000),
                    "HH:mm a"
                  )}
              </Typography>
            </Box>
            <Box>
              <pre className="msg-text">{msg.text}</pre>
            </Box>
          </Box>
        ))}

        <Box ref={msgEnd}></Box>

        {/* Typing AI Loader */}
        {loading && (
          <Box className="loader-container">
            <CircularProgress size={20} color="secondary" />
            <Typography variant="body2">AI is typing...</Typography>
          </Box>
        )}
      </Box>

      {/* Input Section */}
      <Box className="input-container">
        <Paper
          sx={{
            width: "100%",
            padding: "8px",
            borderRadius: "25px",
            boxShadow:
              theme === "light"
                ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                : "0px 4px 15px rgba(255, 255, 255, 0.1)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, width: { xs: "85%", sm: "90%", md: "95%" } }}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchAIResponse(input);
                setInput("");
              }
            }}
          />
          <IconButton
            color={theme === "light" ? "secondary" : "primary"}
            onClick={() => {
              fetchAIResponse(input);
              setInput("");
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </ChatContainer>
  );
};

export default Chat;
