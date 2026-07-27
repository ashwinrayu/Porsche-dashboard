export interface VehicleTelematics {
  vin: string;
  model: string;
  plate: string;
  mileage: number;
  wearBrakes: number;
  wearSuspension: number;
  wearFilters: number;
  predictedServiceNeeds: string;
  severity: 'Urgent' | 'Attention' | 'Good';
  lastSignalTime: string;
}

const PorscheModels = [
  "911 Carrera GTS", 
  "Taycan 4S", 
  "Cayenne E-Hybrid", 
  "Macan S", 
  "Panamera 4 E-Hybrid", 
  "718 Boxster GTS", 
  "911 Turbo S",
  "Cayenne Coupe S", 
  "Taycan Cross Turismo", 
  "Macan GTS"
];

const ServiceNeeds = [
  "Brake Pad Replacement", 
  "Air Suspension Re-calibration",
  "High Voltage Coolant Purge", 
  "Cabin Filter Renewal",
  "Front Axle Ball Joint Check", 
  "Spark Plug Replacement",
  "Tire Rotation & Alignment",
  "Brake Fluid Flush", 
  "System Diagnostic Review"
];

export const generateVehicleFleet = (): VehicleTelematics[] => {
  return PorscheModels.map((model, index) => {
    // Generate deterministic baseline mileage and wear, with runtime random fluctuations
    const mileage = Math.floor(8400 + (index * 4200) + Math.floor(Math.random() * 1200));
    const wearBrakes = Math.min(100, Math.floor(20 + (index * 9) % 75 + Math.random() * 8));
    const wearSuspension = Math.min(100, Math.floor(10 + (index * 13) % 70 + Math.random() * 10));
    const wearFilters = Math.min(100, Math.floor(30 + (index * 11) % 60 + Math.random() * 12));

    let severity: 'Urgent' | 'Attention' | 'Good' = 'Good';
    let predictedServiceNeeds = "Diagnostics Clear — All systems optimal";

    const maxWear = Math.max(wearBrakes, wearSuspension, wearFilters);
    if (maxWear >= 80) {
      severity = 'Urgent';
      if (maxWear === wearBrakes) predictedServiceNeeds = "Urgent: Front Brake Pad Replacement Required";
      else if (maxWear === wearSuspension) predictedServiceNeeds = "Urgent: Suspension Air-Bellow Pressure Loss";
      else predictedServiceNeeds = "Urgent: Air Intake Filter Blocked";
    } else if (maxWear >= 52) {
      severity = 'Attention';
      predictedServiceNeeds = ServiceNeeds[index % ServiceNeeds.length];
    }

    const randomMinutesAgo = Math.floor(Math.random() * 45) + 2;

    return {
      vin: `WP0AB2Y1${index}HS${109827 + index}`,
      model,
      plate: `G${398200 + index * 112 + Math.floor(Math.random() * 88)}`,
      mileage,
      wearBrakes,
      wearSuspension,
      wearFilters,
      predictedServiceNeeds,
      severity,
      lastSignalTime: `${randomMinutesAgo}m ago`
    };
  });
};
