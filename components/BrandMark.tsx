/* Dony's Garage — faceted machined hex nut (mirrors the plugin's BrandMark) */
export default function BrandMark({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Dony's Garage"
      className={className}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
    >
      <polygon points="12,12 12,2 20.66,7" fill="#efe7db" />
      <polygon points="12,12 20.66,7 20.66,17" fill="#dcd3c6" />
      <polygon points="12,12 20.66,17 12,22" fill="#c2b9ac" />
      <polygon points="12,12 12,22 3.34,17" fill="#aaa093" />
      <polygon points="12,12 3.34,17 3.34,7" fill="#bdb4a7" />
      <polygon points="12,12 3.34,7 12,2" fill="#d6cdc0" />
      <polygon
        points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
        fill="none"
        stroke="#8a8175"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <polygon
        points="12,7.8 15.64,9.9 15.64,14.1 12,16.2 8.36,14.1 8.36,9.9"
        fill="#0c0c0c"
        stroke="#6a6258"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
