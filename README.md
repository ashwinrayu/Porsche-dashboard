# Deemsys.ai — AutoEuropa Command Center Dashboard

An elegant, high-fidelity sales-demo prototype dashboard designed for **Porsche Center Santo Domingo** (Dominican Republic). This frontend-only application demonstrates an AI-driven dealership operations command center, integrating lead scoring pipelines, connected car telematics, and predictive inventory logistics.

## Project Vision & Pillars

1. **Overview**: Holistic monitoring showing live-updated operational KPIs (Lead Conversion Rate, After-Sales Retention, Parts Turnover, and Administrative Automation) alongside a structured 4-phase rollout timeline.
2. **Sales & Conversion (Pillar 1)**: Interactive lead scoring CRM board, simulated AI configuration persona routing (e.g. Corporate EV Enthusiast vs. VIP Collectors), and a 24/7 Virtual Concierge chat assistant matching local Dominican dealer details.
3. **Logistics & After-Sales (Pillar 2)**: Direct vehicle telematics feed tracking real-time diagnostic wear indexes (brakes, filters, air suspension) paired with an interactive Parts Recognition Computer Vision module and DGA (Dirección General de Aduanas) customs ETA tracking.
4. **Executive Intelligence (Pillar 3)**: Unified dashboard illustrating municipal deal density routing queues via concentric radial bar charts, average deal idle-time gauges, and live deal activity sparklines.

---

## Design System

The application utilizes a dark luxury theme inspired by high-end automotive design:
- **Background**: Deep ocean navy gradients (`#050B14` to `#0A1220`) representing carbon aesthetics.
- **Accents**: Cyber cyan (`#22D3EE`) and neon teal (`#2DD4BF`) denoting active AI operations.
- **Jewel Accents**: Desaturated indigo, violet, gold, and ruby tones for category indicators.
- **Micro-interactions**: Subtle hover state glows (`porsche-card-glow`), scanning animations, and smooth chart transitions.
- **Branding**: Displays the generic "AutoEuropa" name and Santo Domingo localization tag.

---

## Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Data Visualization**: Recharts (RadialBarChart, AreaChart, BarChart, LineChart)
- **Icons**: Lucide React
- **Client Routing**: React Router DOM (HashRouter for reload safety)

---

## Running Locally

Follow these steps to install dependencies and boot the local hot-reloading development server:

1. **Clone or Navigate** to the project workspace.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

*Note: All backend functions, databases, and APIs are mocked locally inside `src/mocks/` with randomized jitter intervals to simulate live system integration. No real personal customer data is stored or transmitted.*
