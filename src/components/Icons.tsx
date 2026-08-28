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
