import { useState } from "react";
import { useApp } from "../context/AppContext";
import { IconLock } from "../components/Icons";

export function Invite() {
  const { verifyInvitation, go, selectedTier } = useApp();
  const [code, setCode] = useState("");
  const [hint, setHint] = useState("");

  return (
    <div className="page-in mx-auto max-w-xl pb-24">
      <p className="eyebrow">知己卡 · 邀請制</p>
      <h1 className="mt-3 font-serif text-[40px] font-extrabold leading-tight text-moss">
        這一張，不開放公開申請
      </h1>
      <p className="mt-4 text-[18px] leading-8 text-ink-soft">
        {selectedTier?.name}採 By Invitation Only。需先通過邀請，才能選擇最高規格的年度支持計畫，並優先保留稀有名額。
      </p>

      <div className="panel mt-10 border border-gold/50 px-8 py-10">
        <div className="flex items-center gap-2 text-wine">
          <IconLock className="h-6 w-6" />
          <p className="font-serif text-[22px] font-bold">輸入邀請碼</p>
        </div>
        <p className="mt-3 text-[15px] text-ink-soft">此為內部 Demo。輸入任何內容即可通過，只是示範這一關存在。</p>
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setHint("");
          }}
          placeholder="邀請碼"
          className="mt-6 w-full rounded-xl border border-line bg-cream px-4 py-3 text-[18px] outline-none focus:border-gold"
        />
        {hint && <p className="mt-3 text-[15px] text-wine">{hint}</p>}
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => go("selectTier")} className="btn btn-ghost flex-1">
            返回選卡
          </button>
          <button
            type="button"
            onClick={() => {
              const ok = verifyInvitation(code);
              if (!ok) setHint("請先輸入邀請碼（任何文字皆可）");
            }}
            className="btn btn-moss flex-1"
          >
            確認邀請
          </button>
        </div>
      </div>
    </div>
  );
}
