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
        className="rounded-full object-cover"
      />
      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold text-violet-600">
              Woohoo <span className="text-slate-900">World</span>
            </h1>
            <span className="rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-600">
              DeFi
            </span>
          </div>
          <p className="text-xs text-slate-500">Multiverse Terminal</p>
        </div>
      )}
    </div>
  );
}