import type {
  AddOnBenefit,
  ImpactStat,
  Member,
  MembershipTier,
  QualityTier,
  SupportProject,
  TierId,
} from "../types";

export const DEMO_MEMBER: Member = {
  id: "m-demo",
  name: "示範會員",
  tierId: null,
  invitationVerified: false,
  lockedVoucherIds: [],
};

export const IMPACT_STATS: ImpactStat = {
  jobsCreated: "50+",
  craftsPreserved: "3",
  performancesSaved: "10",
};

export const TIER_RANK: Record<TierId, number> = {
  zhiyu: 1,
  zhiyin: 2,
  zhiji: 3,
};

export const TIERS: MembershipTier[] = [
  {
    id: "zhiyu",
    name: "知遇卡",
    annualFee: 30000,
    maxProjects: 1,
    projectTierAllowed: ["標準"],
    invitationOnly: false,
    tagline: "開放支持，從一項標準計畫開始",
    description:
      "每年支持 1 項標準規格的年度計畫，對應一張未來提貨券。核心是看見理念完成；附加禮遇是加碼。",
    perks: ["每年 1 項標準規格計畫", "未來提貨券依一般順位保留", "開放支持"],
  },
  {
    id: "zhiyin",
    name: "知音卡",
    annualFee: 100000,
    maxProjects: 2,
    projectTierAllowed: ["標準", "進階"],
    invitationOnly: false,
    tagline: "標準與進階，最多兩項同行",
    description:
      "每年最多支持 2 項，可含進階規格計畫。附加禮遇在知遇卡之上累加旅宿與重要時刻。",
    perks: ["每年最多 2 項（標準＋進階）", "未來提貨券依一般順位保留", "開放支持"],
  },
  {
    id: "zhiji",
    name: "知己卡",
    annualFee: 500000,
    maxProjects: null,
    projectTierAllowed: ["標準", "進階", "最高"],
    invitationOnly: true,
    tagline: "最高規格，優先保留稀有名額",
    description:
      "不限項目數，可支持最高規格計畫，提貨券優先於前兩卡保留。採邀請制，不開放公開申請。",
    perks: ["不限計畫項數與規格", "稀有名額優先保留", "By Invitation Only"],
  },
];

export const ADD_ON_BENEFITS: AddOnBenefit[] = [
  { id: "school", name: "生活塾", description: "課程買一送一", minTierId: "zhiyu" },
  { id: "dinner", name: "好好吃頓飯", description: "四人同行，本人免費", minTierId: "zhiyu" },
  { id: "select", name: "異數臻選", description: "指定選品 85 折", minTierId: "zhiyu" },
  { id: "newyear", name: "唯一禮", description: "每年過年一份當年度編輯之禮", minTierId: "zhiyu" },
  { id: "stay", name: "旅宿體驗", description: "南園／永靖三天兩夜一次", minTierId: "zhiyin" },
  { id: "rate", name: "異數人住房", description: "本人入住專屬價（至多三間）", minTierId: "zhiyin" },
  { id: "moment", name: "重要時刻", description: "生日、紀念日等重要月份，依房況升等", minTierId: "zhiyin" },
  { id: "special", name: "特別企劃", description: "優先報名", minTierId: "zhiyin" },
  { id: "preview", name: "旅行優先鑑賞", description: "新行程提前 7 日優先公開", minTierId: "zhiji" },
  { id: "priority", name: "優先選擇", description: "船遊選房／音樂選位／特殊房型優先", minTierId: "zhiji" },
  { id: "boat", name: "船遊款待", description: "指定船遊每房贈登船前一晚岸上住宿", minTierId: "zhiji" },
  { id: "consult", name: "旅行相談", description: "每年 2 次面對面旅行規劃", minTierId: "zhiji" },
  { id: "line", name: "專屬服務", description: "專屬 Line OA／原則 24 小時內回覆", minTierId: "zhiji" },
];

export const PROJECTS: SupportProject[] = [
  {
    id: "tofu",
    name: "封藏豆腐乳",
    category: "飲食",
    qualityTier: "標準",
    maturityYears: 2,
    maturityLabel: "2 年後兌現",
    description: "當季豆腐乳入陶甕封藏。第一年靜置，第二年開甕。憑券領取限量一罈。",
    longDescription:
      "以傳統陶甕封藏當季豆腐乳。第一年只做一件事：等待。第二年開甕，會員憑未來提貨券領取編號罈。這不是預購現貨，而是把兩年的時間，寫進一罈食物裡。",
    stages: [
      {
        stageIndex: 0,
        label: "封藏中 · 第 1 年",
        description: "陶甕已封口入庫。此刻什麼都不取，只讓時間、鹽與菌在甕中工作。",
      },
      {
        stageIndex: 1,
        label: "封藏中 · 第 2 年，即將開甕",
        description: "熟成進入最後一程。開甕日已排入年度行事，限量份額仍為你保留，不必與市場競逐。",
      },
      {
        stageIndex: 2,
        label: "可兌現 · 開甕",
        description: "甕已開。請於核對後的領取日憑券兌換編號罈，這是兩年前那筆承諾的實體。",
      },
    ],
  },
  {
    id: "concert",
    name: "專屬音樂會",
    category: "音樂",
    qualityTier: "進階",
    maturityYears: 1,
    maturityLabel: "1 年後兌現",
    description: "一場不對外售票的室內樂夜。曲目依當年駐地藝術家而定，一年後兌現席位。",
    longDescription:
      "The One 為會員籌辦一場不進入公開售票的室內樂夜。場地、曲目與藝術家依當年駐地計畫而定——你此刻鎖定的，是一年後那一個被保留的席位，而不是一張可以轉賣的票。",
    stages: [
      {
        stageIndex: 0,
        label: "曲目籌備中",
        description: "駐地藝術家確認中。場地與曲目方向已列入年度計畫，席位已為你保留。",
      },
      {
        stageIndex: 1,
        label: "可兌現 · 音樂會即將舉行",
        description: "排練完成，場次與席次已核對。請於兌現日憑券入場，這張券對應的是你的位置。",
      },
    ],
  },
  {
    id: "plumwine",
    name: "工藝重現與熟成梅酒",
    category: "工藝",
    qualityTier: "最高",
    maturityYears: 5,
    maturityLabel: "5 年後兌現",
    description: "與工藝師重現近乎失傳的浸漬技法。青梅入酒，熟成五年後裝瓶。",
    longDescription:
      "與工藝師一起重現幾乎要消失的浸漬技法。青梅入酒之後，需要五年才能成為一瓶。你鎖定的是編號瓶，以及這門手藝被再做一次的機會——五年後兌現，不是遙遠的口頭承諾。",
    stages: [
      {
        stageIndex: 0,
        label: "工藝重現啟動",
        description: "技法、器皿與當年青梅產季已對齊。釀造尚未開始，名額已先為你留下。",
      },
      {
        stageIndex: 1,
        label: "釀造與陳年中",
        description: "青梅已入酒。往後數年只做熟成，瓶身編號與你的提貨券相對應。",
      },
      {
        stageIndex: 2,
        label: "熟成過半",
        description: "時間過半。風味仍在變化，裝瓶日尚未到，但計畫如期發生中。",
      },
      {
        stageIndex: 3,
        label: "即將裝瓶",
        description: "熟成進入尾聲。裝瓶與編號核對作業已排程，五年之約接近兌現。",
      },
      {
        stageIndex: 4,
        label: "可兌現 · 裝瓶完成",
        description: "瓶已裝、號已核。請憑券兌換你的編號瓶——這是五年前選定的那件事，真的發生了。",
      },
    ],
  },
];

export function addOnsForTier(tierId: TierId): AddOnBenefit[] {
  const rank = TIER_RANK[tierId];
  return ADD_ON_BENEFITS.filter((b) => TIER_RANK[b.minTierId] <= rank);
}

export function projectAllowed(allowed: QualityTier[], qualityTier: QualityTier): boolean {
  return allowed.includes(qualityTier);
}

export function maxProjectsLabel(max: number | null): string {
  return max == null ? "不限項數" : `最多 ${max} 項`;
}

export function neededTierFor(qualityTier: QualityTier): string {
  if (qualityTier === "最高") return "知己卡";
  if (qualityTier === "進階") return "知音卡或知己卡";
  return "知遇卡起";
}
