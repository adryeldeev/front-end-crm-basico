import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

export function DashboardLayout() {
  return (
    <div className="flex">
      <Nav />
      <div className="ml-64 flex-1 min-h-screen bg-[#fefaf6] p-8">
        <Outlet />
      </div>
    </div>
  );
}
