import { useApp } from "../context/AppContext";
import { VoucherTicket } from "../components/VoucherTicket";

export function VoucherReveal() {
  const { vouchers, getProject, go, selectedTier, lodgingLabel, productLabels, arrangeByTheOne } = useApp();

  return (
    <div className="page-in pb-24">
      <p className="eyebrow text-center">保留 · Reserve</p>
      <h1 className="mt-3 text-center font-serif text-[40px] font-extrabold text-moss">
        {vouchers.length > 0 ? "未來提貨券已生成" : "年度支持已鎖定"}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-[18px] leading-8 text-ink-soft">
        {selectedTier?.name}的十項支持內容已為你保留。
        {arrangeByTheOne ? "住宿與 Select 交由 The One 安排。" : ""}
        {vouchers.length > 0
          ? "以下是另鎖的未來提貨券：有編號、有鎖定日、有確定的兌現日——不是點數。"
          : "本次未另鎖未來提貨券。"}
      </p>

      <div className="panel mx-auto mt-8 max-w-xl px-6 py-5 text-[16px] leading-8">
        <p>住宿：{lodgingLabel}</p>
        <p>Select 85 折：{productLabels.join("、")}</p>
      </div>

      {vouchers.length > 0 && (
        <div className="mt-10 space-y-8">
          {vouchers.map((voucher, i) => (
            <div key={voucher.id} style={{ animationDelay: `${i * 0.22}s` }}>
              <VoucherTicket voucher={voucher} project={getProject(voucher.projectId)} reveal />
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <button type="button" onClick={() => go("dashboard")} className="btn btn-moss">
          進入會員儀表板
        </button>
      </div>
    </div>
  );
}
