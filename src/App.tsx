import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SubmitPage } from "./pages/SubmitPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { OrganizerPage } from "./pages/OrganizerPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/organizer" element={<OrganizerPage />} />
      </Route>
    </Routes>
  );
}
