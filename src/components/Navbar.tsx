import { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";
import RollButton from "./RollButton";
import useLondonTime from "../hooks/useLondonTime";

const NAV_LINKS = ["Projects", "Studio", "Journal", "Connect"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useLondonTime();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="relative z-20">
      <div className="relative z-[70] mx-auto max-w-[1440px] p-2 sm:p-3">
        <nav className="flex items-center justify-between rounded-full bg-white p-[5px]">
          <div className="flex items-center gap-6 pl-0 md:pr-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 sm:h-10 sm:w-10">
              <span className="text-[10px] font-bold tracking-tight text-white sm:text-[11px]">
                AX
              </span>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <span className="hidden text-[13px] text-gray-600 lg:block">
              Taking on projects for Q1 2026
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
              <Clock size={14} />
              {time} in London
            </span>
            <RollButton
              label="Book a strategy call"
              className="bg-gray-900 py-2 pl-5 pr-2 text-[13px] text-white"
              circleClassName="h-6 w-6"
              arrowClassName="text-gray-900"
              arrowSize={12}
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[13px] font-medium text-white md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <>
                <X size={16} />
                Close
              </>
            ) : (
              <>
                <Menu size={16} />
                Menu
              </>
            )}
          </button>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen
            ? "visible"
            : "pointer-events-none invisible [transition:visibility_0s_0.5s]"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen
              ? "translate-y-0"
              : "translate-y-[calc(100%+0.75rem)]"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[13px] text-gray-600">
            <Clock size={14} />
            {time} in London
          </span>
          <nav className="mt-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[28px] font-medium text-gray-900 sm:text-[32px]"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <RollButton
              label="Start a project"
              onClick={() => setMenuOpen(false)}
              className="bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
              circleClassName="h-7 w-7 sm:h-8 sm:w-8"
              arrowClassName="text-[#F26522]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
