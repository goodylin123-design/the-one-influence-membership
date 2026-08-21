import { useApp } from "../context/AppContext";
import { formatDate, statusLabel } from "../lib/format";

export function Verify() {
  const { verifySnapshot, getProject, vouchers, go, simulatedNow } = useApp();
  const voucher = vouchers.find((v) => v.id === verifySnapshot?.voucherId) ?? vouchers[0];

  if (!voucher) {
    return <div className="page-in py-20 text-[18px] text-ink-soft">尚無已鎖定的計畫。</div>;
  }

  const project = getProject(voucher.projectId);
  const fromIndex = verifySnapshot?.fromStageIndex ?? Math.max(0, voucher.currentStageIndex - 1);
  const toIndex = verifySnapshot?.toStageIndex ?? voucher.currentStageIndex;
  const fromStage = project.stages[fromIndex];
  const toStage = project.stages[toIndex];
  const changed = fromIndex !== toIndex || verifySnapshot?.fromStatus !== verifySnapshot?.toStatus;

  return (
    <div className="page-in pb-24">
      <p className="eyebrow">核對 · Verify</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold leading-tight text-moss">
        每年一次，把進度攤開來看
      </h1>
      <p className="mt-4 max-w-2xl text-[18px] leading-8 text-ink-soft">
        模擬日期 {formatDate(simulatedNow)}。正式產品裡，這會是 The One 給會員的年度回報：當初支持的事，有沒有如期發生。
      </p>

      <h2 className="mt-10 font-serif text-[28px] font-extrabold text-moss">{project.name}</h2>
      <p className="mt-2 text-[16px] font-medium text-ink-soft">
        {project.maturityLabel} · 券號 {voucher.voucherNumber}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="panel border-t-4 border-t-ink-soft px-7 py-8">
          <p className="text-[15px] font-bold tracking-[0.14em] text-ink-soft">此前</p>
          <p className="mt-3 font-serif text-[26px] font-bold">{fromStage.label}</p>
          <p className="mt-2 text-[15px] font-bold text-gold">{statusLabel(verifySnapshot?.fromStatus ?? "locked")}</p>
          <p className="mt-5 text-[17px] leading-8 text-ink-soft">{fromStage.description}</p>
        </div>
        <div className="overflow-hidden rounded-[20px] bg-moss px-7 py-8 text-cream shadow-[0_22px_40px_-18px_rgba(36,66,47,0.55)]">
          <p className="text-[15px] font-bold tracking-[0.14em] text-gold-soft">此刻</p>
          <p className="mt-3 font-serif text-[26px] font-bold">{toStage.label}</p>
          <p className="mt-2 text-[15px] font-bold text-gold">{statusLabel(verifySnapshot?.toStatus ?? voucher.status)}</p>
          <p className="mt-5 text-[17px] leading-8 text-cream/80">{toStage.description}</p>
        </div>
      </div>

      <div className="panel mt-8 px-7 py-6 text-[17px] leading-8 text-ink-soft">
        {changed
          ? `年度核對信函（模擬）：關於你支持的「${project.name}」，進度已由「${fromStage.label}」更新為「${toStage.label}」。計畫如期進行，限量名額仍為你保留。`
          : `年度核對信函（模擬）：關於你支持的「${project.name}」，目前仍處於「${toStage.label}」。尚未跨入下一階段，我們仍依約保留你的名額。`}
      </div>

      <button type="button" onClick={() => go("dashboard")} className="btn btn-ghost mt-10">
        返回儀表板
      </button>
    </div>
  );
}
