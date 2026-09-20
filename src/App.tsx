import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { WalletProvider } from "./context/WalletContext";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <LanguageProvider>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
