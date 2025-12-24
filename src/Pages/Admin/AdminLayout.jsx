import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[#FFF3EF]">
      
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-30">
          <Header />
        </div>
        <main className="flex-1 p-4 md:p-6">
          <div
            className="
              bg-white
              rounded-3xl
              shadow-[0_20px_40px_rgba(0,0,0,0.08)]
              border border-black/5
              min-h-[85vh]
              p-4 md:p-6
            "
          >
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
