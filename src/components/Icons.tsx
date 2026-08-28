import type { ReactNode } from "react";

export function IconConcert({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M18 34a5 5 0 1 1-2-4V14l16-4v18" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconJar({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M16 14h16M18 14v-3h12v3M18 14c0 4-2 6-2 12v10c0 3 3 5 8 5s8-2 8-5V26c0-6-2-8-2-12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 26h12" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
    </svg>
  );
}

export function IconBottle({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M21 8h6v6l3 5v21c0 2-2 4-6 4s-6-2-6-4V19l3-5V8Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M21 8h6M20 22h8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconLock({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function projectIcon(category: string) {
  if (category === "音樂") return IconConcert;
  if (category === "飲食") return IconJar;
  return IconBottle;
}

export function IconCheckOn({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="currentColor" />
      <path
        d="M9.5 16.2 14 20.5 22.5 11"
        stroke="#FBF5E7"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheckOff({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#FBF5E7" stroke="#D9A441" strokeWidth="1.8" />
    </svg>
  );
}

function Glyph({
  className = "h-7 w-7",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

function IconSchool({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 14 16 8l11 6" />
      <path d="M8 16v8l8 4 8-4v-8" />
      <path d="M16 20v8" />
    </Glyph>
  );
}
function IconMeal({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M8 26h16" />
      <path d="M10 26c0-8 2-14 6-14s6 6 6 14" />
      <path d="M16 6v6" />
    </Glyph>
  );
}
function IconSelect({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M9 12h14v14H9V12Z" />
      <path d="M12 12 16 7l4 5" />
    </Glyph>
  );
}
function IconGift({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M7 15h18v12H7V15Z" />
      <path d="M7 15c0-3 2.5-5 4.5-5S16 13 16 15c0-3 2.5-5 4.5-5S25 12 25 15" />
      <path d="M16 15v12" />
    </Glyph>
  );
}
function IconStay({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M6 26V15l10-7 10 7v11" />
      <path d="M13 26v-8h6v8" />
    </Glyph>
  );
}
function IconKey({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="14" r="5" />
      <path d="M16.5 16.5 26 26M22 22l4 0M22 26h4" />
    </Glyph>
  );
}
function IconMoment({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <rect x="7" y="9" width="18" height="16" rx="2" />
      <path d="M7 14h18M12 6v4M20 6v4" />
    </Glyph>
  );
}
function IconSpark({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M16 6v6M16 20v6M6 16h6M20 16h6" />
      <path d="M10 10l4 4M18 18l4 4M10 22l4-4M18 14l4-4" />
    </Glyph>
  );
}
function IconPreview({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 16s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="16" cy="16" r="3" />
    </Glyph>
  );
}
function IconSeat({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M8 8h16v6H8V8Z" />
      <path d="M10 14v10M22 14v10" />
      <path d="M8 24h16" />
    </Glyph>
  );
}
function IconBoat({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 20h22s-3 5-11 5-11-5-11-5Z" />
      <path d="M9 20 12 12h8l3 8" />
      <path d="M16 12V8" />
    </Glyph>
  );
}
function IconTalk({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M7 8h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6l-5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" />
    </Glyph>
  );
}
function IconLine({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <rect x="6" y="7" width="20" height="18" rx="4" />
      <path d="M11 14h10M11 19h7" />
    </Glyph>
  );
}

const BENEFIT_ICONS: Record<string, typeof IconSchool> = {
  school: IconSchool,
  dinner: IconMeal,
  select: IconSelect,
  newyear: IconGift,
  stay: IconStay,
  rate: IconKey,
  moment: IconMoment,
  special: IconSpark,
  preview: IconPreview,
  priority: IconSeat,
  boat: IconBoat,
  consult: IconTalk,
  line: IconLine,
};

export function benefitIcon(id: string) {
  return BENEFIT_ICONS[id] ?? IconSpark;
}
