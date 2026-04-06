# 🔥 FlavorQ — AI-Powered Digital Ordering & Personalization Platform

FlavorQ is a next-generation digital ordering experience built for **FireGrill**, a fictional national quick-service restaurant chain. The platform leverages contextual intelligence — including user preferences, time of day, weather conditions, and order history — to deliver a hyper-personalized ordering experience that drives customer satisfaction, increases average order value, and builds brand loyalty.

This project was built as a case study for the **Slalom Protogen Academy**, demonstrating accelerated product development using modern frontend technologies and AI-driven personalization concepts.

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Pages & Functionality](#pages--functionality)
- [Data & State Management](#data--state-management)
- [Charts & Visualizations](#charts--visualizations)
- [Theming & Design](#theming--design)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Context-Aware Recommendations** — Personalized menu suggestions based on time of day, simulated weather data, and user order history
- **Full Digital Ordering Flow** — Browse the menu, filter by category and dietary preferences, add items to a persistent cart, and check out
- **Real-Time Order Tracking** — Visual step-by-step order progress tracker with animated status indicators
- **Loyalty Rewards Dashboard** — Points balance, tier progression, redeemable rewards, and points activity history
- **Store Locator** — Search and filter nearby stores by services (drive-through, dine-in, mobile pickup) with a detail view
- **Taste Profile & Preferences** — Radar chart visualization of taste preferences, dietary filters, spice level slider, and order defaults
- **Interactive Data Visualizations** — Bar charts for trending items, line charts for points history, and radar charts for taste profiles
- **Responsive Design** — Fully responsive layout optimized for desktop (1200px+) and mobile (375px+)

---

## 📸 Screenshots

> _Screenshots can be added here after the application is built. Recommended screenshots:_
> - Home page with personalized picks
> - Menu page with filters and cart drawer
> - Active order tracker
> - Rewards dashboard
> - Taste profile radar chart

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.x | Frontend framework (Composition API with `<script setup>`) |
| [Vuetify 3](https://vuetifyjs.com/) | ^3.x | Material Design UI component library |
| [Vue Router](https://router.vuejs.org/) | ^4.x | Client-side routing |
| [Pinia](https://pinia.vuejs.org/) | ^2.x | State management |
| [Chart.js](https://www.chartjs.org/) | ^4.x | Charting and data visualization |
| [vue-chartjs](https://vue-chartjs.org/) | ^5.x | Vue 3 wrapper for Chart.js |
| [Material Design Icons](https://materialdesignicons.com/) | `@mdi/font` | Icon set |
| [Vite](https://vitejs.dev/) | ^5.x | Build tool and dev server |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** — v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** — v9.0.0 or higher (included with Node.js)

You can verify your installations by running:

```bash
node --version
npm --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flavorq.git
cd flavorq
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** (default Vite port).

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### 5. Preview the Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
flavorq/
├── public/                          # Static assets
├── src/
│   ├── App.vue                      # Root application component (layout, nav drawer, app bar, cart drawer)
│   ├── main.js                      # App entry point (plugin registration, Chart.js setup)
│   ├── plugins/
│   │   └── vuetify.js               # Vuetify configuration and custom theme
│   ├── router/
│   │   └── index.js                 # Vue Router route definitions
│   ├── stores/
│   │   ├── memberStore.js           # User profile, preferences, and tier data
│   │   ├── cartStore.js             # Shopping cart state and actions
│   │   ├── menuStore.js             # Menu items, filtering, and sorting
│   │   ├── orderStore.js            # Order history and active order tracking
│   │   └── rewardsStore.js          # Loyalty points, rewards, and transaction history
│   ├── views/
│   │   ├── HomeView.vue             # Dashboard with personalized picks, trending items, quick reorder
│   │   ├── MenuView.vue             # Full menu with category tabs, filters, and cart integration
│   │   ├── OrdersView.vue           # Active order tracker and order history table
│   │   ├── RewardsView.vue          # Loyalty dashboard, tier comparison, redeemable rewards
│   │   ├── StoreLocatorView.vue     # Store search, filtering, and detail view
│   │   └── PreferencesView.vue      # Dietary preferences, spice level, taste profile, order defaults
│   ├── data/
│   │   ├── member.json              # Mock user profile and preferences
│   │   ├── menu.json                # Mock menu items (20+ items across 5 categories)
│   │   ├── orders.json              # Mock order history (10+ orders)
│   │   ├── stores.json              # Mock store locations (8+ stores)
│   │   ├── rewards.json             # Mock rewards, points history, and monthly points data
│   │   └── trending.json            # Mock trending item data with hourly order counts
│   └── components/
│       ├── charts/
│       │   ├── TrendingItemChart.vue     # Bar chart — hourly orders for trending items
│       │   ├── PointsActivityChart.vue   # Line chart — monthly points earned over 12 months
│       │   └── TasteProfileChart.vue     # Radar chart — user taste profile vs average member
│       ├── cart/
│       │   └── CartDrawer.vue            # Right-side cart navigation drawer with order summary
│       ├── menu/
│       │   └── MenuItemCard.vue          # Reusable menu item card with emoji placeholder
│       ├── orders/
│       │   ├── ActiveOrderTracker.vue    # Stepper-based order progress tracker
│       │   └── OrderDetailDialog.vue     # Dialog showing full order details
│       └── home/
│           ├── PersonalizedPicks.vue     # Horizontal scrollable personalized recommendations
│           └── QuickReorder.vue          # Recent orders with one-click reorder
├── index.html                       # HTML entry point
├── package.json                     # Project metadata and dependencies
├── vite.config.js                   # Vite build configuration
├── PLAN.md                          # Detailed build plan for Copilot Agent
└── README.md                        # This file
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the application for production (output to `dist/`) |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run ESLint to check for code quality issues (if configured) |

---

## 📄 Pages & Functionality

### 🏠 Home (`/`)
The landing page provides a personalized experience with three main sections:
- **Personalized Picks** — A horizontally scrollable carousel of menu items recommended based on the current time of day and simulated weather conditions. Items are tagged with contextual labels like "Perfect for Sunny Days" or "Your Favorite."
- **Trending Now** — Three cards showing the most popular items at the user's nearest store, each with a mini bar chart displaying hourly order volume.
- **Quick Reorder** — The user's three most recent orders with a one-click "Reorder" button.

### 🍔 Menu & Order (`/menu`)
A full browsable menu with powerful filtering capabilities:
- **Category Tabs** — Filter by Burgers, Chicken, Sides, Drinks, and Desserts.
- **Dietary Filters** — Toggle chips for "Under 500 Cal", "Spicy", "Vegetarian", and "Gluten-Free."
- **Sort Options** — Sort by Recommended, Price, or Calories.
- **Cart Drawer** — A right-side drawer showing cart contents with quantity controls, item removal, subtotal/tax/total calculation, and a checkout button.

### 📦 My Orders (`/orders`)
- **Active Order Tracker** — When an order is in progress, a prominent stepper component shows real-time status (Order Placed → Preparing → Ready for Pickup → Picked Up) with an animated pulse on the current step.
- **Order History** — A sortable data table of past orders with status chips and a reorder action. Clicking an order opens a detail dialog with itemized charges and loyalty points earned.

### ⭐ Rewards (`/rewards`)
- **Tier Dashboard** — Current tier (Silver/Gold/Platinum), points balance, and progress bar toward the next tier.
- **Points Activity Chart** — A 12-month line chart showing points earned over time.
- **Tier Comparison** — Side-by-side cards comparing benefits across all three loyalty tiers.
- **Redeemable Rewards** — A grid of rewards with point costs and redemption buttons (disabled if insufficient points).
- **Points Timeline** — A chronological timeline of recent points transactions.

### 📍 Store Locator (`/stores`)
- **Search & Filter** — Search by zip code or city, and filter by services (Drive-Through, Dine-In, Mobile Pickup) and open status.
- **Results List** — Scrollable list of stores showing address, distance, hours, services, and open/closed status.
- **Map Placeholder** — A styled placeholder area representing where an interactive map would render, with a selected store detail overlay.

### ⚙️ My Preferences (`/preferences`)
- **Dietary Preferences** — Multi-select chip group for dietary restrictions.
- **Spice Level** — A slider from "None" to "Extra Hot 🔥🔥."
- **Favorites** — List of favorited menu items with the ability to unfavorite.
- **Order Defaults** — Default order type, default store, and notification toggles.
- **Taste Profile** — A radar chart comparing the user's taste profile (Savory, Sweet, Spicy, Salty, Sour, Umami) against the average member.

---

## 🗃️ Data & State Management

### Mock Data
All data is served from local JSON files in `/src/data/`. No external APIs or backend services are required. The mock data includes:
- **20+ menu items** across 5 categories with prices, calorie counts, dietary tags, and emoji placeholders
- **10+ historical orders** with itemized details, statuses, and loyalty points
- **8+ store locations** with addresses, hours, services, and open/closed status
- **12 months of loyalty points data** and 8+ points transactions
- **3 trending items** with hourly order volume data

### Pinia Stores
State management is handled by 5 Pinia stores:

| Store | Responsibility |
|---|---|
| `memberStore` | User profile, preferences, tier info, and preference updates |
| `cartStore` | Cart items, quantities, totals, tax calculation, and drawer toggle |
| `menuStore` | Menu items with reactive filtering by category, search, dietary tags, and sorting |
| `orderStore` | Order history, active order detection, and order status |
| `rewardsStore` | Points balance, transaction history, monthly points data, and redeemable rewards |

---

## 📊 Charts & Visualizations

All charts are built with [Chart.js](https://www.chartjs.org/) via the [vue-chartjs](https://vue-chartjs.org/) wrapper. The following Chart.js components are registered globally in `main.js`:

- `CategoryScale`
- `LinearScale`
- `RadialLinearScale` (required for Radar chart)
- `BarElement`
- `ArcElement`
- `PointElement`
- `LineElement`
- `Title`
- `Tooltip`
- `Legend`
- `Filler`

### Charts Used

| Chart | Type | Location | Description |
|---|---|---|---|
| Trending Item Orders | Bar | Home | Hourly order counts for 3 trending items |
| Points Earned Over Time | Line | Rewards | 12-month points accumulation with filled area |
| Taste Profile | Radar | Preferences | 6-axis taste comparison (user vs. average member) |

---

## 🎨 Theming & Design

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Primary | `#D84315` | Buttons, links, brand accent (deep orange) |
| Secondary | `#FF8F00` | Tags, highlights, secondary actions (amber) |
| Accent | `#4CAF50` | Success states, CTAs (green) |
| Error | `#C62828` | Error states, destructive actions |
| Warning | `#F9A825` | Warning states, pending statuses |
| Info | `#1565C0` | Informational elements |
| Success | `#2E7D32` | Positive states, confirmations |
| Background | `#FFF8F0` | Page background (warm off-white) |
| Surface | `#FFFFFF` | Card backgrounds |

### Design Principles
- **Warm & Inviting** — The warm color palette (oranges, ambers, off-white background) evokes the feeling of a friendly restaurant brand.
- **Food Emoji Placeholders** — Since no real images are used, large food emojis (🍔, 🌮, 🥗, etc.) on colored backgrounds serve as visual placeholders for menu items. Each category has a distinct background color.
- **Material Design** — All components follow Material Design 3 guidelines via Vuetify 3.
- **Consistent Iconography** — All icons use the Material Design Icons (`@mdi/font`) library exclusively.

---

## 🌐 Browser Support

| Browser | Supported |
|---|---|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| Internet Explorer | ❌ Not supported |

---

## 🤝 Contributing

This project was built as a Protogen Academy case study. If you'd like to extend or improve it:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

### Code Style Guidelines
- Use Vue 3 Composition API with `<script setup>` syntax
- Use Vuetify components for all UI elements
- Use MDI icons exclusively (`@mdi/font`)
- Follow the existing file and folder structure
- Keep components focused and reusable

---

## 📄 License

This project is for educational and demonstration purposes as part of the Slalom Protogen Academy. It is not intended for commercial use.

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Slalom](https://www.slalom.com/) — Protogen Academy program
- [Vuetify](https://vuetifyjs.com/) — Material Design component framework
- [Chart.js](https://www.chartjs.org/) — Charting library
- [Material Design Icons](https://materialdesignicons.com/) — Icon library
```