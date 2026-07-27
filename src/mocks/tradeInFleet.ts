export interface TradeInVehicle {
  id: string;
  ownerName: string;
  model: 'Cayenne' | 'Macan';
  variant: string;
  powertrain: 'ICE' | 'Hybrid' | 'Electric';
  ageMonths: number;
  currentMileage: number;
  mileageThreshold: number;
  status: 'Not Yet' | 'Approaching' | 'Ready';
}

export const generateTradeInFleet = (): TradeInVehicle[] => {
  const vehicles = [
    { ownerName: 'Carlos Llenas', model: 'Cayenne' as const, variant: 'Cayenne', powertrain: 'ICE' as const, ageMonths: 42, currentMileage: 58000, mileageThreshold: 65000 },
    { ownerName: 'Mía Espaillat', model: 'Macan' as const, variant: 'Macan 4 Electric', powertrain: 'Electric' as const, ageMonths: 22, currentMileage: 32000, mileageThreshold: 50000 },
    { ownerName: 'Juan Vicini', model: 'Cayenne' as const, variant: 'Cayenne E-Hybrid', powertrain: 'Hybrid' as const, ageMonths: 34, currentMileage: 48000, mileageThreshold: 55000 },
    { ownerName: 'Ana Ramírez', model: 'Macan' as const, variant: 'Macan GTS', powertrain: 'ICE' as const, ageMonths: 12, currentMileage: 15000, mileageThreshold: 55000 },
    { ownerName: 'Pedro Báez', model: 'Macan' as const, variant: 'Macan Turbo Electric', powertrain: 'Electric' as const, ageMonths: 38, currentMileage: 42000, mileageThreshold: 50000 },
    { ownerName: 'Sofía Sánchez', model: 'Cayenne' as const, variant: 'Cayenne S', powertrain: 'ICE' as const, ageMonths: 16, currentMileage: 22000, mileageThreshold: 60000 },
    { ownerName: 'Ricardo Grullón', model: 'Macan' as const, variant: 'Macan', powertrain: 'ICE' as const, ageMonths: 48, currentMileage: 72000, mileageThreshold: 60000 },
    { ownerName: 'Laura Fernández', model: 'Cayenne' as const, variant: 'Cayenne Turbo GT', powertrain: 'ICE' as const, ageMonths: 8, currentMileage: 9000, mileageThreshold: 50000 },
    { ownerName: 'Tomás Hernández', model: 'Macan' as const, variant: 'Macan 4 Electric', powertrain: 'Electric' as const, ageMonths: 30, currentMileage: 45000, mileageThreshold: 50000 },
    { ownerName: 'Elena Grimaldi', model: 'Cayenne' as const, variant: 'Cayenne E-Hybrid', powertrain: 'Hybrid' as const, ageMonths: 36, currentMileage: 55000, mileageThreshold: 55000 },
    { ownerName: 'Luis Toral', model: 'Macan' as const, variant: 'Macan GTS', powertrain: 'ICE' as const, ageMonths: 28, currentMileage: 51000, mileageThreshold: 55000 },
    { ownerName: 'Camila Castillo', model: 'Cayenne' as const, variant: 'Cayenne', powertrain: 'ICE' as const, ageMonths: 50, currentMileage: 85000, mileageThreshold: 65000 },
  ];

  return vehicles.map((v, idx) => {
    const ageRatio = v.ageMonths / 36;
    const mileageRatio = v.currentMileage / v.mileageThreshold;
    const readiness = Math.max(ageRatio, mileageRatio);

    let status: 'Not Yet' | 'Approaching' | 'Ready';
    if (readiness >= 1.0) {
      status = 'Ready';
    } else if (readiness >= 0.85) {
      status = 'Approaching';
    } else {
      status = 'Not Yet';
    }

    return {
      id: `TF-${1001 + idx}`,
      ...v,
      status,
    };
  });
};
