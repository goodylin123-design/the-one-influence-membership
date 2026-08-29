import type { FutureVoucher, SupportProject, VoucherStatus } from "../types";

export function formatFee(n: number): string {
  return `NT$${n.toLocaleString("zh-TW")}`;
}

export function formatWan(n: number): string {
  return `NT$${(n / 10000).toLocaleString("zh-TW")}萬`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function addYears(iso: string, years: number): string {
  const d = new Date(iso);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString();
}

export function yearsElapsed(fromIso: string, toIso: string): number {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  let years = to.getFullYear() - from.getFullYear();
  const beforeAnniversary =
    to.getMonth() < from.getMonth() ||
    (to.getMonth() === from.getMonth() && to.getDate() < from.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

export function daysUntil(fromIso: string, toIso: string): number {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  return Math.max(0, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export function distanceLabel(fromIso: string, toIso: string): string {
  const days = daysUntil(fromIso, toIso);
  if (days <= 0) return "已可兌現";
  const years = Math.floor(days / 365);
  const remainDays = days % 365;
  if (years <= 0) return `尚餘 ${remainDays} 日`;
  if (remainDays === 0) return `尚餘 ${years} 年`;
  return `尚餘 ${years} 年 ${remainDays} 日`;
}

export function deriveVoucherState(
  voucher: Pick<FutureVoucher, "lockedDate" | "maturityDate">,
  project: SupportProject,
  simulatedNow: string,
): { currentStageIndex: number; status: VoucherStatus } {
  const elapsed = yearsElapsed(voucher.lockedDate, simulatedNow);
  const toMaturity = yearsElapsed(voucher.lockedDate, voucher.maturityDate);
  const lastIndex = project.stages.length - 1;
  const currentStageIndex = Math.min(elapsed, lastIndex);

  let status: VoucherStatus = "locked";
  if (elapsed >= toMaturity) status = "redeemable";
  else if (elapsed > 0) status = "in_progress";

  return { currentStageIndex, status };
}

export function statusLabel(status: VoucherStatus): string {
  if (status === "locked") return "鎖定中";
  if (status === "in_progress") return "進行中";
  return "可兌現";
}

export function makeVoucherNumber(projectId: string, index: number, lockedDate: string): string {
  const year = new Date(lockedDate).getFullYear();
  const serial = String(840 + index + projectId.length).padStart(4, "0");
  return `TO-FV-${year}-${serial}`;
}

export function projectById(id: string, list: SupportProject[]): SupportProject {
  const found = list.find((p) => p.id === id);
  if (!found) throw new Error(`找不到計畫：${id}`);
  return found;
}
