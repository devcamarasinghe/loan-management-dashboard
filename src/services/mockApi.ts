import type { 
  BorrowerPipeline, 
  BorrowerDetail, 
  BrokerInfo, 
  ApiResponse 
} from '@/types';

let sampleData: unknown = null;

const loadSampleData = async <T>(): Promise<T> => {
  if (!sampleData) {
    try {
      const response = await fetch('/data/sample-response.json');
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }
      sampleData = await response.json();
    } catch (error) {
      console.error('Error loading sample data:', error);
      throw error;
    }
  }
  return sampleData as T;
};

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getBorrowerPipeline(): Promise<BorrowerPipeline> {
    await delay();
  const data = await loadSampleData<any>();
    const pipelineEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Borrower Pipeline"
    );
    return pipelineEndpoint.response;
  },

  async getBorrowerDetail(): Promise<BorrowerDetail | null> {
    await delay();
    const data = await loadSampleData<any>();
    const detailEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Borrower Detail"
    );
    return detailEndpoint.response;
  },

  async getBrokerInfo(): Promise<BrokerInfo> {
    await delay();
  const data = await loadSampleData<any>();
    const brokerEndpoint = data.endpoints.find((ep: any) => 
      ep.name === "Get Broker Info"
    );
    return brokerEndpoint.response;
  },

  async requestDocuments(borrowerId: string): Promise<ApiResponse<void>> {
    await delay();
    console.log(`📄 Requesting documents for borrower ${borrowerId}`);
    return { success: true, message: "Documents requested." };
  }
};