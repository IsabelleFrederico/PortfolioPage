import React from "react"
import { Route, Routes } from "react-router-dom"
// import About from "../sections/About"
// import Contact from "../sections/Contact"
// import Skills from "../sections/Skills"
import LegalPage from "../pages/LegalPage"
import PrivacyPage from "../pages/PrivacyPage"
import ProjectDetailPage from "../pages/ProjectDetailPage"
import Home3D from "../../Home3D"


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home3D />} />

            <Route path="/legal" element={<LegalPage />} />

            <Route path="/privacy" element={<PrivacyPage />} />

            <Route path="/projects/:id" element={<ProjectDetailPage />} />

        </Routes>
    )
}

export default Router