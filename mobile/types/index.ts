export interface Transaction {
    id: string;
    amount: number;
    points: number;
    category: 'travel' | 'dining' | 'shopping' | 'fuel' | 'groceries';
    description: string;
    date: string;
    merchant: string;
  }
  
  export interface RewardCategory {
    id: string;
    name: string;
    pointsRequired: number;
    description: string;
    icon: string;
    available: boolean;
  }
  
  export interface RewardsState {
    totalPoints: number;
    transactions: Transaction[];
    categories: RewardCategory[];
    monthlyData: MonthlyReward[];
    categoryDistribution: CategoryDistribution[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: string;
    isOnline: boolean;
  }
  
  export interface MonthlyReward {
    month: string;
    points: number;
  }
  
  export interface CategoryDistribution {
    category: string;
    points: number;
    percentage: number;
    color: string;
  }