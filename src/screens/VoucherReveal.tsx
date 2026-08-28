import { useApp } from "../context/AppContext";
import { VoucherTicket } from "../components/VoucherTicket";

export function VoucherReveal() {
  const { vouchers, getProject, go, selectedTier } = useApp();

  return (
    <div className="page-in pb-24">
      <p className="eyebrow text-center">保留 · Reserve</p>
      <h1 className="mt-3 text-center font-serif text-[40px] font-extrabold text-moss">未來提貨券已生成</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-[18px] leading-8 text-ink-soft">
        {selectedTier?.name}已鎖定年度支持計畫。這不是點數，而是對應具體內容的憑證：有編號、有鎖定日、有確定的兌現日。
      </p>

      <div className="mt-10 space-y-8">
        {vouchers.map((voucher, i) => (
          <div key={voucher.id} style={{ animationDelay: `${i * 0.22}s` }}>
            <VoucherTicket voucher={voucher} project={getProject(voucher.projectId)} reveal />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button type="button" onClick={() => go("dashboard")} className="btn btn-moss">
          進入會員儀表板
        </button>
      </div>
    </div>
  );
}
