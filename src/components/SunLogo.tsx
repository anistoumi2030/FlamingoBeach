export function SunLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun body */}
      <circle cx="24" cy="24" r="10" fill="url(#sunGradient)" />
      {/* Sun rays */}
      <g stroke="url(#rayGradient)" strokeWidth="2.5" strokeLinecap="round">
        <line x1="24" y1="2" x2="24" y2="8" />
        <line x1="24" y1="40" x2="24" y2="46" />
        <line x1="2" y1="24" x2="8" y2="24" />
        <line x1="40" y1="24" x2="46" y2="24" />
        <line x1="8.93" y1="8.93" x2="13.17" y2="13.17" />
        <line x1="34.83" y1="34.83" x2="39.07" y2="39.07" />
        <line x1="8.93" y1="39.07" x2="13.17" y2="34.83" />
        <line x1="34.83" y1="13.17" x2="39.07" y2="8.93" />
        {/* Small waves at bottom */}
      </g>
      {/* Water waves */}
      <path
        d="M8 38 Q14 34, 20 38 Q26 42, 32 38 Q38 34, 44 38"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M4 42 Q10 38, 16 42 Q22 46, 28 42 Q34 38, 40 42 Q46 46, 48 44"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <defs>
        <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id="rayGradient" x1="24" y1="0" x2="24" y2="48">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}