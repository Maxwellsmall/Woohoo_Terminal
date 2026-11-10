import { useRef, useState } from "react";
import { Menu, Settings2, X } from "lucide-react";

// import TokenSelector from "../ui/TokenSelector";
import MarketTicker from "../ui/MarketTicker";
import WalletButton from "../ui/WalletButton";
import Logo from "./Logo";

export default function TerminalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
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
        if (event.key === "Escape") closeMobileMenu();
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
            <button
              type="button"
              aria-label="Settings unavailable"
              title="Settings are not implemented yet"
              className="terminal-icon-button"
              disabled
            >
              <Settings2 size={16} />
              <span>Settings</span>
            </button>

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