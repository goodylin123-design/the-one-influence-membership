export type Screen =
  | "landing"
  | "selectTier"
  | "invite"
  | "selectProjects"
  | "voucherReveal"
  | "dashboard"
  | "verify";

export type VoucherStatus = "locked" | "in_progress" | "redeemable";

export type QualityTier = "標準" | "進階" | "最高";

export type TierId = "zhiyu" | "zhiyin" | "zhiji";

export interface MembershipTier {
  id: TierId;
  name: string;
  annualFee: number;
  maxProjects: number | null;
  projectTierAllowed: QualityTier[];
  invitationOnly: boolean;
  tagline: string;
  description: string;
  perks: string[];
}

export interface AddOnBenefit {
  id: string;
  name: string;
  description: string;
  minTierId: TierId;
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
  qualityTier: QualityTier;
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
  invitationVerified: boolean;
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
