import mascot from "@/assets/cwat-mascot.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <img
          src={mascot}
          alt="CWAT"
          width={250}
          height={250}
          loading="lazy"
          className="animate-float drop-shadow-xl"
        />
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Why CWAT?
          </h2>
          <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
            <p>
              Because every chain needs a cat. Not just any cat — 
              a <span className="text-primary font-bold">weirdly cute, big-eyed, pink-lipped</span> chaos agent 
              who stares into your soul and says <em>"buy the dip."</em> 💅
            </p>
            <p>
              CWAT isn't a roadmap. CWAT isn't a whitepaper. 
              CWAT is a <span className="text-primary font-bold">vibe</span>. 
              A community of degens who believe in the power of the stare. 👁️👁️
            </p>
            <p>
              No VC. No team tokens. Just pure, unfiltered, liquid cat energy on Solana. 
              Are you wet enough? 💦
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
