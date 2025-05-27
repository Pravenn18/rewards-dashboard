import { useRewardStore } from "@/store/rewardStore";

export const rewardsService = {
  fetchPoints: async () => {
    const res = await fetch('/api/rewards/points');
    const data = await res.json();
    useRewardStore.getState().setTotalPoints(data.totalPoints);
  },

  fetchTransactions: async () => {
    const res = await fetch('/api/rewards/transaction');
    const data = await res.json();
    useRewardStore.getState().setTransactions(data.transactions);
  },

  fetchCategories: async () => {
    const res = await fetch('/api/rewards/categories');
    const data = await res.json();
    useRewardStore.getState().setCategories(data.categories);
  },

  redeemPoints: async (points: number, category: string) => {
    const res = await fetch('/api/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ pointsToRedeem: points, category }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      useRewardStore.getState().setTotalPoints(data.remainingPoints);
      useRewardStore.getState().setRedeemStatus('success');
    } else {
      useRewardStore.getState().setRedeemStatus('error');
    }
  },
};
