export interface Lead {
  id: string;
  name: string;
  model: string;
  source: string;
  score: number;
  status: 'Hot' | 'Warm' | 'Cold';
  assignedAdvisor: string;
}

const DominicanNames = [
  "Alejandro Santana", 
  "Clarissa Peynado", 
  "Gustavo Tavárez", 
  "María Vásquez",
  "Luis Manuel Corripio", 
  "Isabella Vicini", 
  "Jean-Pierre Bellerose", 
  "Sofía Haché",
  "Ricardo Bonetti", 
  "Gabriela Hazoury", 
  "Carlos Manuel Grullón", 
  "Paola Messina",
  "Roberto Caminero", 
  "Elena Cabral", 
  "Emilio Armenteros"
];

const PorscheModels = [
  "911 Carrera GTS (992.2)", 
  "Taycan Turbo S", 
  "Cayenne Coupe E-Hybrid",
  "Macan Electric Turbo", 
  "718 Cayman GT4 RS", 
  "Panamera 4S E-Hybrid",
  "911 GT3 RS", 
  "Cayenne S SUV", 
  "Taycan 4S Cross Turismo"
];

const LeadSources = [
  "Showroom Santo Domingo", 
  "Web Configurator RD", 
  "VIP Tournament Casa de Campo",
  "Instagram Campaign", 
  "Referral", 
  "Porsche Club RD Event"
];

const Advisors = [
  "Eduardo Bisonó", 
  "Claudia Peynado", 
  "Rafael Santana", 
  "María Laura Díaz"
];

export const generateLeads = (): Lead[] => {
  return DominicanNames.map((name, index) => {
    // Generate a deterministic base score, with a small random jitter on load
    const baseScore = Math.floor(40 + (index * 4.7) % 55);
    const jitter = Math.floor(Math.random() * 11) - 5;
    const score = Math.max(15, Math.min(100, baseScore + jitter));
    
    let status: 'Hot' | 'Warm' | 'Cold' = 'Cold';
    if (score >= 75) status = 'Hot';
    else if (score >= 45) status = 'Warm';

    return {
      id: `L-${1000 + index}`,
      name,
      model: PorscheModels[index % PorscheModels.length],
      source: LeadSources[index % LeadSources.length],
      score,
      status,
      assignedAdvisor: Advisors[index % Advisors.length],
    };
  });
};
