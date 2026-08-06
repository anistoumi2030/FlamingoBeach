export function FlamingoLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/flamingo-logo.png"
      alt="Flamingo Coucou Beach Logo"
      className={className}
    />
  );
}