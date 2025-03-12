import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Theme from "./theme";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div>
      <Theme>
        <Navbar />
        <Chat />
        <Footer />
      </Theme>
    </div>
  );
};

export default App;
