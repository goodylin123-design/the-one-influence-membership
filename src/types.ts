export type Screen =
  | "landing"
  | "selectTier"
  | "selectProjects"
  | "voucherReveal"
  | "dashboard"
  | "verify";

export type VoucherStatus = "locked" | "in_progress" | "redeemable";

export interface MembershipTier {
  id: string;
  name: string;
  annualFee: number;
  maxProjects: number;
  maxSelectProducts: number;
  nights: number;
  tagline: string;
  description: string;
  perks: string[];
}

export interface AnnualBenefit {
  id: string;
  name: string;
  zhiyin: string;
  zhiji: string;
  upgraded: boolean;
}

export interface LodgingPlan {
  id: string;
  tierId: string;
  label: string;
  detail: string;
}

export interface SelectProduct {
  id: string;
  name: string;
  origin: string;
}

export interface ProjectStage {
  stageIndex: number;
  label: string;
  description: string;
}

export interface SupportProject {
  id: string;
  name: string;
  category: "音樂" | "飲食" | "工藝";
  maturityYears: number;
  maturityLabel: string;
  description: string;
  longDescription: string;
  stages: ProjectStage[];
}

export interface FutureVoucher {
  id: string;
  voucherNumber: string;
  projectId: string;
  memberId: string;
  lockedDate: string;
  maturityDate: string;
  currentStageIndex: number;
  status: VoucherStatus;
}

export interface Member {
  id: string;
  name: string;
  tierId: string | null;
  lockedVoucherIds: string[];
}

export interface ImpactStat {
  jobsCreated: string;
  craftsPreserved: string;
  performancesSaved: string;
}

export interface VerifySnapshot {
  voucherId: string;
  projectId: string;
  fromStageIndex: number;
  toStageIndex: number;
  fromStatus: VoucherStatus;
  toStatus: VoucherStatus;
}
