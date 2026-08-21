import { TopBar } from "./components/TopBar";
import { useApp } from "./context/AppContext";
import { Dashboard } from "./screens/Dashboard";
import { Landing } from "./screens/Landing";
import { SelectProjects } from "./screens/SelectProjects";
import { SelectTier } from "./screens/SelectTier";
import { Verify } from "./screens/Verify";
import { VoucherReveal } from "./screens/VoucherReveal";

export default function App() {
  const { screen } = useApp();

  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <div className="mx-auto max-w-[1080px] px-6 md:px-8">
        <TopBar />
        {screen === "landing" && <Landing />}
        {screen === "selectTier" && <SelectTier />}
        {screen === "selectProjects" && <SelectProjects />}
        {screen === "voucherReveal" && <VoucherReveal />}
        {screen === "dashboard" && <Dashboard />}
        {screen === "verify" && <Verify />}
      </div>
    </div>
  );
}
