

export type NetworkState = {
    isConnected: boolean;
    setIsConnected: (status: boolean) => void;
};

export type Transaction = {
  id: string;
  date: string;
  category: string;
  points: number;
};

export type Category = {
  id: string;
  name: string;
};

export type RewardStore = {
  points: number;
  transactions: Transaction[];
  categories: Category[];
  redeemStatus: 'idle' | 'success' | 'error';

  setTotalPoints: (pts: number) => void;
  setTransactions: (txns: Transaction[]) => void;
  setCategories: (categories: Category[]) => void;
  setRedeemStatus: (status: 'idle' | 'success' | 'error') => void;
};