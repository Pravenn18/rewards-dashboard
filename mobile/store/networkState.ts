import { NetworkState } from "@/types";
import { create } from "zustand";

export const useNetworkStore = create<NetworkState>((set) => ({
    isConnected: true,
    setIsConnected: (status) => set({ isConnected: status }),
}));