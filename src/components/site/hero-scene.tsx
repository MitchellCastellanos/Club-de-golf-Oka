export function HeroScene() {
  return (
    <svg
      className="mt-14 h-[340px] w-full"
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14261C" />
          <stop offset="1" stopColor="#1E3B2C" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C6E8F" />
          <stop offset="1" stopColor="#2A4E64" />
        </linearGradient>
      </defs>
      <rect width="1200" height="340" fill="url(#sky)" />
      <circle cx="1015" cy="90" r="46" fill="#C7A768" opacity="0.85" />
      <g opacity="0.5" fill="#2E4E3A">
        <polygon points="60,260 100,120 140,260" />
        <polygon points="130,260 175,90 220,260" />
        <polygon points="205,260 245,150 285,260" />
        <polygon points="950,260 995,110 1040,260" />
        <polygon points="1030,260 1075,140 1120,260" />
        <polygon points="1100,260 1140,170 1180,260" />
      </g>
      <g opacity="0.75" fill="#22422F">
        <polygon points="0,260 55,95 110,260" />
        <polygon points="85,260 140,60 195,260" />
        <polygon points="880,260 935,80 990,260" />
        <polygon points="970,260 1030,50 1090,260" />
        <polygon points="1070,260 1130,110 1190,260" />
      </g>
      <rect y="258" width="1200" height="82" fill="url(#water)" />
      <path
        d="M0,258 Q150,248 300,258 T600,258 T900,258 T1200,258 V262 H0 Z"
        fill="#8FB9CC"
        opacity="0.3"
      />
    </svg>
  );
}
