import React, { useState } from "react";
import {
  ClipboardList,
  LayoutDashboardIcon,
  Package,
  PanelLeft,
  ImageIcon,
  Tag,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboardIcon, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ClipboardList, label: "Orders", path: "/admin/orders" },
    { icon: Tag, label: "Coupons", path: "/admin/coupons" },
    { icon: ImageIcon, label: "Gallery", path: "/admin/gallery" },
    { icon: FaBlog, label: "Blogs", path: "/admin/blog" },
  ];

  const MenuLinks = ({ close }) => (
    <div className="mt-6 space-y-2">
      {menuItems.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;

        return (
          <Link
            key={path}
            to={path}
            onClick={close}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition
              ${
                active
                  ? "bg-[#FFECE8] text-[#C2410C]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-xl p-2"
      >
        <PanelLeft size={22} />
      </button>

      {/* 📱 Mobile Overlay Sidebar */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden
          ${open ? "visible" : "invisible"}
        `}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`
            absolute inset-0 bg-black/40 transition-opacity
            ${open ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Sidebar */}
        <aside
          className={`
            absolute left-0 top-0 h-full w-72 bg-white
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                navigate("/admin/dashboard");
                setOpen(false);
              }}
            >
              <PanelLeft size={26} />
              <span className="text-lg font-bold">Admin Panel</span>
            </div>
            <X
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Menu */}
          <div className="px-4">
            <MenuLinks close={() => setOpen(false)} />
          </div>
        </aside>
      </div>

      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col bg-white border-r px-6 py-6">
        <div
          className="mb-8 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <PanelLeft size={28} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>

        <MenuLinks />
      </aside>
    </>
  );
}
