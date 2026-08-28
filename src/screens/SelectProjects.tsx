import { PROJECTS, maxProjectsLabel, neededTierFor, projectAllowed } from "../data/mock";
import { useApp } from "../context/AppContext";
import { projectIcon } from "../components/Icons";
import { LockModal } from "../components/LockModal";
import type { QualityTier } from "../types";

const PROJECT_BANDS: Record<string, string> = {
  音樂: "from-rust-bright to-rust",
  飲食: "from-moss-bright to-moss",
  工藝: "from-gold to-[#b9843a]",
};

const TIER_BADGE: Record<QualityTier, string> = {
  標準: "bg-haze/15 text-haze",
  進階: "bg-moss/15 text-moss",
  最高: "bg-wine/10 text-wine",
};

export function SelectProjects() {
  const { selectedTier, selectedProjectIds, toggleProject, openLockModal, canLock, go } = useApp();
  const max = selectedTier?.maxProjects ?? null;
  const allowed = selectedTier?.projectTierAllowed ?? ["標準"];
  const atCap = max != null && selectedProjectIds.length >= max;

  return (
    <div className="page-in pb-36">
      <p className="eyebrow">選擇 · Choose</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold text-moss">年度支持計畫</h1>
      <p className="mt-4 max-w-3xl text-[18px] leading-8 text-ink-soft">
        {selectedTier?.name}
        可支持{allowed.join("、")}規格，
        {maxProjectsLabel(max)}。這是核心：支持理念完成，對應未來提貨券。附加禮遇稍後在儀表板分開呈現。
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((project) => {
          const on = selectedProjectIds.includes(project.id);
          const ok = projectAllowed(allowed, project.qualityTier);
          const full = ok && !on && atCap;
          const Icon = projectIcon(project.category);
          return (
            <button
              key={project.id}
              type="button"
              disabled={!ok || full}
              onClick={() => toggleProject(project.id)}
              className={`panel overflow-hidden text-left transition duration-300 disabled:opacity-45 ${
                on ? "ring-4 ring-rust/70" : ok ? "hover:-translate-y-1" : ""
              }`}
            >
              <div className={`flex h-24 items-end justify-between bg-linear-to-br ${PROJECT_BANDS[project.category]} px-5 py-4`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold tracking-[0.14em] text-white">
                  {project.category}
                </span>
                <Icon className="h-9 w-9 text-white" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-[13px] font-bold ${TIER_BADGE[project.qualityTier]}`}>
                    {project.qualityTier}
                  </span>
                  <span className="text-[15px] font-bold text-rust">{project.maturityLabel}</span>
                </div>
                <h3 className="mt-3 font-serif text-[24px] font-bold">{project.name}</h3>
                <p className="mt-3 text-[16px] leading-7 text-ink-soft">{project.description}</p>
                <p className="mt-5 text-[15px] font-bold text-moss">
                  {!ok
                    ? `需${neededTierFor(project.qualityTier)}`
                    : full
                      ? "已達本卡項目上限"
                      : on
                        ? "已納入本次鎖定"
                        : "點選加入"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-line bg-cream/95 px-6 py-4 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[16px] text-ink-soft">
            已選 {selectedProjectIds.length}
            {max == null ? "" : `／${max}`}　
            {selectedProjectIds.map((id) => PROJECTS.find((p) => p.id === id)?.name).join("、") || "尚未選擇"}
            {!canLock ? "　· 請至少鎖定 1 項，才能進行鎖定" : ""}
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
