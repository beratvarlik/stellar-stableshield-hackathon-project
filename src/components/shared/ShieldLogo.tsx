interface ShieldLogoProps {
  className?: string;
  size?: number;
}

export function ShieldLogo({ className, size = 32 }: ShieldLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="StableShield"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="20" y1="15" x2="100" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E6B4F" />
          <stop offset="100%" stopColor="#0F3D2E" />
        </linearGradient>
        <linearGradient id="coreGrad" x1="45" y1="35" x2="75" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F4EC" />
          <stop offset="100%" stopColor="#D4EDE2" />
        </linearGradient>
      </defs>
      <path
        d="M60 14L22 30V58C22 81.5 38.2 101.4 60 106C81.8 101.4 98 81.5 98 58V30L60 14Z"
        fill="url(#shieldGrad)"
        stroke="#1E6B4F"
        strokeWidth="2"
      />
      <path
        d="M60 22L29 35.5V58C29 77.2 42.3 93.6 60 97.5C77.7 93.6 91 77.2 91 58V35.5L60 22Z"
        fill="none"
        stroke="#F5F4EC"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <path d="M60 38V82" stroke="url(#coreGrad)" strokeLinecap="round" strokeWidth="3.5" />
      <path
        d="M46 50C46 45 52 42 60 42C68 42 74 45 74 50C74 56 68 59 60 59C52 59 46 62 46 68C46 73 52 76 60 76C68 76 74 73 74 68"
        stroke="url(#coreGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      <circle cx="60" cy="28" r="3" fill="#D4EDE2" />
    </svg>
  );
}
