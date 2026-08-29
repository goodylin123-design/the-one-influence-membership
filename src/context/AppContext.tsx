import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_MEMBER, PROJECTS, TIERS, isFunded, projectAllowed } from "../data/mock";
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
  invitationVerified: boolean;
  selectedProjectIds: string[];
  vouchers: FutureVoucher[];
  simulatedNow: string;
  lockModalOpen: boolean;
  verifySnapshot: VerifySnapshot | null;
}

interface AppContextValue extends AppState {
  selectedTier: MembershipTier | null;
  canLock: boolean;
  go: (screen: Screen) => void;
  selectTier: (tierId: string) => void;
  continueFromTier: () => void;
  verifyInvitation: (code: string) => boolean;
  toggleProject: (projectId: string) => void;
  openLockModal: () => void;
  closeLockModal: () => void;
  confirmLock: () => void;
  advanceTime: () => void;
  openVerify: (voucherId?: string) => void;
  resetDemo: () => void;
  getProject: (id: string) => SupportProject;
}

const AppContext = createContext<AppContextValue | null>(null);

const initialState = (): AppState => ({
  screen: "landing",
  member: { ...DEMO_MEMBER },
  selectedTierId: null,
  invitationVerified: false,
  selectedProjectIds: [],
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

  const canLock = Boolean(selectedTier && state.selectedProjectIds.length > 0);

  const go = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const selectTier = useCallback((tierId: string) => {
    setState((s) => ({
      ...s,
      selectedTierId: tierId,
      invitationVerified: false,
      selectedProjectIds: [],
    }));
  }, []);

  const continueFromTier = useCallback(() => {
    setState((s) => {
      const tier = TIERS.find((t) => t.id === s.selectedTierId);
      if (!tier) return s;
      if (tier.invitationOnly && !s.invitationVerified) {
        return { ...s, screen: "invite" };
      }
      return { ...s, screen: "selectProjects" };
    });
  }, []);

  const verifyInvitation = useCallback((code: string) => {
    if (!code.trim()) return false;
    setState((s) => ({
      ...s,
      invitationVerified: true,
      member: { ...s.member, invitationVerified: true },
      screen: "selectProjects",
    }));
    return true;
  }, []);

  const toggleProject = useCallback((projectId: string) => {
    setState((s) => {
      const tier = TIERS.find((t) => t.id === s.selectedTierId);
      const project = PROJECTS.find((p) => p.id === projectId);
      if (!tier || !project) return s;
      if (!projectAllowed(tier.projectTierAllowed, project.qualityTier)) return s;

      const has = s.selectedProjectIds.includes(projectId);
      if (has) {
        return { ...s, selectedProjectIds: s.selectedProjectIds.filter((id) => id !== projectId) };
      }
      if (isFunded(project)) return s;
      const max = tier.maxProjects;
      if (max != null && s.selectedProjectIds.length >= max) return s;
      return { ...s, selectedProjectIds: [...s.selectedProjectIds, projectId] };
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
          invitationVerified: s.invitationVerified,
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
        changedList.find((v) => v.projectId === "plumwine") ??
        changedList.find((v) => v.projectId === "tofu") ??
        changedList[0] ??
        next[0];
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
      go,
      selectTier,
      continueFromTier,
      verifyInvitation,
      toggleProject,
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
      go,
      selectTier,
      continueFromTier,
      verifyInvitation,
      toggleProject,
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
