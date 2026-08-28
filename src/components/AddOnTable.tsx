import { ADD_ON_BENEFITS, TIER_RANK, TIERS } from "../data/mock";
import type { TierId } from "../types";

function cell(minTierId: TierId, col: TierId, description: string) {
  if (TIER_RANK[col] < TIER_RANK[minTierId]) return "—";
  if (col === minTierId) return description;
  return "✓";
}

export function AddOnTable({ compact }: { compact?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line text-[13px] font-bold tracking-[0.08em] text-ink-soft">
            <th className="py-3 pr-3 font-bold">附加禮遇</th>
            {TIERS.map((t) => (
              <th key={t.id} className="px-2 py-3 font-bold">
                {t.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ADD_ON_BENEFITS.map((item) => (
            <tr key={item.id} className="border-b border-line/70">
              <td className={`py-3 pr-3 font-serif ${compact ? "text-[16px]" : "text-[17px]"} font-bold`}>
                {item.name}
              </td>
              {TIERS.map((t) => (
                <td key={t.id} className="px-2 py-3 text-[14px] leading-6 text-ink-soft">
                  {cell(item.minTierId, t.id, item.description)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
