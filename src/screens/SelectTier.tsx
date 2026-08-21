import { TIERS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { formatFee } from "../lib/format";

export function SelectTier() {
  const { selectedTierId, selectTier, go } = useApp();

  return (
    <div className="page-in pb-24">
      <p className="eyebrow">會員卡別</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold leading-tight text-moss">
        兩張卡，兩種深度的同行
      </h1>
      <p className="mt-4 max-w-2xl text-[18px] leading-8 text-ink-soft">
        知音卡與知己卡都包含專屬年度支持計畫，以及對應的未來提貨券。知己卡規格更高，可同時鎖定更多計畫。
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {TIERS.map((tier) => {
          const on = selectedTierId === tier.id;
          const isZhiji = tier.id === "zhiji";
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => selectTier(tier.id)}
              className={`rounded-[22px] p-2 text-left transition-transform duration-300 ${
                on ? (isZhiji ? "ring-4 ring-wine/70" : "ring-4 ring-moss/70") : "hover:-translate-y-1"
              }`}
            >
              <div className={`${isZhiji ? "member-card-wine" : "member-card"} relative overflow-hidden rounded-[20px] px-7 py-6 text-[#F6EFDD]`}>
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[17px] font-black tracking-[0.16em]">THE ONE</span>
                  <span className="h-[30px] w-[42px] rounded-md bg-linear-to-br from-gold to-[#b9843a]" />
                </div>
                <p className="mt-8 font-serif text-[44px] font-bold tracking-[0.08em]">{tier.name}</p>
                <div className="mt-6 flex items-end justify-between text-[14px] tracking-[0.12em] text-[#F6EFDD]/75">
                  <span>{formatFee(tier.annualFee)}／年</span>
                  <span>每年 {tier.nights} 晚 · 可另鎖 {tier.maxProjects} 項未來計畫</span>
                </div>
              </div>
              <div className="panel mt-4 px-7 py-6">
                <p className={`text-[16px] font-bold ${isZhiji ? "text-wine" : "text-moss"}`}>{tier.tagline}</p>
                <p className="mt-3 text-[17px] leading-8 text-ink-soft">{tier.description}</p>
                <ul className="mt-5 space-y-2 text-[16px] text-ink-soft">
                  {tier.perks.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
                <p className={`mt-5 text-[15px] font-bold ${on ? (isZhiji ? "text-wine" : "text-moss") : "text-ink-soft"}`}>
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
          onClick={() => go("selectProjects")}
          className="btn btn-moss"
        >
          下一步 · 選擇年度支持計畫
        </button>
      </div>
    </div>
  );
}
