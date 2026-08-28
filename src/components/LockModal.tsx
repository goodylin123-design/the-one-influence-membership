import { useState } from "react";
import { useApp } from "../context/AppContext";
import { PROJECTS } from "../data/mock";

export function LockModal() {
  const { lockModalOpen, closeLockModal, confirmLock, selectedTier, selectedProjectIds } = useApp();
  const [agreed, setAgreed] = useState(false);

  if (!lockModalOpen) return null;

  const futureNames = selectedProjectIds
    .map((id) => PROJECTS.find((p) => p.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/45 px-4 slow-fade">
      <div className="panel max-h-[90vh] w-full max-w-lg overflow-y-auto px-8 py-10">
        <p className="eyebrow">鎖定 · 雙向承諾</p>
        <h2 className="mt-3 font-serif text-[32px] font-extrabold leading-snug text-moss">
          一旦選定即完成承諾鎖定，恕不退費
        </h2>
        <p className="mt-5 text-[17px] leading-8 text-ink-soft">
          會員這邊：年度計畫一經選定，資金與承諾立刻鎖定。The One 這邊：計畫必須如期實現，並為你保留對應的未來限量名額。
        </p>
        <p className="mt-5 text-[17px] leading-8 text-ink">
          本次鎖定：{selectedTier?.name} · {futureNames.join("、")}
        </p>
        <label className="mt-8 flex cursor-pointer items-start gap-3 text-[17px] leading-7">
          <input
            type="checkbox"
            className="mt-1.5 h-4 w-4 accent-rust"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>我了解這是不可退費的承諾，確認後將生成未來提貨券，而不是點數。</span>
        </label>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => {
              setAgreed(false);
              closeLockModal();
            }}
            className="btn btn-ghost flex-1"
          >
            返回
          </button>
          <button
            type="button"
            disabled={!agreed}
            onClick={() => {
              confirmLock();
              setAgreed(false);
            }}
            className="btn btn-moss flex-1"
          >
            確認鎖定
          </button>
        </div>
      </div>
    </div>
  );
}
