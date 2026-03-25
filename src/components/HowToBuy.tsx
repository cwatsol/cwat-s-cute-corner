const steps = [
  {
    num: "1",
    emoji: "👻",
    title: "Get Phantom",
    desc: "Download Phantom Wallet from phantom.app and set it up.",
  },
  {
    num: "2",
    emoji: "💰",
    title: "Load SOL",
    desc: "Buy SOL on an exchange and send it to your Phantom wallet.",
  },
  {
    num: "3",
    emoji: "🐱",
    title: "Buy $CWAT",
    desc: "Head to Pump.fun, connect wallet, and swap SOL for $CWAT!",
  },
];

const HowToBuy = () => {
  return (
    <section id="buy" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-16">
          How to Buy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-card rounded-bubble border-2 border-border p-8 hover:scale-105 transition-transform hover:border-primary/50 shadow-md"
            >
              <div className="text-5xl mb-4">{step.emoji}</div>
              <div className="font-display text-2xl text-primary mb-2">
                Step {step.num}
              </div>
              <h3 className="font-body font-bold text-xl text-foreground mb-2">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
        <a
          href="https://pump.fun/coin/HySY1ArycFvc3AZUy4VW6xcB9aciN4AnHcVE3Ve7pump"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 px-10 py-4 bg-primary text-primary-foreground font-body font-bold text-lg rounded-bubble
                     hover:scale-105 active:scale-95 transition-transform"
        >
          Buy $CWAT Now 🚀
        </a>
      </div>
    </section>
  );
};

export default HowToBuy;
