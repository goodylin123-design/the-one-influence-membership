import { ANNUAL_BENEFITS, LODGING_PLANS, PROJECTS, SELECT_PRODUCTS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { projectIcon } from "../components/Icons";
import { LockModal } from "../components/LockModal";

const BANDS = ["from-rust-bright to-rust", "from-moss-bright to-moss", "from-gold to-[#b9843a]", "from-wine to-[#4a0808]"];
const PROJECT_BANDS: Record<string, string> = {
  音樂: "from-rust-bright to-rust",
  飲食: "from-moss-bright to-moss",
  工藝: "from-gold to-[#b9843a]",
};

export function SelectProjects() {
  const {
    selectedTier,
    selectedProjectIds,
    toggleProject,
    arrangeByTheOne,
    setArrangeByTheOne,
    lodgingPlanId,
    setLodgingPlanId,
    selectProductIds,
    toggleSelectProduct,
    openLockModal,
    canLock,
    go,
  } = useApp();

  const tierId = selectedTier?.id ?? "zhiyin";
  const isZhiji = tierId === "zhiji";
  const max = selectedTier?.maxProjects ?? 1;
  const maxProducts = selectedTier?.maxSelectProducts ?? 1;
  const lodgingOptions = LODGING_PLANS.filter((p) => p.tierId === tierId);

  return (
    <div className="page-in pb-36">
      <p className="eyebrow">選擇 · Choose</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold text-moss">
        {selectedTier?.name}年度支持內容
      </h1>
      <p className="mt-4 max-w-3xl text-[18px] leading-8 text-ink-soft">
        年費已包含下列十項異數人支持。住宿與 Select 商品需要你決定，或交給 The One 安排。另外可再鎖定未來提貨券計畫。
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setArrangeByTheOne(false)}
          className={`rounded-full px-5 py-2.5 text-[15px] font-bold ${
            !arrangeByTheOne ? "bg-moss text-white" : "bg-white text-moss"
          }`}
        >
          自行組合
        </button>
        <button
          type="button"
          onClick={() => setArrangeByTheOne(true)}
          className={`rounded-full px-5 py-2.5 text-[15px] font-bold ${
            arrangeByTheOne ? "bg-moss text-white" : "bg-white text-moss"
          }`}
        >
          交給 The One 安排
        </button>
      </div>

      {arrangeByTheOne && (
        <div className="panel mt-6 px-6 py-5 text-[16px] leading-7 text-ink-soft">
          The One 將為你安排：{selectedTier?.nights === 4 ? "南園 2 晚 + 永靖 2 晚" : "南園 1 晚 + 永靖 1 晚"}
          ，以及 Select 前 {maxProducts} 項商品全年 85 折。十項支持內容一併鎖定。
        </div>
      )}

      <h2 className="mt-12 font-serif text-[28px] font-extrabold text-moss">十項年度支持</h2>
      <p className="mt-2 text-[16px] text-ink-soft">以下依你選擇的卡別顯示規格。知己卡在住宿、攜伴、優先順位與顧問次數上全面升級。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {ANNUAL_BENEFITS.map((item, i) => (
          <article key={item.id} className="panel overflow-hidden">
            <div className={`flex h-16 items-end bg-linear-to-br ${BANDS[i % BANDS.length]} px-5 py-3`}>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold tracking-[0.14em] text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-[22px] font-bold">{item.name}</h3>
                {isZhiji && item.upgraded && (
                  <span className="shrink-0 rounded-full bg-wine/10 px-3 py-1 text-[13px] font-bold text-wine">
                    知己卡升級
                  </span>
                )}
              </div>
              <p className="mt-3 text-[16px] leading-7 text-ink-soft">
                {isZhiji ? item.zhiji : item.zhiyin}
              </p>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-serif text-[28px] font-extrabold text-moss">今年住宿怎麼住</h2>
      <p className="mt-2 text-[16px] text-ink-soft">
        {selectedTier?.name}每年 {selectedTier?.nights} 晚，南園／永靖任選。
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {lodgingOptions.map((plan) => {
          const on = lodgingPlanId === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setLodgingPlanId(plan.id)}
              className={`panel px-5 py-6 text-left ${on ? "ring-4 ring-moss/70" : "hover:-translate-y-1"}`}
            >
              <p className="font-serif text-[22px] font-bold">{plan.label}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{plan.detail}</p>
              <p className="mt-4 text-[15px] font-bold text-moss">{on ? "已選擇" : "點選此方案"}</p>
            </button>
          );
        })}
      </div>

      <h2 className="mt-14 font-serif text-[28px] font-extrabold text-moss">The One Select 全年 85 折</h2>
      <p className="mt-2 text-[16px] text-ink-soft">
        {selectedTier?.name}可選 {maxProducts} 項。選定後全年以此折扣購買。
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SELECT_PRODUCTS.map((product) => {
          const on = selectProductIds.includes(product.id);
          const full = !on && selectProductIds.length >= maxProducts;
          return (
            <button
              key={product.id}
              type="button"
              disabled={full}
              onClick={() => toggleSelectProduct(product.id)}
              className={`panel px-5 py-5 text-left disabled:opacity-40 ${on ? "ring-4 ring-rust/70" : "hover:-translate-y-1"}`}
            >
              <p className="text-[13px] font-bold tracking-[0.12em] text-rust">{product.origin}</p>
              <p className="mt-2 font-serif text-[20px] font-bold">{product.name}</p>
              <p className="mt-3 text-[15px] font-bold text-moss">{on ? "已納入 85 折" : "點選加入"}</p>
            </button>
          );
        })}
      </div>

      <h2 className="mt-14 font-serif text-[28px] font-extrabold text-moss">未來提貨券計畫（可另選）</h2>
      <p className="mt-2 text-[16px] text-ink-soft">
        這不是點數。{selectedTier?.name}最多可另鎖 {max} 項，對應 1 年、2 年或 5 年後兌現的憑證。
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((project) => {
          const on = selectedProjectIds.includes(project.id);
          const full = !on && selectedProjectIds.length >= max;
          const Icon = projectIcon(project.category);
          return (
            <button
              key={project.id}
              type="button"
              disabled={full}
              onClick={() => toggleProject(project.id)}
              className={`panel overflow-hidden text-left transition duration-300 disabled:opacity-40 ${
                on ? "ring-4 ring-rust/70" : "hover:-translate-y-1"
              }`}
            >
              <div className={`flex h-24 items-end justify-between bg-linear-to-br ${PROJECT_BANDS[project.category]} px-5 py-4`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold tracking-[0.14em] text-white">
                  {project.category}
                </span>
                <Icon className="h-9 w-9 text-white" />
              </div>
              <div className="p-6">
                <p className="text-[15px] font-bold text-rust">{project.maturityLabel}</p>
                <h3 className="mt-2 font-serif text-[24px] font-bold">{project.name}</h3>
                <p className="mt-3 text-[16px] leading-7 text-ink-soft">{project.description}</p>
                <p className="mt-5 text-[15px] font-bold text-moss">{on ? "已納入本次鎖定" : "點選加入"}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-line bg-cream/95 px-6 py-4 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[16px] text-ink-soft">
            {arrangeByTheOne ? "已交給 The One 安排" : canLock ? "住宿與 Select 已選定" : "請完成住宿與 Select 選擇"}
            {selectedProjectIds.length > 0
              ? `　· 未來計畫 ${selectedProjectIds.length}／${max}`
              : "　· 尚未另鎖未來提貨券"}
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => go("selectTier")} className="btn btn-ghost">
              返回選卡
            </button>
            <button type="button" disabled={!canLock} onClick={openLockModal} className="btn btn-rust">
              進行鎖定
            </button>
          </div>
        </div>
      </div>
      <LockModal />
    </div>
  );
}
