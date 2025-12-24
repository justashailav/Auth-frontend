import React from "react";
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Admin Panel
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-1.5">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-40"
          />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-gray-100">
          <Bell size={18} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
            A
          </div>
          <span className="hidden md:block text-sm font-medium">
            Admin
          </span>
        </div>

      </div>
    </header>
  );
}
