import { ADD_ON_BENEFITS, addOnsForTier, TIER_RANK, TIERS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { VoucherTicket } from "../components/VoucherTicket";
import { benefitIcon } from "../components/Icons";
import { distanceLabel, formatDate, formatFee, statusLabel } from "../lib/format";
import type { TierId } from "../types";

function cardShell(id: string | undefined) {
  if (id === "zhiyu") return "member-card-blue";
  if (id === "zhiji") return "member-card-wine";
  return "member-card";
}

const GROUP_TITLE: Record<TierId, string> = {
  zhiyu: "知遇卡內容",
  zhiyin: "知音卡新增",
  zhiji: "知己卡專屬",
};

export function Dashboard() {
  const { member, selectedTier, vouchers, getProject, simulatedNow, advanceTime, openVerify } = useApp();
  const tierId = (selectedTier?.id ?? "zhiyu") as TierId;
  const addons = addOnsForTier(tierId);

  return (
    <div className="page-in pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className={`${cardShell(selectedTier?.id)} relative h-[210px] w-full max-w-[360px] overflow-hidden rounded-[22px] px-7 py-6 text-[#F6EFDD]`}>
          <div className="flex items-start justify-between">
            <span className="font-serif text-[17px] font-black tracking-[0.16em]">THE ONE</span>
            <span className="h-[30px] w-[42px] rounded-md bg-linear-to-br from-gold to-[#b9843a]" />
          </div>
          <p className="mt-7 font-serif text-[40px] font-bold tracking-[0.08em]">{selectedTier?.name}</p>
          <div className="mt-6 flex justify-between text-[14px] tracking-[0.12em] text-[#F6EFDD]/75">
            <span>{member.name}</span>
            <span>{formatFee(selectedTier?.annualFee ?? 0)}／年</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="eyebrow">會員儀表板</p>
          <h1 className="mt-3 font-serif text-[36px] font-extrabold leading-snug text-moss">
            你好，{selectedTier?.name}會員
            <br />
            支持的事，正在發生
          </h1>
          <p className="mt-3 text-[17px] text-ink-soft">
            Demo 模擬日期：{formatDate(simulatedNow)} · 正式產品不會有「模擬時間前進」
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={advanceTime} className="btn btn-rust" disabled={vouchers.length === 0}>
              模擬時間前進一年
            </button>
            {vouchers.length > 0 && (
              <button type="button" onClick={() => openVerify()} className="btn btn-ghost">
                查看核對畫面
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 mb-5 flex items-end justify-between">
        <div>
          <p className="text-[14px] font-bold tracking-[0.16em] text-moss">核心｜支持理念完成</p>
          <h2 className="mt-1 font-serif text-[28px] font-extrabold text-moss">已鎖定的未來提貨券</h2>
        </div>
        <p className="text-[15px] text-ink-soft">共 {vouchers.length} 張</p>
      </div>
      {vouchers.length === 0 ? (
        <div className="panel px-6 py-8 text-[16px] text-ink-soft">尚未鎖定年度支持計畫。</div>
      ) : (
        <div className="space-y-8">
          {vouchers.map((voucher) => {
            const project = getProject(voucher.projectId);
            const stage = project.stages[voucher.currentStageIndex];
            const progress =
              ((voucher.currentStageIndex + (voucher.status === "redeemable" ? 1 : 0)) / project.stages.length) * 100;
            return (
              <div key={voucher.id}>
                <VoucherTicket voucher={voucher} project={project} compact />
                <div className="panel mt-3 px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[16px]">
                    <p>
                      狀態：<span className="font-bold text-rust">{statusLabel(voucher.status)}</span>
                      <span className="mx-2 text-gold">·</span>
                      {stage.label}
                    </p>
                    <p className="font-medium text-ink-soft">{distanceLabel(simulatedNow, voucher.maturityDate)}</p>
                  </div>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-cream-deep">
                    <div
                      className="h-full rounded-full bg-rust transition-[width] duration-1000"
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-[16px] leading-7 text-ink-soft">{stage.description}</p>
                  <button
                    type="button"
                    onClick={() => openVerify(voucher.id)}
                    className="mt-3 text-[16px] font-bold text-moss"
                  >
                    核對此計畫進度 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-16 border-t border-dashed border-gold/40 pt-10">
        <p className="eyebrow">附加禮遇</p>
        <h2 className="mt-2 font-serif text-[32px] font-extrabold text-moss">依卡別逐級累加</h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-8 text-ink-soft">
          知音含知遇全部，知己再往上加。色帶對應來源卡別。
        </p>
        <div className="mt-8 space-y-6">
          {TIERS.filter((t) => TIER_RANK[t.id] <= TIER_RANK[tierId]).map((group) => {
            const items = addons.filter((b) => b.minTierId === group.id);
            if (items.length === 0) return null;
            const badge =
              group.id === "zhiyu" ? "bg-haze" : group.id === "zhiji" ? "bg-wine" : "bg-moss";
            return (
              <div key={group.id} className="overflow-hidden rounded-[20px] shadow-[0_18px_40px_-22px_rgba(36,66,47,0.45)]">
                <div className={`${cardShell(group.id)} px-6 py-4`}>
                  <p className="font-serif text-[20px] font-bold tracking-[0.08em] text-[#F6EFDD]">
                    {GROUP_TITLE[group.id]}
                  </p>
                </div>
                <div className="grid gap-px bg-line md:grid-cols-2">
                  {items.map((item) => {
                    const Icon = benefitIcon(item.id);
                    return (
                      <div key={item.id} className="flex items-start gap-4 bg-white px-6 py-5">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream ${badge}`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="font-serif text-[20px] font-bold text-ink">{item.name}</p>
                          <p className="mt-1 text-[16px] leading-7 text-ink-soft">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {tierId !== "zhiji" && (
          <p className="mt-6 text-[16px] text-ink">
            更高卡別還有 {ADD_ON_BENEFITS.filter((b) => TIER_RANK[b.minTierId] > TIER_RANK[tierId]).length} 項禮遇。
          </p>
        )}
      </div>
    </div>
  );
}
