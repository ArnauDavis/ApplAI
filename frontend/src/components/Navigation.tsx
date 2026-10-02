import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Profile", path: "/profile" },
  { label: "Jobs", path: "/jobs" },
  { label: "Applications", path: "/applications" },
];

function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const isActiveRoute = (path: string) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop navigation */}
      <nav className="hidden w-64 shrink-0 border-r border-line bg-parchment transition-colors duration-200 lg:block">
        <div className="sticky top-0 flex min-h-[calc(100vh-80px)] flex-col p-4">
          <div className="mb-8 px-3 pt-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Workspace
            </p>
          </div>

          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center justify-between border-l-2 px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? "border-copper bg-paper font-medium text-ink"
                        : "border-transparent text-muted hover:border-line hover:bg-paper/60 hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>

                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-copper"
                          : "bg-transparent group-hover:bg-line"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-line px-3 pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Career Workspace
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted">
              Organize the work behind your next opportunity.
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="lg:hidden">
        <div className="border-b border-line bg-parchment px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen((isOpen) => !isOpen)
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Navigation
              </p>

              <p className="mt-1 text-sm font-medium text-ink">
                {
                  navigationItems.find(
                    (item) =>
                      isActiveRoute(item.path)
                  )?.label
                }
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center border border-line bg-whitewarm text-lg text-ink"
            >
              {isMobileMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-[1px]"
            />

            <nav
              id="mobile-navigation"
              className="absolute left-0 right-0 z-50 border-b border-line bg-paper shadow-lg"
            >
              <ul className="p-3">
                {navigationItems.map((item) => {
                  const isActive =
                    isActiveRoute(item.path);

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between border-l-2 px-4 py-3 text-sm transition-colors duration-150 ${
                          isActive
                            ? "border-copper bg-parchment font-medium text-ink"
                            : "border-transparent text-muted hover:bg-parchment hover:text-ink"
                        }`}
                      >
                        <span>{item.label}</span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
}

export default Navigation;
