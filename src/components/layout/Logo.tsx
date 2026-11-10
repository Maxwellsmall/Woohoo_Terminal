import logo from "../../assets/woohoo.jpeg";

type LogoProps = {
  size?: number;
  showText?: boolean;
};

export default function Logo({ size = 40, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="Woohoo logo"
        width={size}
        height={size}
        className="terminal-logo-image"
      />
      {showText && (
        <div className="terminal-logo-copy">
          <div className="terminal-logo-title">
            <h1>
              WOOHOO
            </h1>
          </div>
          <p>MARKET TERMINAL</p>
        </div>
      )}
    </div>
  );
}