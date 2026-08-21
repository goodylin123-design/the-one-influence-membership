import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_MEMBER, LODGING_PLANS, PROJECTS, SELECT_PRODUCTS, TIERS } from "../data/mock";
import { addYears, deriveVoucherState, makeVoucherNumber } from "../lib/format";
import type {
  FutureVoucher,
  Member,
  MembershipTier,
  Screen,
  SupportProject,
  VerifySnapshot,
} from "../types";

interface AppState {
  screen: Screen;
  member: Member;
  selectedTierId: string | null;
  selectedProjectIds: string[];
  arrangeByTheOne: boolean;
  lodgingPlanId: string | null;
  selectProductIds: string[];
  vouchers: FutureVoucher[];
  simulatedNow: string;
  lockModalOpen: boolean;
  verifySnapshot: VerifySnapshot | null;
}

interface AppContextValue extends AppState {
  selectedTier: MembershipTier | null;
  canLock: boolean;
  lodgingLabel: string;
  productLabels: string[];
  go: (screen: Screen) => void;
  selectTier: (tierId: string) => void;
  toggleProject: (projectId: string) => void;
  setArrangeByTheOne: (value: boolean) => void;
  setLodgingPlanId: (id: string) => void;
  toggleSelectProduct: (id: string) => void;
  openLockModal: () => void;
  closeLockModal: () => void;
  confirmLock: () => void;
  advanceTime: () => void;
  openVerify: (voucherId?: string) => void;
  resetDemo: () => void;
  getProject: (id: string) => SupportProject;
}

const AppContext = createContext<AppContextValue | null>(null);

function defaultLodging(tierId: string) {
  return LODGING_PLANS.find((p) => p.tierId === tierId && p.id.endsWith("split"))?.id ?? null;
}

function defaultProducts(count: number) {
  return SELECT_PRODUCTS.slice(0, count).map((p) => p.id);
}

const initialState = (): AppState => ({
  screen: "landing",
  member: { ...DEMO_MEMBER },
  selectedTierId: null,
  selectedProjectIds: [],
  arrangeByTheOne: false,
  lodgingPlanId: null,
  selectProductIds: [],
  vouchers: [],
  simulatedNow: new Date().toISOString(),
  lockModalOpen: false,
  verifySnapshot: null,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const selectedTier = useMemo(
    () => TIERS.find((t) => t.id === state.selectedTierId) ?? null,
    [state.selectedTierId],
  );

  const canLock = useMemo(() => {
    if (!selectedTier) return false;
    if (state.arrangeByTheOne) return true;
    const productsOk = state.selectProductIds.length === selectedTier.maxSelectProducts;
    return Boolean(state.lodgingPlanId) && productsOk;
  }, [selectedTier, state.arrangeByTheOne, state.lodgingPlanId, state.selectProductIds]);

  const lodgingLabel = useMemo(() => {
    const id = state.lodgingPlanId ?? (selectedTier ? defaultLodging(selectedTier.id) : null);
    return LODGING_PLANS.find((p) => p.id === id)?.label ?? "尚未選擇";
  }, [state.lodgingPlanId, selectedTier]);

  const productLabels = useMemo(() => {
    const ids =
      state.selectProductIds.length > 0
        ? state.selectProductIds
        : selectedTier
          ? defaultProducts(selectedTier.maxSelectProducts)
          : [];
    return ids
      .map((id) => SELECT_PRODUCTS.find((p) => p.id === id)?.name)
      .filter((n): n is string => Boolean(n));
  }, [state.selectProductIds, selectedTier]);

  const go = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const selectTier = useCallback((tierId: string) => {
    const tier = TIERS.find((t) => t.id === tierId);
    setState((s) => ({
      ...s,
      selectedTierId: tierId,
      selectedProjectIds: s.selectedProjectIds.slice(0, tier?.maxProjects ?? 1),
      lodgingPlanId: s.selectedTierId === tierId ? s.lodgingPlanId : null,
      selectProductIds: s.selectedTierId === tierId ? s.selectProductIds : [],
      arrangeByTheOne: s.selectedTierId === tierId ? s.arrangeByTheOne : false,
    }));
  }, []);

  const toggleProject = useCallback((projectId: string) => {
    setState((s) => {
      const tier = TIERS.find((t) => t.id === s.selectedTierId);
      const max = tier?.maxProjects ?? 1;
      const has = s.selectedProjectIds.includes(projectId);
      if (has) {
        return { ...s, selectedProjectIds: s.selectedProjectIds.filter((id) => id !== projectId) };
      }
      if (s.selectedProjectIds.length >= max) {
        return s;
      }
      return { ...s, selectedProjectIds: [...s.selectedProjectIds, projectId] };
    });
  }, []);

  const setArrangeByTheOne = useCallback((value: boolean) => {
    setState((s) => {
      const tier = TIERS.find((t) => t.id === s.selectedTierId);
      if (value && tier) {
        return {
          ...s,
          arrangeByTheOne: true,
          lodgingPlanId: defaultLodging(tier.id),
          selectProductIds: defaultProducts(tier.maxSelectProducts),
        };
      }
      return { ...s, arrangeByTheOne: false };
    });
  }, []);

  const setLodgingPlanId = useCallback((id: string) => {
    setState((s) => ({ ...s, lodgingPlanId: id, arrangeByTheOne: false }));
  }, []);

  const toggleSelectProduct = useCallback((id: string) => {
    setState((s) => {
      const tier = TIERS.find((t) => t.id === s.selectedTierId);
      const max = tier?.maxSelectProducts ?? 1;
      const has = s.selectProductIds.includes(id);
      const next = has
        ? s.selectProductIds.filter((x) => x !== id)
        : s.selectProductIds.length >= max
          ? s.selectProductIds
          : [...s.selectProductIds, id];
      return { ...s, selectProductIds: next, arrangeByTheOne: false };
    });
  }, []);

  const openLockModal = useCallback(() => {
    setState((s) => ({ ...s, lockModalOpen: true }));
  }, []);

  const closeLockModal = useCallback(() => {
    setState((s) => ({ ...s, lockModalOpen: false }));
  }, []);

  const confirmLock = useCallback(() => {
    setState((s) => {
      const now = new Date().toISOString();
      const vouchers: FutureVoucher[] = s.selectedProjectIds.map((projectId, index) => {
        const project = PROJECTS.find((p) => p.id === projectId)!;
        const lockedDate = now;
        const maturityDate = addYears(now, project.maturityYears);
        const derived = deriveVoucherState({ lockedDate, maturityDate }, project, now);
        return {
          id: `v-${projectId}-${index}`,
          voucherNumber: makeVoucherNumber(projectId, index, lockedDate),
          projectId,
          memberId: s.member.id,
          lockedDate,
          maturityDate,
          currentStageIndex: derived.currentStageIndex,
          status: derived.status,
        };
      });
      return {
        ...s,
        lockModalOpen: false,
        simulatedNow: now,
        vouchers,
        member: {
          ...s.member,
          tierId: s.selectedTierId,
          lockedVoucherIds: vouchers.map((v) => v.id),
        },
        screen: "voucherReveal",
      };
    });
  }, []);

  const refreshVouchers = useCallback((vouchers: FutureVoucher[], simulatedNow: string) => {
    return vouchers.map((v) => {
      const project = PROJECTS.find((p) => p.id === v.projectId)!;
      const derived = deriveVoucherState(v, project, simulatedNow);
      return { ...v, ...derived };
    });
  }, []);

  const advanceTime = useCallback(() => {
    setState((s) => {
      if (s.vouchers.length === 0) return { ...s, simulatedNow: addYears(s.simulatedNow, 1) };
      const nextNow = addYears(s.simulatedNow, 1);
      const prev = s.vouchers;
      const next = refreshVouchers(prev, nextNow);
      const changedList = next.filter(
        (v, i) => v.currentStageIndex !== prev[i].currentStageIndex || v.status !== prev[i].status,
      );
      const changed =
        changedList.find((v) => v.projectId === "tofu") ?? changedList[0] ?? next[0];
      const prevMatch = prev.find((v) => v.id === changed?.id) ?? prev[0];
      const snapshot: VerifySnapshot | null = changed
        ? {
            voucherId: changed.id,
            projectId: changed.projectId,
            fromStageIndex: prevMatch.currentStageIndex,
            toStageIndex: changed.currentStageIndex,
            fromStatus: prevMatch.status,
            toStatus: changed.status,
          }
        : null;
      return {
        ...s,
        simulatedNow: nextNow,
        vouchers: next,
        verifySnapshot: snapshot,
        screen: snapshot ? "verify" : s.screen,
      };
    });
  }, [refreshVouchers]);

  const openVerify = useCallback((voucherId?: string) => {
    setState((s) => {
      const target = s.vouchers.find((v) => v.id === voucherId) ?? s.vouchers[0];
      if (!target) return s;
      return {
        ...s,
        verifySnapshot: {
          voucherId: target.id,
          projectId: target.projectId,
          fromStageIndex: Math.max(0, target.currentStageIndex - 1),
          toStageIndex: target.currentStageIndex,
          fromStatus: target.currentStageIndex === 0 ? "locked" : "in_progress",
          toStatus: target.status,
        },
        screen: "verify",
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState(initialState());
  }, []);

  const getProject = useCallback((id: string) => {
    const found = PROJECTS.find((p) => p.id === id);
    if (!found) throw new Error(`找不到計畫：${id}`);
    return found;
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      selectedTier,
      canLock,
      lodgingLabel,
      productLabels,
      go,
      selectTier,
      toggleProject,
      setArrangeByTheOne,
      setLodgingPlanId,
      toggleSelectProduct,
      openLockModal,
      closeLockModal,
      confirmLock,
      advanceTime,
      openVerify,
      resetDemo,
      getProject,
    }),
    [
      state,
      selectedTier,
      canLock,
      lodgingLabel,
      productLabels,
      go,
      selectTier,
      toggleProject,
      setArrangeByTheOne,
      setLodgingPlanId,
      toggleSelectProduct,
      openLockModal,
      closeLockModal,
      confirmLock,
      advanceTime,
      openVerify,
      resetDemo,
      getProject,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
