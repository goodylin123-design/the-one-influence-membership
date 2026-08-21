import type {
  AnnualBenefit,
  ImpactStat,
  LodgingPlan,
  Member,
  MembershipTier,
  SelectProduct,
  SupportProject,
} from "../types";

export const DEMO_MEMBER: Member = {
  id: "m-demo",
  name: "示範會員",
  tierId: null,
  lockedVoucherIds: [],
};

export const IMPACT_STATS: ImpactStat = {
  jobsCreated: "50+",
  craftsPreserved: "3",
  performancesSaved: "10",
};

export const TIERS: MembershipTier[] = [
  {
    id: "zhiyin",
    name: "知音卡",
    annualFee: 30000,
    maxProjects: 1,
    maxSelectProducts: 1,
    nights: 2,
    tagline: "聽見尚未完成的聲音",
    description:
      "年費包含十項異數人年度支持內容。南園／永靖 2 晚、Select 選一項 85 折，並可另鎖一項未來提貨計畫。",
    perks: [
      "南園／永靖每年 2 晚",
      "The One Select 選一項，全年 85 折",
      "春節、中秋風土之禮",
      "每年 1 次旅行顧問",
      "可另鎖 1 項未來提貨券計畫",
    ],
  },
  {
    id: "zhiji",
    name: "知己卡",
    annualFee: 100000,
    maxProjects: 3,
    maxSelectProducts: 2,
    nights: 4,
    tagline: "與土地、工藝同行更遠",
    description:
      "十項支持內容全面升級：每年 4 晚、可攜伴專屬房價、Select 選兩項，並可同時鎖定最多三項未來提貨計畫。",
    perks: [
      "南園／永靖每年 4 晚，旺季優先保留",
      "本人及一位同行者享專屬房價",
      "The One Select 選兩項，全年 85 折",
      "春節、中秋、端午風土之禮",
      "每年 2 次旅行顧問，可延伸實地規劃",
      "可另鎖最多 3 項未來提貨券計畫",
    ],
  },
];

export const ANNUAL_BENEFITS: AnnualBenefit[] = [
  {
    id: "stay",
    name: "兩晚 The One",
    zhiyin: "每年 2 晚，南園／永靖任選，可連住或拆成兩次入住。",
    zhiji: "每年 4 晚，南園／永靖任選，可自由拆分入住次數，旺季享優先保留。",
    upgraded: true,
  },
  {
    id: "rate",
    name: "異數人住房價",
    zhiyin: "本人入住南園／永靖，享專屬房價。",
    zhiji: "本人及一位同行者入住南園／永靖，皆享專屬房價。",
    upgraded: true,
  },
  {
    id: "gifts",
    name: "會友｜歲時之禮",
    zhiyin: "春節、中秋各收到一份 The One 當年度編輯的風土之禮。",
    zhiji: "春節、中秋、端午各收到一份風土之禮，規格較知音卡提升。",
    upgraded: true,
  },
  {
    id: "preview",
    name: "只想先找你",
    zhiyin: "不定期收到異數人限定餐桌、音樂、人物、產地、新企劃 Preview 邀請，部分場次可攜友。",
    zhiji: "同樣的邀請，優先於知音卡收到通知，多數場次皆可攜一位友人同行。",
    upgraded: true,
  },
  {
    id: "select85",
    name: "選一 85 折",
    zhiyin: "The One Select 選一項商品，全年 85 折。",
    zhiji: "The One Select 選兩項商品，全年 85 折。",
    upgraded: true,
  },
  {
    id: "zhongshan",
    name: "中山會友",
    zhiyin: "The One 中山下午茶買一送一。",
    zhiji: "The One 中山下午茶買一送一，每年另有兩次可升級為套餐規格。",
    upgraded: true,
  },
  {
    id: "advisor",
    name: "異數風格旅行顧問",
    zhiyin: "每年 1 次一對一旅行顧問諮詢，從需求與旅行想像開始討論。",
    zhiji: "每年 2 次一對一旅行顧問諮詢，其中一次可延伸為實地行程規劃。",
    upgraded: true,
  },
  {
    id: "invite",
    name: "異數人的邀請",
    zhiyin: "年度部分場合可帶一位朋友，進入 The One 的世界。",
    zhiji: "年度多數場合皆可攜伴，且席次優先於知音卡保留。",
    upgraded: true,
  },
  {
    id: "number",
    name: "異數人編號與同行年份",
    zhiyin: "獲得 Founding 編號與 Since 年份，持續累積同行年資。",
    zhiji: "獲得同一序號系統中較前排的編號，同行滿 3／5／10 年時另有紀念安排。",
    upgraded: true,
  },
  {
    id: "remember",
    name: "The One 記得你",
    zhiyin: "生日、結婚紀念日等重要人生時刻，由 The One 主動準備心意，內容不對外揭露。",
    zhiji: "同樣的心意，規格與客製化程度較知音卡提高，內容不對外揭露。",
    upgraded: true,
  },
];

export const LODGING_PLANS: LodgingPlan[] = [
  { id: "zy-nanyuan", tierId: "zhiyin", label: "南園 2 晚", detail: "可連住或拆成兩次" },
  { id: "zy-yongjing", tierId: "zhiyin", label: "永靖 2 晚", detail: "可連住或拆成兩次" },
  { id: "zy-split", tierId: "zhiyin", label: "南園 1 晚 + 永靖 1 晚", detail: "兩處各住一次" },
  { id: "zj-nanyuan", tierId: "zhiji", label: "南園 4 晚", detail: "可自由拆分，旺季優先保留" },
  { id: "zj-yongjing", tierId: "zhiji", label: "永靖 4 晚", detail: "可自由拆分，旺季優先保留" },
  { id: "zj-split", tierId: "zhiji", label: "南園 2 晚 + 永靖 2 晚", detail: "兩處各兩晚，旺季優先保留" },
];

export const SELECT_PRODUCTS: SelectProduct[] = [
  { id: "tea", name: "南園嚴選茶葉", origin: "南園" },
  { id: "plum", name: "永靖青梅", origin: "永靖" },
  { id: "coffee", name: "靜屋咖啡豆", origin: "中山" },
  { id: "craft", name: "工藝器物", origin: "The One Select" },
  { id: "book", name: "年度出版／年刊", origin: "The One Select" },
  { id: "scent", name: "風土香氛", origin: "The One Select" },
];

export const PROJECTS: SupportProject[] = [
  {
    id: "concert",
    name: "專屬音樂會",
    category: "音樂",
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
    id: "tofu",
    name: "封藏豆腐乳",
    category: "飲食",
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
    id: "plumwine",
    name: "工藝重現與熟成梅酒",
    category: "工藝",
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
