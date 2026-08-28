import { TIERS, maxProjectsLabel } from "../data/mock";
import { useApp } from "../context/AppContext";
import { formatFee } from "../lib/format";
import { IconLock } from "../components/Icons";
import type { TierId } from "../types";

function cardClass(id: TierId) {
  if (id === "zhiyu") return "member-card-blue";
  if (id === "zhiji") return "member-card-wine";
  return "member-card";
}

function ringClass(id: TierId) {
  if (id === "zhiyu") return "ring-4 ring-haze/70";
  if (id === "zhiji") return "ring-4 ring-wine/70";
  return "ring-4 ring-moss/70";
}

function accentText(id: TierId) {
  if (id === "zhiyu") return "text-haze";
  if (id === "zhiji") return "text-wine";
  return "text-moss";
}

export function SelectTier() {
  const { selectedTierId, selectTier, continueFromTier } = useApp();

  return (
    <div className="page-in pb-24">
      <p className="eyebrow">會員卡別</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold leading-tight text-moss">
        三張卡，三種深度的支持
      </h1>
      <p className="mt-4 max-w-2xl text-[18px] leading-8 text-ink-soft">
        差異在每年可支持的計畫數量與規格。核心是支持理念完成、拿到未來提貨券；附加禮遇會隨卡別累加，但不是加入的理由。
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const on = selectedTierId === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => selectTier(tier.id)}
              className={`rounded-[22px] p-2 text-left transition-transform duration-300 ${
                on ? ringClass(tier.id) : "hover:-translate-y-1"
              }`}
            >
              <div className={`${cardClass(tier.id)} relative overflow-hidden rounded-[20px] px-6 py-5 text-[#F6EFDD]`}>
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[15px] font-black tracking-[0.16em]">THE ONE</span>
                  {tier.invitationOnly ? (
                    <span className="flex items-center gap-1 rounded-full border border-gold/70 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-gold-soft">
                      <IconLock className="h-3.5 w-3.5" />
                      INVITE ONLY
                    </span>
                  ) : (
                    <span className="h-[28px] w-[40px] rounded-md bg-linear-to-br from-gold to-[#b9843a]" />
                  )}
                </div>
                <p className="mt-7 font-serif text-[36px] font-bold tracking-[0.08em]">{tier.name}</p>
                <div className="mt-5 flex items-end justify-between text-[13px] tracking-[0.08em] text-[#F6EFDD]/75">
                  <span>{formatFee(tier.annualFee)}／年</span>
                  <span>{maxProjectsLabel(tier.maxProjects)}</span>
                </div>
              </div>
              <div className="panel mt-3 px-6 py-5">
                <p className={`text-[16px] font-bold ${accentText(tier.id)}`}>{tier.tagline}</p>
                <p className="mt-3 text-[16px] leading-7 text-ink-soft">{tier.description}</p>
                <ul className="mt-4 space-y-1.5 text-[15px] text-ink-soft">
                  {tier.perks.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
                {tier.invitationOnly && (
                  <p className="mt-4 flex items-center gap-2 text-[14px] font-bold text-wine">
                    <IconLock className="h-4 w-4" />
                    By Invitation Only
                  </p>
                )}
                <p className={`mt-4 text-[15px] font-bold ${on ? accentText(tier.id) : "text-ink-soft"}`}>
                  {on ? "已選擇" : "點選此卡"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          disabled={!selectedTierId}
          onClick={continueFromTier}
          className="btn btn-moss"
        >
          下一步 · 選擇年度支持計畫
        </button>
      </div>
    </div>
  );
}
