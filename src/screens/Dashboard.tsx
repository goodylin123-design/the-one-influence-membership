import { ANNUAL_BENEFITS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { VoucherTicket } from "../components/VoucherTicket";
import { distanceLabel, formatDate, formatFee, statusLabel } from "../lib/format";

export function Dashboard() {
  const {
    member,
    selectedTier,
    vouchers,
    getProject,
    simulatedNow,
    advanceTime,
    openVerify,
    lodgingLabel,
    productLabels,
    arrangeByTheOne,
  } = useApp();
  const isZhiji = selectedTier?.id === "zhiji";

  return (
    <div className="page-in pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className={`${isZhiji ? "member-card-wine" : "member-card"} relative h-[210px] w-full max-w-[360px] overflow-hidden rounded-[22px] px-7 py-6 text-[#F6EFDD]`}>
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
        <h2 className="font-serif text-[28px] font-extrabold text-moss">本年度支持內容</h2>
        <p className="text-[15px] text-ink-soft">{arrangeByTheOne ? "交給 The One 安排" : "自行組合"}</p>
      </div>
      <div className="panel mb-4 grid gap-4 px-6 py-5 md:grid-cols-2">
        <p className="text-[16px]">
          <span className="font-bold text-moss">住宿　</span>
          {lodgingLabel}
        </p>
        <p className="text-[16px]">
          <span className="font-bold text-moss">Select 85 折　</span>
          {productLabels.join("、")}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {ANNUAL_BENEFITS.map((item) => (
          <div key={item.id} className="panel px-5 py-4">
            <p className="font-serif text-[18px] font-bold">{item.name}</p>
            <p className="mt-2 text-[15px] leading-7 text-ink-soft">
              {isZhiji ? item.zhiji : item.zhiyin}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 mb-5 flex items-end justify-between">
        <h2 className="font-serif text-[28px] font-extrabold text-moss">已鎖定的未來提貨券</h2>
        <p className="text-[15px] text-ink-soft">共 {vouchers.length} 張</p>
      </div>
      {vouchers.length === 0 ? (
        <div className="panel px-6 py-8 text-[16px] text-ink-soft">
          本次未另鎖未來提貨券。十項年度支持已保留。若要體驗「核對」與時間發酵，可重新體驗並加選封藏豆腐乳或熟成梅酒。
        </div>
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
    </div>
  );
}
