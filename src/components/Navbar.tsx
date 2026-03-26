import { useEffect, useState } from "react";

const CONTRACT = "HySY1ArycFvc3AZUy4VW6xcB9aciN4AnHcVE3Ve7pump";
const API_URL = `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`;

type PriceData = {
  priceUsd: string;
  priceChange24h: number;
  marketCap: number;
};

const Navbar = () => {
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const pair = data.pairs?.[0];
        if (pair) {
          setPrice({
            priceUsd: parseFloat(pair.priceUsd).toFixed(8),
            priceChange24h: pair.priceChange?.h24 ?? 0,
            marketCap: pair.marketCap ?? 0,
          });
        }
      } catch (e) {
        console.error("Price fetch error:", e);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const isUp = (price?.priceChange24h ?? 0) >= 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5">
        <a href="#" className="font-display text-2xl text-foreground hover:text-primary transition-colors">
          $CWAT
        </a>

        {/* Live Price Ticker */}
        <div className="flex items-center gap-3 font-body text-sm">
          {price ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">$</span>
                <span className="font-bold text-foreground tabular-nums">
                  {price.priceUsd}
                </span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isUp
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(price.priceChange24h).toFixed(2)}%
              </span>
              {price.marketCap > 0 && (
                <span className="hidden md:inline text-xs text-muted-foreground">
                  MC: ${price.marketCap >= 1000 ? `${(price.marketCap / 1000).toFixed(1)}K` : price.marketCap}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-xs animate-pulse">Loading...</span>
          )}
        </div>

        <a
          href="https://pump.fun/coin/HySY1ArycFvc3AZUy4VW6xcB9aciN4AnHcVE3Ve7pump"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-1.5 bg-foreground text-background font-body font-bold text-sm rounded-bubble
                     hover:scale-105 active:scale-95 transition-transform"
        >
          Buy 🚀
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
