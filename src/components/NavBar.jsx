import React, { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
    { label: "Contribute", href: "#contribute" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container-page flex items-center justify-between h-20 relative">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/logo.jfif"
              alt="Igala Wikimedia Community logo"
              className="h-12 w-auto rounded-xl object-contain shadow-lg ring-2 ring-indigo-100"
            />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Igala Wikimedia
            </span>
            <span className="text-xs font-medium text-slate-500">Community</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}

          {/* Desktop buttons */}
          <a
            href="#projects"
            className="ml-2 hidden sm:inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            Our Projects
          </a>

          <a
            href="#contribute"
            className="ml-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:scale-105"
          >
            Join Us
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden z-50 relative">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={28} />
        </div>

        {/* Mobile Drawer & Overlay */}
        {isOpen && (
          <div>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed top-0 left-0 z-50 h-full w-64 transform bg-white/95 backdrop-blur-lg shadow-xl transition-transform duration-300"
              style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
            >
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <img src="/logo.jfif" alt="logo" className="h-10 w-auto rounded-lg" />
                  <span className="font-bold text-lg">Igala Wikimedia</span>
                </div>
              </div>

              <nav className="flex flex-col gap-4 p-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-semibold text-slate-700 hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Join Us button in drawer */}
                <a
                  href="#contribute"
                  className="mt-6 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-center text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </a>

                {/* Optional: Projects button in drawer */}
                <a
                  href="#projects"
                  className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-slate-700 font-semibold shadow-sm hover:shadow-md transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Our Projects
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;