import type { 
  BorrowerPipeline, 
  BorrowerDetail, 
  BrokerInfo, 
  ApiResponse 
} from '@/types';

// Load sample data from public folder
let sampleData: any = null;

const loadSampleData = async () => {
  if (!sampleData) {
    const response = await fetch('/data/sample-response.json');
    sampleData = await response.json();
  }
  return sampleData;
};

// Simulate API delay for realistic UX
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions that match the exact endpoints from sample-response.json
export const mockApi = {
  async getBorrowerPipeline(): Promise<BorrowerPipeline> {
    await delay();
    const data = await loadSampleData();
    const pipelineEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Borrower Pipeline"
    );
    return pipelineEndpoint.response;
  },

  async getBorrowerDetail(id: string): Promise<BorrowerDetail | null> {
    await delay();
    const data = await loadSampleData();
    const detailEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Borrower Detail"
    );
    // For now return the sample data, later we can make it dynamic per ID
    return detailEndpoint.response;
  },

  async getBrokerInfo(): Promise<BrokerInfo> {
    await delay();
    const data = await loadSampleData();
    const brokerEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Broker Info"
    );
    return brokerEndpoint.response;
  },

  // Action endpoints
  async requestDocuments(borrowerId: string): Promise<ApiResponse<void>> {
    await delay();
    console.log(`📄 Requesting documents for borrower ${borrowerId}`);
    return { success: true, message: "Documents requested." };
  }
};