import { ADD_ON_BENEFITS, TIER_RANK, TIERS } from "../data/mock";
import type { TierId } from "../types";
import { benefitIcon, IconCheckOff, IconCheckOn } from "./Icons";

function included(minTierId: TierId, col: TierId) {
  return TIER_RANK[col] >= TIER_RANK[minTierId];
}

function headerClass(id: TierId) {
  if (id === "zhiyu") return "member-card-blue";
  if (id === "zhiji") return "member-card-wine";
  return "member-card";
}

function badgeClass(id: TierId) {
  if (id === "zhiyu") return "bg-haze";
  if (id === "zhiji") return "bg-wine";
  return "bg-moss";
}

function colBg(id: TierId) {
  if (id === "zhiyu") return "bg-[#e4edf1]";
  if (id === "zhiji") return "bg-[#f4e4e4]";
  return "bg-[#e4eee6]";
}

function markClass(id: TierId) {
  if (id === "zhiyu") return "text-haze";
  if (id === "zhiji") return "text-wine";
  return "text-moss";
}

export function AddOnTable() {
  return (
    <div className="overflow-hidden rounded-[20px] shadow-[0_18px_40px_-22px_rgba(36,66,47,0.45)]">
      <div className="grid min-w-[720px] grid-cols-[1fr_108px_108px_108px]">
        <div className="bg-moss px-6 py-4 font-serif text-[18px] font-bold text-cream">禮遇</div>
        {TIERS.map((t) => (
          <div
            key={t.id}
            className={`${headerClass(t.id)} px-2 py-4 text-center font-serif text-[16px] font-bold tracking-[0.08em] text-[#F6EFDD]`}
          >
            {t.name}
          </div>
        ))}

        {ADD_ON_BENEFITS.map((item, i) => {
          const Icon = benefitIcon(item.id);
          const stripe = i % 2 === 0 ? "bg-white" : "bg-cream";
          return (
            <div key={item.id} className="contents">
              <div className={`${stripe} flex items-center gap-4 border-t border-line/60 px-5 py-4`}>
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream ${badgeClass(item.minTierId)}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-serif text-[18px] font-bold text-ink">{item.name}</p>
                  <p className="mt-0.5 text-[15px] leading-6 text-ink-soft">{item.description}</p>
                </div>
              </div>
              {TIERS.map((t) => {
                const on = included(item.minTierId, t.id);
                return (
                  <div
                    key={t.id}
                    className={`${colBg(t.id)} flex items-center justify-center border-t border-white/70`}
                  >
                    {on ? (
                      <span className={markClass(t.id)} title={`${t.name}享有`} aria-label={`${t.name}享有`}>
                        <IconCheckOn className="h-9 w-9" />
                      </span>
                    ) : (
                      <span title={`${t.name}未含`} aria-label={`${t.name}未含`}>
                        <IconCheckOff className="h-9 w-9" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
