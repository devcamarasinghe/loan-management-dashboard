import { create } from 'zustand';
import type { 
  BorrowerPipeline, 
  BorrowerDetail, 
  BrokerInfo, 
  PipelineTab 
} from '@/types';
import { mockApi } from '@/services/mockApi';

interface AppState {
  borrowerPipeline: BorrowerPipeline;
  activeBorrower: BorrowerDetail | null;
  brokerInfo: BrokerInfo | null;
  onboardingSteps: string[];
  
  activeTab: PipelineTab;
  isAiAssistantEnabled: boolean;
  isLoading: boolean;
  
  setActiveTab: (tab: PipelineTab) => void;
  setActiveBorrower: (borrower: BorrowerDetail | null) => void;
  toggleAiAssistant: () => void;
  
  loadBorrowerPipeline: () => Promise<void>;
  loadBorrowerDetail: () => Promise<void>;
  loadBrokerInfo: () => Promise<void>;
  
  requestDocuments: (borrowerId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  borrowerPipeline: {
    new: [],
    in_review: [],
    approved: []
  },
  activeBorrower: null,
  brokerInfo: null,
  onboardingSteps: [],
  activeTab: 'new',
  isAiAssistantEnabled: false,
  isLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  
  toggleAiAssistant: () => set((state) => ({ 
    isAiAssistantEnabled: !state.isAiAssistantEnabled 
  })),

  loadBorrowerPipeline: async () => {
    try {
      set({ isLoading: true });
      const pipeline = await mockApi.getBorrowerPipeline();
      set({ borrowerPipeline: pipeline });
    } catch (error) {
      console.error('Error loading borrower pipeline:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadBorrowerDetail: async () => {
    try {
      const detail = await mockApi.getBorrowerDetail();
      set({ activeBorrower: detail });
    } catch (error) {
      console.error('Error loading borrower detail:', error);
    }
  },

  loadBrokerInfo: async () => {
    try {
      const broker = await mockApi.getBrokerInfo();
      set({ brokerInfo: broker });
    } catch (error) {
      console.error('Error loading broker info:', error);
    }
  },

  requestDocuments: async (borrowerId: string) => {
    try {
      set({ isLoading: true });
      await mockApi.requestDocuments(borrowerId);
    } catch (error) {
      console.error('Error requesting documents:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));