import { useApp } from "../context/AppContext";

export function TopBar() {
  const { screen, selectedTier, member, resetDemo, go } = useApp();
  const showMember = Boolean(member.tierId);

  return (
    <header className="flex items-center justify-between py-8">
      <button type="button" onClick={() => go("landing")} className="flex items-center gap-2.5 text-left">
        <span className="h-2.5 w-2.5 rounded-full bg-rust" />
        <span className="font-serif text-[28px] font-black tracking-wide text-moss">The One</span>
      </button>
      <div className="flex items-center gap-4 text-[16px] font-medium text-ink-soft">
        {showMember ? (
          <>
            <span>
              {member.name} · {selectedTier?.name}
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-rust-bright to-gold font-serif text-[17px] font-bold text-white">
              示
            </div>
          </>
        ) : (
          <span>影響力會員 Demo</span>
        )}
        {screen !== "landing" && (
          <button type="button" onClick={resetDemo} className="text-[15px] font-bold text-rust">
            重新體驗
          </button>
        )}
      </div>
    </header>
  );
}
