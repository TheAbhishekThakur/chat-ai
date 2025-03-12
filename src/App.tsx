import React from "react";
import "./App.css";

// Importing core components
import Navbar from "./components/Navbar"; // Navigation bar at the top
import Chat from "./components/Chat"; // Main chat interface
import Theme from "./theme"; // Theme provider for light/dark mode
import Footer from "./components/Footer"; // Footer section

/**
 * App Component
 * This is the root component of the application. It includes:
 * - A Theme provider to manage dark/light mode.
 * - A Navbar for navigation and controls.
 * - The Chat component where user interactions with AI happen.
 * - A Footer for additional information or links.
 */

const App: React.FC = () => {
  return (
    <div>
      {/* Wrapping the entire app inside Theme provider for theme management */}
      <Theme>
        <Navbar />
        <Chat />
        <Footer />
      </Theme>
    </div>
  );
};

export default App;
