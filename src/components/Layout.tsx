import { Outlet } from "react-router";
import { Header } from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-7xl">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <footer className="border-t border-zinc-900 px-6 py-8 text-center text-xs text-zinc-600">
        Create from scratch
      </footer>
    </div>
  );
}
