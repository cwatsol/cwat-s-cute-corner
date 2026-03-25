const FloatingSocials = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://x.com/i/communities/2036592539118031032"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center
                   hover:scale-110 active:scale-95 transition-transform shadow-lg hover:bg-primary hover:text-primary-foreground"
        aria-label="Follow on X"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingSocials;
