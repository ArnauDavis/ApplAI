type Theme = "light" | "dark";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function Header({
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="border-b border-line bg-paper text-ink transition-colors duration-200">
      <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Junction
            </h1>

            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
              Career Workspace
            </span>
          </div>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            Your job search, organized.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-moss" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Workspace active
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            title={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            className="flex h-9 w-9 items-center justify-center border border-line bg-whitewarm text-ink transition-colors duration-200 hover:border-copper hover:text-copper focus:outline-none focus:ring-2 focus:ring-copper/40"
          >
            {theme === "light" ? (
              <span
                aria-hidden="true"
                className="text-sm"
              >
                ☾
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="text-sm"
              >
                ☀
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
