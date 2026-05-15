import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

export class AiService {
  static async getRetailInsights(storeData: any) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/v1/voice-assistant`, {
        text: `Analyze this store data and provide retail insights: ${JSON.stringify(storeData)}`,
        language: 'en'
      });
      return response.data;
    } catch (error) {
      console.error('AI Insight Error:', error);
      return { response: 'AI Insight service temporarily unavailable' };
    }
  }

  static async predictDemand(category: string, currentStock: number) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/v1/demand-forecast`, {
        category,
        current_stock: currentStock
      });
      return response.data;
    } catch (error) {
      console.error('Demand Prediction Error:', error);
      return { predicted_demand: currentStock, confidence: 0 };
    }
  }
}
