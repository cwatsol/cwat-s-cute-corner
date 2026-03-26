import { useState } from "react";

const CONTRACT_ADDRESS = "HySY1ArycFvc3AZUy4VW6xcB9aciN4AnHcVE3Ve7pump";

const tokenData = [
  { label: "Total Supply", value: "1,000,000,000", emoji: "🪙" },
  { label: "Tax", value: "0%", emoji: "✅" },
  { label: "LP", value: "Burned 🔥", emoji: "🔥" },
  { label: "Mint Authority", value: "Revoked", emoji: "🔒" },
  { label: "Network", value: "Solana", emoji: "⚡" },
  { label: "Platform", value: "Pump.fun", emoji: "🚀" },
];

const Tokenomics = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tokenomics" className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-6xl text-center text-foreground mb-4">
          TOKENOMICS 📊
        </h2>
        <p className="font-body text-center text-muted-foreground mb-12 text-lg">
          Simple. Fair. No BS. 100% community-driven.
        </p>

        {/* Pie visual */}
        <div className="flex justify-center mb-12">
          <div className="relative w-56 h-56">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="24"
                strokeDasharray="565.48"
                strokeDashoffset="0"
                className="animate-pulse-pink"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="hsl(var(--primary) / 0.15)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl text-foreground">100%</span>
              <span className="font-body text-sm text-muted-foreground">Community</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {tokenData.map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-bubble p-5 text-center
                         hover:scale-105 transition-transform hover:border-primary/50"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="font-display text-lg text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contract address */}
        <div className="bg-card border border-border rounded-bubble p-5 text-center">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Contract Address 📋
          </p>
          <button
            onClick={handleCopy}
            className="font-body text-sm md:text-base text-foreground break-all
                       hover:text-primary transition-colors cursor-pointer"
          >
            {CONTRACT_ADDRESS}
          </button>
          <p className="font-body text-xs text-primary mt-2 h-4">
            {copied ? "Copied! ✅" : "Click to copy"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
