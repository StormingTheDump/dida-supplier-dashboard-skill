import { AppShell } from "@/app/AppShell";
import { AppStateProvider } from "@/app/app-state";

export function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  );
}

