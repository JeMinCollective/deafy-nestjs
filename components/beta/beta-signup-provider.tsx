"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BetaDownloadModal } from "@/components/beta/beta-download-modal";

type BetaSignupContextValue = {
  openSignup: () => void;
  closeSignup: () => void;
};

const BetaSignupContext = createContext<BetaSignupContextValue | null>(null);

export function BetaSignupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSignup = useCallback(() => setOpen(true), []);
  const closeSignup = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openSignup, closeSignup }),
    [openSignup, closeSignup],
  );

  return (
    <BetaSignupContext.Provider value={value}>
      {children}
      <BetaDownloadModal open={open} onOpenChange={setOpen} />
    </BetaSignupContext.Provider>
  );
}

export function useBetaSignup() {
  const ctx = useContext(BetaSignupContext);
  if (!ctx) {
    throw new Error("useBetaSignup must be used within BetaSignupProvider");
  }
  return ctx;
}
