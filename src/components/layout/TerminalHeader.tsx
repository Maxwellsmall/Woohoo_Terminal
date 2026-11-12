import { useEffect, useRef, useState } from "react";
import { Menu, Settings2, X } from "lucide-react";

import { usePreferences, type ThemePreference } from "../../app/PreferencesContext";
import MarketTicker from "../ui/MarketTicker";
import TokenSelector from "../ui/TokenSelector";
import WalletButton from "../ui/WalletButton";
import Logo from "./Logo";

export default function TerminalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const settingsToggleRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme, showVolume, setShowVolume, storageError } =
    usePreferences();

  useEffect(() => {
    if (!mobileMenuOpen && !settingsOpen) return;

    const closePopoversOnPageScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        (target.closest(".terminal-header-nav") ||
          target.closest(".terminal-settings-popover"))
      ) {
        return;
      }

      setMobileMenuOpen(false);
      setSettingsOpen(false);
    };

    document.addEventListener("scroll", closePopoversOnPageScroll, {
      capture: true,
      passive: true,
    });

    return () =>
      document.removeEventListener("scroll", closePopoversOnPageScroll, true);
  }, [mobileMenuOpen, settingsOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    if (window.matchMedia("(max-width: 767px)").matches) {
      menuToggleRef.current?.focus();
    }
  };

  return (
    <header
      className="terminal-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (settingsOpen) {
            setSettingsOpen(false);
            settingsToggleRef.current?.focus();
          } else if (mobileMenuOpen) {
            closeMobileMenu();
          }
        }
      }}
    >
      <div className="terminal-header-main">
        <div className="terminal-brand">
          <Logo />
        </div>

        <button
          ref={menuToggleRef}
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="terminal-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <nav
          id="terminal-navigation"
          aria-label="Market navigation"
          className={`terminal-header-nav ${mobileMenuOpen ? "is-open" : ""}`}
        >
          <div className="terminal-header-actions">
            <div className="terminal-settings">
              <button
                ref={settingsToggleRef}
                type="button"
                aria-label="Settings"
                aria-controls="terminal-settings-panel"
                aria-expanded={settingsOpen}
                className="terminal-icon-button"
                onClick={() => setSettingsOpen((open) => !open)}
              >
                <Settings2 size={16} />
                <span>Settings</span>
              </button>
              {settingsOpen && (
                <section
                  id="terminal-settings-panel"
                  className="terminal-settings-popover"
                  aria-label="Display and market settings"
                >
                  <div className="settings-popover-heading">
                    <h2>Settings</h2>
                    <button
                      type="button"
                      aria-label="Close settings"
                      onClick={() => setSettingsOpen(false)}
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="settings-section">
                    <span className="settings-label" id="theme-options-label">
                      Theme
                    </span>
                    <div
                      className="settings-theme-options"
                      role="group"
                      aria-labelledby="theme-options-label"
                    >
                      {(["dark", "light", "system"] as const).map(
                        (themeOption: ThemePreference) => (
                          <button
                            key={themeOption}
                            type="button"
                            aria-pressed={theme === themeOption}
                            onClick={() => setTheme(themeOption)}
                          >
                            {themeOption[0].toUpperCase() +
                              themeOption.slice(1)}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <label className="settings-volume-option">
                    <span>Show chart volume</span>
                    <input
                      type="checkbox"
                      checked={showVolume}
                      onChange={(event) => setShowVolume(event.target.checked)}
                    />
                  </label>

                  <div className="settings-section">
                    <TokenSelector />
                    <p className="settings-data-sources">
                      Pair metrics: DexScreener · Historical candles:
                      GeckoTerminal
                    </p>
                  </div>

                  {storageError && (
                    <p className="settings-storage-error" role="status">
                      {storageError}
                    </p>
                  )}
                </section>
              )}
            </div>
            <WalletButton />
          </div>
        </nav>

        <div className="terminal-header-ticker">
          <MarketTicker />
        </div>
      </div>
    </header>
  );
}