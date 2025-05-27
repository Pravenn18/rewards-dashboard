import { create } from 'zustand';

type Transaction = {
  id: string;
  date: string;
  category: string;
  points: number;
};

type Category = {
  id: string;
  name: string;
};

type RewardStore = {
  points: number;
  transactions: Transaction[];
  categories: Category[];
  redeemStatus: 'idle' | 'success' | 'error';

  setTotalPoints: (pts: number) => void;
  setTransactions: (txns: Transaction[]) => void;
  setCategories: (categories: Category[]) => void;
  setRedeemStatus: (status: 'idle' | 'success' | 'error') => void;
};

export const useRewardStore = create<RewardStore>((set) => ({
  points: 0,
  transactions: [],
  categories: [],
  redeemStatus: 'idle',

  setTotalPoints: (pts) => set({ points: pts }),
  setTransactions: (txns) => set({ transactions: txns }),
  setCategories: (categories) => set({ categories }),
  setRedeemStatus: (status) => set({ redeemStatus: status }),
}));
