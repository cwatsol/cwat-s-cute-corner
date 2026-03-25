import mascot from "@/assets/cwat-mascot.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating pink blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-primary/15 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 flex flex-col items-center gap-6 animate-bounce-in">
        <img
          src={mascot}
          alt="CWAT Cat"
          width={300}
          height={300}
          className="animate-wiggle drop-shadow-2xl"
        />
        <h1 className="font-display text-7xl md:text-9xl tracking-tight text-foreground">
          $CWAT
        </h1>
        <p className="font-body text-lg md:text-2xl text-muted-foreground max-w-md text-center">
          The wettest cat on the Solana chain. 💦🐱
        </p>
        <a
          href="https://pump.fun/coin/HySY1ArycFvc3AZUy4VW6xcB9aciN4AnHcVE3Ve7pump"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-10 py-4 bg-foreground text-background font-body font-bold text-lg rounded-bubble
                     hover:scale-105 active:scale-95 transition-transform animate-pulse-pink"
        >
          Buy on Pump.fun 🚀
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
