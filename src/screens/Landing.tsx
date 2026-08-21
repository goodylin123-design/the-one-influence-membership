import { IMPACT_STATS } from "../data/mock";
import { useApp } from "../context/AppContext";

const ACTS = [
  { en: "Choose", zh: "選擇", body: "在平台挑選年度支持計畫。可以自選、組合，或交給 The One 安排。", band: "from-rust-bright to-rust" },
  { en: "Lock", zh: "鎖定", body: "確認支持後，資金與承諾立刻鎖定。恕不退費，也因此才有保留的意義。", band: "from-moss-bright to-moss" },
  { en: "Reserve", zh: "保留", body: "The One 依約為你保留未來限量名額，不必再跟一般市場競爭。", band: "from-gold to-[#b9843a]" },
  { en: "Verify", zh: "核對", body: "每年更新一次進度。你可以看見當初支持的事，有沒有如期發生。", band: "from-rust-bright to-moss" },
];

export function Landing() {
  const { go } = useApp();

  return (
    <div className="page-in pb-24">
      <section className="flex min-h-[62vh] flex-col justify-center py-10">
        <p className="eyebrow">影響力會員</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-extrabold leading-[1.25] text-moss md:text-[64px]">
          預見，是一種選擇
        </h1>
        <p className="mt-6 max-w-2xl text-[20px] leading-9 text-ink-soft">
          影響力消費，不是把錢換成已經完成的商品。它是此刻就把支持交給時間，讓一件尚未存在的作品，被允許慢慢發生。
        </p>
        <button type="button" onClick={() => go("selectTier")} className="btn btn-moss mt-10 w-fit">
          開始選擇會員卡
        </button>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="panel border-t-4 border-t-ink-soft p-8 md:p-10">
          <p className="text-[15px] font-bold tracking-[0.18em] text-ink-soft">一般消費</p>
          <h2 className="mt-3 font-serif text-[32px] font-extrabold text-moss">回應現在</h2>
          <p className="mt-5 max-w-md text-[18px] leading-8 text-ink-soft">
            滿足已存在的需求，立即拿到已完成的商品。需求被填滿，交換結束。這很好，只是故事停在此刻。
          </p>
        </div>
        <div className="overflow-hidden rounded-[20px] bg-moss p-8 text-cream shadow-[0_22px_40px_-18px_rgba(36,66,47,0.55)] md:p-10">
          <p className="text-[15px] font-bold tracking-[0.18em] text-gold-soft">影響力消費</p>
          <h2 className="mt-3 font-serif text-[32px] font-extrabold">回應未來</h2>
          <p className="mt-5 max-w-md text-[18px] leading-8 text-cream/80">
            支持的是還在醞釀中的計畫。需要等待時間發酵，才能兌現。你買下的不是庫存，是一張對應具體年度內容的憑證。
          </p>
        </div>
      </section>

      <section className="py-20">
        <p className="eyebrow text-center">影響力如何長成作品</p>
        <h2 className="mt-3 text-center font-serif text-[32px] font-extrabold text-moss">時間 · 工藝 · 土地</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {["時間的醞釀", "工藝的累積", "人與土地的長久往來"].map((item) => (
            <div key={item} className="panel px-6 py-8 text-center text-[18px] font-medium text-moss">
              {item}
            </div>
          ))}
          <div className="rounded-[20px] bg-rust px-6 py-8 text-center text-[18px] font-bold text-white shadow-[0_10px_30px_-20px_rgba(32,30,25,0.35)]">
            值得被珍惜的作品
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-[28px] font-extrabold text-moss">承諾具象化四部曲</h2>
          <p className="hidden text-[15px] text-ink-soft md:block">選擇 → 鎖定 → 保留 → 核對</p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {ACTS.map((act) => (
            <article key={act.en} className="panel overflow-hidden">
              <div className={`flex h-24 items-end bg-linear-to-br ${act.band} px-5 py-4`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold tracking-[0.16em] text-white">
                  {act.en}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-[24px] font-bold">{act.zh}</h3>
                <p className="mt-3 text-[16px] leading-7 text-ink-soft">{act.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 py-10 md:grid-cols-3">
        {[
          { n: IMPACT_STATS.jobsCreated, l: "被延續的工作與職涯", accent: "border-t-rust" },
          { n: IMPACT_STATS.craftsPreserved, l: "被保存的工藝線索", accent: "border-t-gold" },
          { n: IMPACT_STATS.performancesSaved, l: "被留下的演出", accent: "border-t-moss-bright" },
        ].map((s) => (
          <div key={s.l} className={`panel border-t-4 ${s.accent} px-7 py-7`}>
            <p className="text-[16px] font-semibold text-ink-soft">{s.l}</p>
            <p className="mt-2 font-serif text-[52px] font-extrabold leading-none text-ink">{s.n}</p>
          </div>
        ))}
      </section>

      <section className="py-12 text-center">
        <p className="mx-auto max-w-xl text-[18px] leading-8 text-ink-soft">
          附加禮遇是加碼，不是核心。折扣與生日心意可以留下；真正留下來的原因，是看見支持的事，真的發生了。
        </p>
        <button type="button" onClick={() => go("selectTier")} className="btn btn-moss mt-8">
          開始選擇會員卡
        </button>
      </section>
    </div>
  );
}
