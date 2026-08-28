import { formatDate, statusLabel } from "../lib/format";
import type { FutureVoucher, SupportProject, VoucherStatus } from "../types";

function Stamp({ compact, animate }: { compact?: boolean; animate?: boolean }) {
  const size = compact ? "h-[76px] w-[76px] text-[11px]" : "h-28 w-28 text-[13px]";
  return (
    <div
      className={`${size} ${animate ? "stamp-in" : ""} flex rotate-[-8deg] items-center justify-center rounded-full border-[3px] border-rust text-rust`}
    >
      <div className="flex h-[88%] w-[88%] flex-col items-center justify-center rounded-full border border-rust/50 text-center font-bold leading-tight tracking-[0.12em]">
        <span className="font-serif">THE ONE</span>
        <span>已鎖定</span>
      </div>
    </div>
  );
}

export function VoucherTicket({
  voucher,
  project,
  reveal,
  compact,
}: {
  voucher: FutureVoucher;
  project: SupportProject;
  reveal?: boolean;
  compact?: boolean;
}) {
  const status: VoucherStatus = voucher.status;
  return (
    <article
      className={`${compact ? "ticket-mini" : "ticket"} relative overflow-hidden rounded-[20px] border border-gold/40 px-7 py-6 md:px-9 md:py-7 ${reveal ? "ticket-in" : ""}`}
    >
      <div className="relative flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
        <div className="flex items-center justify-between gap-4 md:w-14 md:flex-col md:justify-between">
          <p className="font-serif text-[14px] font-black tracking-[0.22em] text-gold md:[writing-mode:vertical-rl]">
            FUTURE VOUCHER
          </p>
          <p className="text-[14px] font-bold text-ink-soft">{project.category}</p>
        </div>

        <div className="hidden w-px bg-gold/50 md:block" />

        <div className="flex-1">
          <p className="text-[15px] font-bold tracking-[0.12em] text-rust">
            未來提貨券 · {project.qualityTier} · 非點數
          </p>
          <h3 className="mt-2 font-serif text-[30px] font-bold text-moss">{project.name}</h3>
          <p className="mt-3 max-w-md text-[17px] leading-8 text-ink-soft">{project.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-5 text-[16px] md:grid-cols-3">
            <div>
              <p className="text-[14px] font-bold text-rust">編號</p>
              <p className="mt-1 font-serif text-[18px] font-bold">{voucher.voucherNumber}</p>
            </div>
            <div>
              <p className="text-[14px] font-bold text-rust">鎖定日期</p>
              <p className="mt-1">{formatDate(voucher.lockedDate)}</p>
            </div>
            <div>
              <p className="text-[14px] font-bold text-rust">預計兌現</p>
              <p className="mt-1">{formatDate(voucher.maturityDate)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-3">
          <Stamp compact={compact} animate={reveal} />
          <p className="text-[15px] font-bold text-rust">{statusLabel(status)}</p>
        </div>
      </div>
    </article>
  );
}
