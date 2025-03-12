import { styled } from "@mui/system";
import { Box } from "@mui/material";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1000px",
  margin: "auto",
  maxHeight: "85vh",

  "& .main-section": {
    flexGrow: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  "& .msg-box": {
    marginBottom: "18px",
  },

  "& .top-section": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: "6px",
    marginBottom: "8px",
  },

  "& .user-text": {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  "& .msg-text": {
    padding: "10px",
    backgroundColor: theme.palette.mode === "light" ? "#e9edf1" : "#000",
    color: theme.palette.mode === "light" ? "#000" : "#fff",
    borderRadius: "10px",
    alignSelf: "flex-start",
    maxWidth: "100%",
    textWrap: "wrap",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
        : "0px 4px 15px rgba(255, 255, 255, 0.1)",
  },

  "& .loader-container": {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  "& .input-container": {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },

  "& .heading-text": {
    textAlign: "center",
    marginTop: "60px",
  },
}));

export default ChatContainer;
