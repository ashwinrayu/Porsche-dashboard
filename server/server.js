import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'porsche-secret-key-12345';

app.use(cors());
app.use(express.json());

// Serve built frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Helper to read database
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return null;
  }
}

// Helper to write database
async function writeDB(dbData) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database file:', err);
    return false;
  }
}

// Auth middleware
const authGuard = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No bearer token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: 'Database read error' });
  }

  const user = db.users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Sign JWT
  const token = jwt.sign(
    { username: user.username, name: user.name, role: user.role, showroom: user.showroom },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({
    token,
    user: {
      name: user.name,
      role: user.role,
      showroom: user.showroom
    }
  });
});

// Profile Route
app.get('/api/auth/profile', authGuard, (req, res) => {
  return res.json({ user: req.user });
});

// Overview Metrics Route
app.get('/api/overview/metrics', authGuard, async (req, res) => {
  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Generate live jitter on the fly
  const jitterLeads = Math.floor(Math.random() * 6) - 3; // +/- 3
  const activeLeadsCount = db.leads.length + 15 + jitterLeads; // baseline ~20

  const jitterTurnover = (Math.random() * 0.2 - 0.1);
  const partsTurnover = parseFloat((94.2 + jitterTurnover).toFixed(1));

  // Count unassigned deals in DB
  const unassignedCount = db.leads.filter(l => l.assignedAdvisor !== 'Eduardo Bisonó').length + 390; // baseline ~395

  return res.json({
    activeLeadsToday: activeLeadsCount,
    logisticsTurnover: partsTurnover,
    unassignedDeals: unassignedCount
  });
});

// Sales Leads Route
app.get('/api/sales/leads', authGuard, async (req, res) => {
  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Jitter lead scores slightly on the fly to show dynamic activity
  const dynamicLeads = db.leads.map(lead => {
    const jitter = Math.floor(Math.random() * 4) - 2; // +/- 2
    return {
      ...lead,
      score: Math.max(10, Math.min(99, lead.score + jitter))
    };
  });

  return res.json({ leads: dynamicLeads });
});

// Create Lead Route
app.post('/api/sales/leads', authGuard, async (req, res) => {
  const { name, model, source, score } = req.body;
  if (!name || !model || !source) {
    return res.status(400).json({ message: 'Name, model, and source are required.' });
  }

  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Calculate consecutive ID
  const lastLead = db.leads[db.leads.length - 1];
  let nextId = 'L-1005';
  if (lastLead && lastLead.id.startsWith('L-')) {
    const lastNum = parseInt(lastLead.id.split('-')[1]);
    nextId = `L-${lastNum + 1}`;
  }

  const newLead = {
    id: nextId,
    name,
    model,
    source,
    score: score || 50,
    status: score >= 80 ? 'Hot' : score >= 40 ? 'Warm' : 'Cold',
    assignedAdvisor: 'Unassigned',
    specs: {
      paint: 'GT Silver Metallic',
      wheels: '20/21-inch Carrera S Wheels',
      interior: 'Standard Interior in Black',
      packages: ['Sport Chrono Package']
    }
  };

  db.leads.push(newLead);
  const success = await writeDB(db);
  if (!success) return res.status(500).json({ message: 'Database write error' });

  return res.status(201).json({ lead: newLead });
});

// Assign Advisor Route
app.post('/api/sales/leads/assign', authGuard, async (req, res) => {
  const { leadId, advisorName } = req.body;
  if (!leadId || !advisorName) {
    return res.status(400).json({ message: 'Lead ID and Advisor Name are required.' });
  }

  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  const leadIndex = db.leads.findIndex(l => l.id === leadId);
  if (leadIndex === -1) {
    return res.status(404).json({ message: 'Lead not found.' });
  }

  db.leads[leadIndex].assignedAdvisor = advisorName;

  const success = await writeDB(db);
  if (!success) return res.status(500).json({ message: 'Database write error' });

  return res.json({ leadId, assignedAdvisor: advisorName });
});

// Update Configuration Route
app.post('/api/sales/leads/config', authGuard, async (req, res) => {
  const { leadId, specs } = req.body;
  if (!leadId || !specs) {
    return res.status(400).json({ message: 'Lead ID and specs configuration are required.' });
  }

  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  const leadIndex = db.leads.findIndex(l => l.id === leadId);
  if (leadIndex === -1) {
    return res.status(404).json({ message: 'Lead not found.' });
  }

  db.leads[leadIndex].specs = specs;

  const success = await writeDB(db);
  if (!success) return res.status(500).json({ message: 'Database write error' });

  return res.json({ leadId, specs });
});

// Logistics Inventory Route
app.get('/api/logistics/inventory', authGuard, async (req, res) => {
  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Jitter inventory stock slightly on the fly
  const dynamicInventory = db.inventory.map(part => {
    const jitter = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    const newStock = Math.max(1, part.stock + jitter);
    let newStatus = part.status;
    if (newStock <= part.predictedDemand * 0.35) newStatus = 'Critical';
    else if (newStock <= part.predictedDemand * 0.85) newStatus = 'Low';
    else newStatus = 'Normal';

    return {
      ...part,
      stock: newStock,
      status: newStatus
    };
  });

  return res.json({ inventory: dynamicInventory });
});

// Logistics Fleet Route
app.get('/api/logistics/fleet', authGuard, async (req, res) => {
  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Jitter vehicle wear metrics slightly
  const dynamicFleet = db.fleet.map(car => {
    const jitter = Math.random() * 0.2;
    return {
      ...car,
      wearBrakes: Math.min(100, parseFloat((car.wearBrakes + (Math.random() > 0.85 ? jitter : 0)).toFixed(1))),
      wearSuspension: Math.min(100, parseFloat((car.wearSuspension + (Math.random() > 0.85 ? jitter : 0)).toFixed(1))),
      wearFilters: Math.min(100, parseFloat((car.wearFilters + (Math.random() > 0.85 ? jitter : 0)).toFixed(1)))
    };
  });

  return res.json({ fleet: dynamicFleet, scheduledVins: db.scheduledVins || {} });
});

// Toggle vehicle service appointment persistence
app.post('/api/logistics/schedule', authGuard, async (req, res) => {
  const { vin } = req.body;
  if (!vin) return res.status(400).json({ message: 'VIN is required' });

  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  if (!db.scheduledVins) db.scheduledVins = {};
  db.scheduledVins[vin] = !db.scheduledVins[vin];

  const success = await writeDB(db);
  if (!success) return res.status(500).json({ message: 'Database write error' });

  return res.json({ vin, isScheduled: db.scheduledVins[vin] });
});

// Executive Radial Data
app.get('/api/exec/radial', authGuard, async (req, res) => {
  const db = await readDB();
  if (!db) return res.status(500).json({ message: 'Database error' });

  // Authentic colors for radial categories
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

  const radialCategories = categoryNames.map((name, idx) => {
    const baseVal = 12 + Math.floor(Math.sin(idx * 0.8) * 4) + Math.floor(Math.random() * 3);
    return {
      name,
      value: Math.max(5, baseVal),
      fill: radialColors[idx % radialColors.length]
    };
  });

  // Calculate other executive indicators dynamically
  const unassignedCount = db.leads.filter(l => l.assignedAdvisor !== 'Eduardo Bisonó').length + 390;
  const longestHours = 44 + Math.floor(Math.random() * 4); // ~46 hrs

  // Generate 30 days of queue volume history
  const queueVolumeHistory = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const baseVal = 140 + Math.sin(day * 0.4) * 35 + Math.cos(day * 0.25) * 15;
    const jitter = Math.floor(Math.random() * 12) - 6;
    return {
      day: `${day} Jul`,
      value: Math.max(80, Math.floor(baseVal + jitter))
    };
  });

  return res.json({
    unassignedDeals: unassignedCount,
    unassignedChangePct: -4.2,
    longestIdleHours: longestHours,
    longestIdleChangePct: 2.1,
    averageIdleRange: {
      minDays: 1.8,
      maxDays: 2.2,
      count: 10
    },
    queueVolumeHistory,
    radialCategories
  });
});

// SPA fallback — serve index.html for all non-API, non-static routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Porsche Backend API server is running on http://localhost:${PORT}`);
});
