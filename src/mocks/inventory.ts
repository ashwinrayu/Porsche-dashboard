export interface InventoryPart {
  id: string;
  name: string;
  category: 'Brakes' | 'Suspension' | 'Filters' | 'Electrical' | 'Engine';
  stock: number;
  predictedDemand: number;
  unit: string;
  customsEtaDays: number;
  status: 'Critical' | 'Low' | 'Normal';
}

export const generatePartsInventory = (): InventoryPart[] => {
  const baseParts: Omit<InventoryPart, 'stock' | 'predictedDemand' | 'status'>[] = [
    { id: 'P-101', name: 'Taycan HV Battery Module', category: 'Electrical', unit: 'units', customsEtaDays: 14 },
    { id: 'P-102', name: '911 PCCB Ceramic Brake Pads', category: 'Brakes', unit: 'sets', customsEtaDays: 9 },
    { id: 'P-103', name: 'Cayenne Active Air-Bellow', category: 'Suspension', unit: 'units', customsEtaDays: 12 },
    { id: 'P-104', name: 'Panamera Activated Carbon Filter', category: 'Filters', unit: 'units', customsEtaDays: 5 },
    { id: 'P-105', name: 'Macan EV Charging Inlet Port', category: 'Electrical', unit: 'units', customsEtaDays: 11 },
    { id: 'P-106', name: '718 Turbocharger Gasket', category: 'Engine', unit: 'packs', customsEtaDays: 6 }
  ];

  return baseParts.map(part => {
    // Generate slightly randomized stocks and demands
    const predictedDemand = Math.floor(18 + Math.random() * 20);
    // Create stock levels. We want some parts to be in critical or low states to make the dashboard look interesting.
    let stock = 0;
    if (part.id === 'P-101' || part.id === 'P-103') {
      // Intentionally low/critical stock
      stock = Math.floor(predictedDemand * 0.25) + Math.floor(Math.random() * 3);
    } else {
      stock = Math.floor(predictedDemand * 0.8) + Math.floor(Math.random() * 15);
    }

    let status: 'Critical' | 'Low' | 'Normal' = 'Normal';
    if (stock <= predictedDemand * 0.35) status = 'Critical';
    else if (stock <= predictedDemand * 0.85) status = 'Low';

    return {
      ...part,
      stock,
      predictedDemand,
      status
    };
  });
};
