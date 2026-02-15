import { LegalPage } from "./components/pages/LegalPage"
import { PrivacyPage } from "./components/pages/PrivacyPage.jsx"
import { Routes, Route } from "react-router-dom"
import Home3D from "./Home3D.jsx"

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home3D  />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
  )
}

export default App
