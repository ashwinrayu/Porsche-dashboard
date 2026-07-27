import { useState, useEffect } from 'react';

export interface ExecDashboardData {
  unassignedDeals: number;
  unassignedChangePct: number;
  longestIdleHours: number;
  longestIdleChangePct: number;
  averageIdleRange: {
    minDays: number;
    maxDays: number;
    count: number;
  };
  queueVolumeHistory: { day: string; value: number }[];
  radialCategories: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const radialColors = [
  '#D5001C', // Guards Red
  '#A2E600', // Acid Green
  '#94A3B8', // GT Silver
  '#0F172A', // Jet Black
  '#E2E8F0', // Chalk
  '#F59E0B', // Racing Yellow
  '#1E3A8A', // Gentian Blue
  '#10B981', // Mamba Green
  '#475569', // Carbon Grey
  '#000000', // Solid Black
];

const categoryNames = [
  "911 Custom Configs (Naco)",
  "Taycan EV Fleet Orders",
  "Cayenne Trade-in Queue",
  "Macan Electric Reservations",
  "Panamera Corporate Leasing",
  "718 Cayman GT Series",
  "Santo Domingo East Walk-ins",
  "Piantini Luxury Pre-orders",
  "Santiago Expansion Leads",
  "Samaná VIP Allocations"
];

export const generateExecDashboard = (): ExecDashboardData => {
  // Generate 30 days of queue volume
  const queueVolumeHistory = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // Generate a wavy line with noise
    const baseVal = 140 + Math.sin(day * 0.4) * 35 + Math.cos(day * 0.25) * 15;
    const jitter = Math.floor(Math.random() * 12) - 6;
    return {
      day: `${day} Jul`,
      value: Math.max(80, Math.floor(baseVal + jitter))
    };
  });

  // Generate radial components
  const radialCategories = categoryNames.map((name, index) => {
    const baseValue = 40 + (index * 12) + Math.floor(Math.random() * 10);
    return {
      name,
      value: baseValue,
      fill: radialColors[index % radialColors.length],
    };
  });

  return {
    unassignedDeals: 407,
    unassignedChangePct: 4.8,
    longestIdleHours: 124,
    longestIdleChangePct: -12.4,
    averageIdleRange: {
      minDays: 1.8,
      maxDays: 2.2,
      count: 274
    },
    queueVolumeHistory,
    radialCategories,
  };
};

export const useLiveMetrics = () => {
  const [data, setData] = useState<ExecDashboardData>(() => generateExecDashboard());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // Jitter unassigned deals: slightly go up or down by -2 to +3
        const delta = Math.random() > 0.4 ? Math.floor(Math.random() * 4) - 1 : Math.floor(Math.random() * 3) - 2;
        const nextUnassigned = Math.max(380, prev.unassignedDeals + delta);

        // Jitter percentage changes
        const nextChange = parseFloat((prev.unassignedChangePct + (Math.random() * 0.2 - 0.1)).toFixed(1));
        const nextLongestIdleHours = Math.max(115, prev.longestIdleHours + (Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) : 0));
        
        // Jitter the count in average idle range
        const rangeCountJitter = Math.floor(Math.random() * 5) - 2;
        const nextCount = Math.max(250, prev.averageIdleRange.count + rangeCountJitter);

        // Jitter queue history last item
        const updatedHistory = [...prev.queueVolumeHistory];
        const lastIndex = updatedHistory.length - 1;
        if (lastIndex >= 0) {
          const lastVal = updatedHistory[lastIndex].value;
          const jitterVal = Math.floor(Math.random() * 6) - 3;
          updatedHistory[lastIndex] = {
            ...updatedHistory[lastIndex],
            value: Math.max(90, lastVal + jitterVal)
          };
        }

        // Jitter radial bar categories slightly
        const updatedRadial = prev.radialCategories.map(cat => {
          const valueJitter = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return {
            ...cat,
            value: Math.max(15, cat.value + valueJitter)
          };
        });

        return {
          ...prev,
          unassignedDeals: nextUnassigned,
          unassignedChangePct: nextChange,
          longestIdleHours: nextLongestIdleHours,
          averageIdleRange: {
            ...prev.averageIdleRange,
            count: nextCount
          },
          queueVolumeHistory: updatedHistory,
          radialCategories: updatedRadial,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
};
