import { create } from 'zustand';

/** Short-lived routing state for unauthenticated registration flows. */
interface AuthFlowState {
  verificationEmail: string | null;
  beginEmailVerification: (email: string) => void;
  clearEmailVerification: () => void;
}

export const authFlowStore = create<AuthFlowState>()((set) => ({
  verificationEmail: null,
  beginEmailVerification: (email) => set({ verificationEmail: email }),
  clearEmailVerification: () => set({ verificationEmail: null }),
}));
