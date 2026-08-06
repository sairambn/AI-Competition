import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { SchedulePage } from "./pages/SchedulePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
}
