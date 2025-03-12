# 1. Project Overview

This project is an AI-powered chatbot, built using React.js, Material UI, and Zustand for state management. It allows users to interact with AI in real-time, utilizing streaming responses for a smooth user experience.

# 2. Tech Stack

- Frontend: React.js, Material UI
- State Management: Zustand
- API Communication: Fetch API with streaming responses
- Theming: Dark & Light mode using Zustand
- Styling: Material UI

# 3. Approach & Architecture

✔ State Management with Zustand

- Used Zustand to store theme preference persistently in localStorage.
- Theme updates dynamically across the app.

✔ Real-time Chat with Streaming API

- AI responses are streamed progressively instead of waiting for the full message.
- Used useChatStream.ts custom hook to manage messages & API calls efficiently.
- Implemented a function to process & update the last AI message dynamically.

✔ Theming System

- Light & Dark mode switching using Zustand.
- Material UI ThemeProvider ensures UI updates dynamically.


# Potential Enhancements

✔ `Persist Conversation History`:

Store past messages in a database to provide users with a seamless experience by displaying their previous conversations upon returning.

✔ `Functional Header Icons`: 

Some icons in the header currently lack functionality. We can enhance the user experience by implementing relevant features for these icons based on requirements.

✔ `Smooth UI Animations`: 

Adding subtle animations can improve the interface's visual appeal, making interactions feel more dynamic and engaging.

✔ `Pixel-Perfect Design`:
 
While the UI may have minor deviations from the provided image, having access to a Figma design file would enable us to achieve an exact match.

✔ `Secure API Handling`:

Implementing environment variables (.env files) ensures that sensitive information, such as API URLs and keys, remains secure and is not exposed in the codebase.