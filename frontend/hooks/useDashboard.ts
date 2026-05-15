import { useState, useEffect } from 'react';
import { aiService, inventoryService } from '../services';
import { getSocket } from '../lib/socket';

export const useDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invData = await inventoryService.getAll();
        setInventory(invData.data);
        
        // Fetch AI insights if available
        // const insightData = await aiService.getRetailInsights(invData.data);
        // setInsights(insightData);
      } catch (error) {
        console.error('Dashboard Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const socket = getSocket();
    socket.on('inventory_update', (update) => {
      setInventory((prev: any) => 
        prev.map((item: any) => item.id === update.id ? { ...item, ...update } : item)
      );
    });

    return () => {
      socket.off('inventory_update');
    };
  }, []);

  return { inventory, insights, loading };
};
