
# PLAN.md — FlavorQ: AI-Powered Digital Ordering & Personalization Platform

## Overview

FlavorQ is an AI-powered digital ordering and personalization platform for a fictional quick-service restaurant chain called "FireGrill." The app provides a smart ordering experience that personalizes menu recommendations based on user preferences, time of day, weather conditions, and order history. It also includes a real-time order tracker, loyalty rewards dashboard, and store locator. The app is built with Vue 3, Vuetify 3, Material Design Icons, and Chart.js.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **UI Library:** Vuetify 3
- **Icons:** Material Design Icons (`@mdi/font`)
- **Charts:** Chart.js via `vue-chartjs`
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **Build Tool:** Vite
- **Mock Data:** Local JSON files in `/src/data/`

---

## Project Setup Instructions

1. Scaffold a new Vue 3 project using Vite:
   ```bash
   npm create vite@latest flavorq -- --template vue
   cd flavorq
   ```
2. Install dependencies:
   ```bash
   npm install vuetify@^3 @mdi/font vue-router@^4 pinia chart.js vue-chartjs
   ```
3. Configure Vuetify in `src/plugins/vuetify.js`:
   - Import Vuetify, its styles, and the MDI font CSS.
   - Use a custom light theme with the colors defined in the Theme Configuration section below.
4. Configure Vue Router in `src/router/index.js`.
5. Configure Pinia in `src/stores/`.
6. Register all plugins in `src/main.js`.

---

## Vuetify Theme Configuration

### File: `/src/plugins/vuetify.js`

```js
const customTheme = {
  dark: false,
  colors: {
    primary: '#D84315',
    secondary: '#FF8F00',
    accent: '#4CAF50',
    error: '#C62828',
    warning: '#F9A825',
    info: '#1565C0',
    success: '#2E7D32',
    background: '#FFF8F0',
    surface: '#FFFFFF',
  },
}
```

---

## Application Layout

### File: `src/App.vue`

- Use `<v-app>` as the root wrapper.
- Include a `<v-app-bar>` at the top with:
  - A hamburger menu icon (`mdi-menu`) on the far left that toggles the navigation drawer on mobile.
  - The app logo/name "🔥 FlavorQ" on the left side (after the hamburger icon).
  - A `<v-spacer>` in the middle.
  - A cart icon (`mdi-cart-outline`) with a `<v-badge>` showing the number of items in the cart on the right side.
  - A user avatar (`<v-avatar>` with `mdi-account-circle` icon) with the name "Alex R." on the far right.
- Include a persistent `<v-navigation-drawer>` on the left side with the following nav items (each with an MDI icon):
  - Home (`mdi-home`)
  - Menu & Order (`mdi-food`)
  - My Orders (`mdi-receipt-text-outline`)
  - Rewards (`mdi-star-circle-outline`)
  - Store Locator (`mdi-map-marker-radius`)
  - My Preferences (`mdi-tune-variant`)
- At the bottom of the navigation drawer, display a small "Context Bar" inside a `<v-card>` with `color="grey-lighten-3"` showing simulated real-time context:
  - Weather: "☀️ 78°F Sunny"
  - Time of Day: dynamically computed as "Morning", "Afternoon", or "Evening" based on the current hour
  - Nearest Store: "FireGrill — Downtown"
- The main content area uses `<v-main>` with a `<router-view>`.

---

## Pages & Components

### Page 1: Home

#### File: `src/views/HomeView.vue`

- **Hero Banner:**
  - A `<v-card>` with a warm gradient background (primary to secondary) displaying: "Welcome back, Alex! 🔥" as the title and "Ready for something delicious? Here's what we think you'll love today." as the subtitle.
  - A large `<v-btn>` "Order Now" with icon `mdi-silverware-fork-knife`, color accent, size x-large, that routes to the Menu page.

- **Personalized Picks Section:**
  - Title: "Picked For You" with subtitle: "Based on your favorites, the weather, and time of day"
  - A horizontal scrollable row using `<v-slide-group>` containing 6 `<v-card>` items, each showing:
    - A colored placeholder div (height 150px) with a large centered food emoji as the image placeholder (e.g., 🍔, 🌮, 🥗, 🍟, 🥤, 🍦)
    - Item name (bold)
    - A `<v-chip>` tag like "Your Favorite", "Trending", "New", or "Perfect for Sunny Days" — color secondary, size small
    - Price
    - Calorie count in a subtle caption
    - `<v-btn>` "Add to Cart" (outlined, color primary, size small)
  - Data comes from a computed property that selects items from the menu based on mock logic (e.g., if time is afternoon, suggest lunch items; if weather is sunny, suggest cold drinks).

- **Trending Now Section:**
  - Title: "Trending at Your Store 📈"
  - A `<v-row>` with three `<v-col cols="12" md="4">` cards, each showing:
    - Item name
    - "Ordered X times today" subtitle
    - A small `<Bar>` chart (vue-chartjs) showing orders per hour for that item over the last 6 hours. X-axis: hours (e.g., "10am", "11am", "12pm", "1pm", "2pm", "3pm"). Y-axis: order count. Use primary color. Chart height should be 120px.

- **Quick Reorder Section:**
  - Title: "Order Again"
  - A `<v-list>` showing Alex's last 3 orders with: order date, list of items as `<v-chip>` components, total price, and a `<v-btn>` "Reorder" with icon `mdi-replay`, color primary, variant outlined.

---

### Page 2: Menu & Order

#### File: `src/views/MenuView.vue`

- **Category Tabs:**
  - Use `<v-tabs>` at the top of the page with the following categories (each with an icon):
    - All (`mdi-silverware-variant`)
    - Burgers (`mdi-hamburger`)
    - Chicken (`mdi-food-drumstick`)
    - Sides (`mdi-french-fries`)
    - Drinks (`mdi-cup`)
    - Desserts (`mdi-ice-cream`)
  - Selecting a tab filters the displayed menu items by category.

- **Search & Filter Bar:**
  - A `<v-row>` containing:
    - `<v-text-field>` with label "Search the menu..." and prepend-inner-icon `mdi-magnify`.
    - `<v-chip-group>` with filter chips: "Under 500 Cal", "Spicy 🌶️", "Vegetarian 🌱", "Gluten-Free". Chips should be toggleable (use `filter` and `v-model`).
    - `<v-select>` for Sort By: "Recommended", "Price: Low to High", "Price: High to Low", "Calories: Low to High".

- **Menu Grid:**
  - Use `<v-row>` and `<v-col cols="12" sm="6" md="4" lg="3">` to display menu item cards.
  - Each menu item card (`<v-card>`) shows:
    - A colored placeholder div (height 180px, rounded top corners) with a large centered food emoji and a subtle background color unique to each category (burgers = warm red, chicken = golden, sides = orange, drinks = blue, desserts = pink)
    - Item name (bold, `text-h6`)
    - Description (2 lines max, `text-caption`, `class="text-grey"`)
    - A row of `<v-chip>` tags for attributes: "Spicy 🌶️", "Vegetarian 🌱", "Gluten-Free", "Popular" — only shown if applicable, size x-small
    - Price (bold, color primary)
    - Calorie count (`text-caption`)
    - A `<v-btn>` "Add to Cart" with icon `mdi-plus`, color primary
    - If the item is in the member's favorites, show a filled heart icon (`mdi-heart`, color error) in the top-right corner of the card; otherwise show `mdi-heart-outline`
  - Populate with at least 20 menu items from `/src/data/menu.json`.

- **Filter Logic:**
  - Implement reactive filtering using `computed` properties in the component. Filter by: active tab category, search text (matching name or description), selected dietary chips, and sort order.

- **Cart Sidebar:**
  - A `<v-navigation-drawer>` anchored to the right side, toggled by clicking the cart icon in the app bar.
  - Title: "Your Cart" with item count.
  - List of cart items using `<v-list>`, each showing: item name, quantity with `<v-btn icon>` for increment (`mdi-plus`) and decrement (`mdi-minus`), line item price, and a remove button (`mdi-delete-outline`).
  - **Order Summary** at the bottom:
    - Subtotal
    - Tax (8.5%)
    - Estimated Total
    - `<v-btn>` "Checkout" (block, color primary, size large, icon `mdi-cash-register`)
  - If the cart is empty, show an empty state with icon `mdi-cart-off` and text "Your cart is empty. Browse the menu to get started!"

---

### Page 3: My Orders

#### File: `src/views/OrdersView.vue`

- **Page Title:** "My Orders"

- **Active Order Tracker (shown only if there is an active order):**
  - A prominent `<v-card>` with `color="primary"` variant `tonal` at the top of the page.
  - Title: "Order #FG-20260406-0042 — In Progress"
  - A `<v-stepper>` (horizontal, non-editable) showing the order stages:
    1. "Order Placed" — `mdi-check-circle` — completed
    2. "Preparing" — `mdi-chef-hat` — current/active (show animated pulse effect using a CSS class)
    3. "Ready for Pickup" — `mdi-package-variant-closed` — upcoming
    4. "Picked Up" — `mdi-hand-wave` — upcoming
  - Below the stepper: "Estimated ready in: **8 minutes**" and the store name "FireGrill — Downtown".
  - A `<v-btn>` "Cancel Order" (variant text, color error).

- **Order History:**
  - Use `<v-data-table>` with columns: Order ID, Date, Items (shown as comma-separated list), Total, Status, and Actions.
  - Status column uses `<v-chip>`:
    - Completed = success
    - In Progress = warning
    - Cancelled = error
  - Actions column has a `<v-btn>` "Reorder" (icon `mdi-replay`, variant text, color primary) for each completed order.
  - Populate with at least 10 rows of mock data from `/src/data/orders.json`.
  - Enable sorting on Date and Total columns.

- **Order Detail Dialog:**
  - Clicking an Order ID opens a `<v-dialog>` showing:
    - Order ID, date, store location
    - Itemized list with quantities, individual prices, and item totals
    - Subtotal, tax, tip, and grand total
    - Payment method (e.g., "Visa ending in 4821")
    - Loyalty points earned for this order

---

### Page 4: Rewards

#### File: `src/views/RewardsView.vue`

- **Rewards Hero Card:**
  - A `<v-card>` with gradient background (secondary to primary) showing:
    - "🔥 FireGrill Rewards" title
    - Current tier: "Gold Member" with icon `mdi-medal` in a `<v-chip>` color warning
    - Points balance: "2,480 points" (large, bold)
    - A `<v-progress-linear>` showing progress to the next tier: "520 points to Platinum" — value 82%, color accent
    - Member since: "March 2024"

- **Points Activity Chart:**
  - A `<v-card>` titled "Points Earned Over Time"
  - A `<Line>` chart (vue-chartjs) showing monthly points earned over the last 12 months. X-axis: "May '25" through "Apr '26". Y-axis: points. Data: [180, 220, 150, 310, 280, 420, 350, 290, 380, 410, 320, 480]. Color: primary. Fill area under the line with a semi-transparent version of primary.

- **Tier Benefits Comparison:**
  - A `<v-row>` with three `<v-col cols="12" md="4">` cards representing tiers:
    1. **Silver** — `mdi-medal-outline`, color `grey`
       - Free drink on birthday
       - 1x points multiplier
       - Access to member-only deals
    2. **Gold** (current — highlight with `border` and `elevation="8"`) — `mdi-medal`, color `warning`
       - All Silver benefits
       - 1.5x points multiplier
       - Free side with every 5th order
       - Early access to new menu items
    3. **Platinum** — `mdi-trophy`, color `primary`
       - All Gold benefits
       - 2x points multiplier
       - Free entrée every month
       - Priority pickup lane
       - Exclusive seasonal tastings

- **Available Rewards:**
  - Title: "Redeem Your Points"
  - A `<v-row>` with `<v-col cols="12" sm="6" md="3">` cards for redeemable rewards:
    1. Free Medium Drink — 200 pts — `mdi-cup`
    2. Free Side — 350 pts — `mdi-french-fries`
    3. Free Entrée — 800 pts — `mdi-hamburger`
    4. Free Combo Meal — 1200 pts — `mdi-food`
    5. $10 Off Order — 1000 pts — `mdi-tag`
    6. Branded Merch — 1500 pts — `mdi-tshirt-crew`
    7. Donate to Charity — 500 pts — `mdi-hand-heart`
    8. Mystery Reward — 2000 pts — `mdi-gift`
  - Each card shows the reward name, point cost, icon, and a `<v-btn>` "Redeem" (color primary). If the member doesn't have enough points, the button should be disabled and show "Need X more pts" as the button text.

- **Recent Points Activity:**
  - A `<v-card>` with a `<v-timeline>` showing the last 8 points transactions:
    - Each entry shows: date, description (e.g., "Order #FG-20260403-0038"), points earned or redeemed (green `<v-chip>` for earned with `mdi-plus`, red `<v-chip>` for redeemed with `mdi-minus`).

---

### Page 5: Store Locator

#### File: `src/views/StoreLocatorView.vue`

- **Search Bar:**
  - A `<v-card>` containing:
    - `<v-text-field>` with label "Enter zip code or city" and prepend-inner-icon `mdi-map-search`.
    - `<v-chip-group>` with filter chips: "Open Now", "Drive-Through", "Dine-In", "Mobile Pickup". Use `filter` and `v-model`.
    - `<v-btn>` "Find Stores" with icon `mdi-magnify`, color primary.

- **Store Results:**
  - A `<v-row>`:
    - Left column (`<v-col cols="12" md="5">`): A scrollable `<v-list>` of store results.
      - Each store item shows:
        - Store name (bold)
        - Address with icon `mdi-map-marker`
        - Distance (e.g., "0.8 mi") with icon `mdi-walk`
        - Hours with icon `mdi-clock-outline`
        - Available services as `<v-chip>` components (size x-small): "Drive-Through", "Dine-In", "Mobile Pickup"
        - Open/Closed status: `<v-chip>` color success for "Open Now", color error for "Closed"
        - `<v-btn>` "Order from Here" (outlined, color primary, size small)
        - `<v-btn>` "Get Directions" (text, color info, size small, icon `mdi-directions`)
      - Highlight the currently selected store with `active` state.
    - Right column (`<v-col cols="12" md="7">`): A placeholder map area.
      - Use a `<v-card>` with `height="500px"` and a `color="grey-lighten-2"` background.
      - Center the text "🗺️ Map View" and subtitle "Interactive map would render here" inside the card.
      - Below the placeholder text, show the selected store's details in a `<v-card>` overlay at the bottom of the map area, including: store name, full address, phone number, today's hours, and a `<v-btn>` "Start Order" (color primary).
  - Populate with at least 8 mock stores from `/src/data/stores.json`.

- **Filter Logic:**
  - Implement reactive filtering using `computed` properties. Filter stores by search text (matching name, address, or zip) and by selected service chips (Drive-Through, Dine-In, etc.). "Open Now" filter should check against mock `openHours` data.

---

### Page 6: My Preferences

#### File: `src/views/PreferencesView.vue`

- **Page Title:** "My Preferences" with subtitle "Help us personalize your experience"

- **Dietary Preferences:**
  - A `<v-card>` titled "Dietary Preferences" with icon `mdi-leaf`.
  - A `<v-chip-group>` with multiple selectable chips (use `multiple` and `v-model`):
    - "No Restrictions", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Low Carb", "Keto", "Halal"
  - Selected chips should be color accent.

- **Spice Preference:**
  - A `<v-card>` titled "Spice Level" with icon `mdi-fire`.
  - A `<v-slider>` with min 0, max 4, step 1, tick-labels: ["None", "Mild", "Medium", "Hot 🌶️", "Extra Hot 🔥🔥"]. Color primary. `v-model` bound to a reactive ref with default value 2.

- **Favorite Items:**
  - A `<v-card>` titled "Your Favorites" with icon `mdi-heart`.
  - A `<v-list>` of the member's 5 favorite items (from mock data), each with: item name, category chip, and a `<v-btn>` icon `mdi-heart` (color error) to unfavorite.
  - A `<v-btn>` "Browse Menu to Add More" (text, color primary) that routes to the Menu page.

- **Order Preferences:**
  - A `<v-card>` titled "Order Defaults" with icon `mdi-cog`.
  - `<v-select>` for Default Order Type: "Pickup", "Drive-Through", "Dine-In". Default: "Pickup".
  - `<v-select>` for Default Store: list of store names from stores.json. Default: "FireGrill — Downtown".
  - `<v-switch>` for "Send me order status notifications" — default on, color primary.
  - `<v-switch>` for "Enable personalized recommendations" — default on, color primary.
  - `<v-switch>` for "Share order history for better suggestions" — default on, color primary.

- **Taste Profile Chart:**
  - A `<v-card>` titled "Your Taste Profile" with icon `mdi-chart-radar-variant`.
  - A `<Radar>` chart (vue-chartjs) showing the member's taste preferences across 6 axes: "Savory", "Sweet", "Spicy", "Salty", "Sour", "Umami". Data: [85, 60, 70, 75, 40, 90]. Color: primary with semi-transparent fill. Include a second dataset for "Average Member" with data: [70, 70, 50, 65, 55, 60] in grey with semi-transparent fill.

- **Save Button:**
  - A `<v-btn>` "Save Preferences" (block, color primary, size large, icon `mdi-content-save`) at the bottom of the page.
  - On click, show a `<v-snackbar>` with text "Preferences saved! Your experience will be updated." color success, timeout 3000.

---

## Mock Data Files

### File: `/src/data/member.json`
```json
{
  "name": "Alex R.",
  "memberId": "FG-MEM-90421",
  "tier": "Gold",
  "points": 2480,
  "pointsToNextTier": 520,
  "memberSince": "2024-03-15",
  "defaultStore": "FireGrill — Downtown",
  "defaultOrderType": "Pickup",
  "dietaryPreferences": ["Low Carb"],
  "spiceLevel": 2,
  "favoriteItemIds": [1, 5, 8, 12, 17]
}
```

### File: `/src/data/menu.json`
- Array of at least 20 menu item objects with fields: `id`, `name`, `description`, `category` (one of: "Burgers", "Chicken", "Sides", "Drinks", "Desserts"), `price` (number), `calories` (number), `tags` (array of strings like "Spicy", "Vegetarian", "Gluten-Free", "Popular"), `emoji` (a single food emoji for the placeholder image), `bgColor` (hex color for the placeholder background).

### File: `/src/data/orders.json`
- Array of at least 10 order objects with fields: `orderId`, `date`, `storeName`, `items` (array of `{ name, quantity, price }`), `subtotal`, `tax`, `tip`, `total`, `status` (one of: "Completed", "In Progress", "Cancelled"), `pointsEarned`, `paymentMethod`.
- The first order in the array should have `status: "In Progress"` with `orderId: "FG-20260406-0042"` to power the active order tracker.

### File: `/src/data/stores.json`
- Array of at least 8 store objects with fields: `id`, `name`, `address`, `city`, `zip`, `phone`, `distance` (string like "0.8 mi"), `hours` (string like "6:00 AM – 11:00 PM"), `isOpen` (boolean), `services` (array of strings: "Drive-Through", "Dine-In", "Mobile Pickup"), `lat`, `lng`.

### File: `/src/data/rewards.json`
- Object containing:
  - `pointsHistory`: array of at least 8 transaction objects with `date`, `description`, `points` (positive for earned, negative for redeemed), `type` ("earned" or "redeemed")
  - `monthlyPoints`: array of 12 numbers representing points earned each month from May 2025 to April 2026
  - `redeemableRewards`: array of reward objects with `name`, `pointsCost`, `icon`, `description`

### File: `/src/data/trending.json`
- Array of 3 trending item objects with fields: `name`, `ordersToday` (number), `hourlyOrders` (array of 6 numbers representing orders per hour for the last 6 hours).

---

## Pinia Stores

### File: `/src/stores/memberStore.js`
- State: `member` (loaded from `member.json`)
- Getters: `tierProgressPercentage`, `initials`, `canRedeem(pointsCost)` (returns boolean)
- Actions: `updatePreferences(prefs)` — merges new preferences into member state

### File: `/src/stores/cartStore.js`
- State: `items` (array of `{ menuItem, quantity }`), `isDrawerOpen` (boolean)
- Getters: `itemCount`, `subtotal`, `tax` (8.5% of subtotal), `total`, `isEmpty`
- Actions: `addItem(menuItem)` — adds item or increments quantity if already in cart, `removeItem(menuItemId)`, `incrementQuantity(menuItemId)`, `decrementQuantity(menuItemId)` — removes item if quantity reaches 0, `clearCart()`, `toggleDrawer()`

### File: `/src/stores/menuStore.js`
- State: `menuItems` (loaded from `menu.json`), `searchQuery`, `activeCategory` ("All" by default), `dietaryFilters` (array), `sortBy` ("Recommended" by default)
- Getters: `filteredItems` — applies all filters and sorting, `categories` — returns unique category list

### File: `/src/stores/orderStore.js`
- State: `orders` (loaded from `orders.json`)
- Getters: `activeOrder` — returns the first order with status "In Progress" or null, `completedOrders`, `orderHistory`

### File: `/src/stores/rewardsStore.js`
- State: `rewards` (loaded from `rewards.json`), `monthlyPoints`, `pointsHistory`
- Getters: `redeemableRewards` — returns rewards with a `canRedeem` boolean based on member points

---

## Router Configuration

### File: `/src/router/index.js`

Define the following routes:

| Path | Name | Component |
|---|---|---|
| `/` | Home | `HomeView.vue` |
| `/menu` | Menu | `MenuView.vue` |
| `/orders` | Orders | `OrdersView.vue` |
| `/rewards` | Rewards | `RewardsView.vue` |
| `/stores` | Stores | `StoreLocatorView.vue` |
| `/preferences` | Preferences | `PreferencesView.vue` |

---

## File Structure Summary

```
flavorq/
├── public/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── plugins/
│   │   └── vuetify.js
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── memberStore.js
│   │   ├── cartStore.js
│   │   ├── menuStore.js
│   │   ├── orderStore.js
│   │   └── rewardsStore.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── MenuView.vue
│   │   ├── OrdersView.vue
│   │   ├── RewardsView.vue
│   │   ├── StoreLocatorView.vue
│   │   └── PreferencesView.vue
│   ├── data/
│   │   ├── member.json
│   │   ├── menu.json
│   │   ├── orders.json
│   │   ├── stores.json
│   │   ├── rewards.json
│   │   └── trending.json
│   └── components/
│       ├── charts/
│       │   ├── TrendingItemChart.vue
│       │   ├── PointsActivityChart.vue
│       │   └── TasteProfileChart.vue
│       ├── cart/
│       │   └── CartDrawer.vue
│       ├── menu/
│       │   └── MenuItemCard.vue
│       ├── orders/
│       │   ├── ActiveOrderTracker.vue
│       │   └── OrderDetailDialog.vue
│       └── home/
│           ├── PersonalizedPicks.vue
│           └── QuickReorder.vue
├── package.json
├── vite.config.js
└── PLAN.md
```

---

## Additional Instructions for Copilot Agent

1. **Do not use any external APIs.** All data should come from the local JSON files in `/src/data/`.
2. **All components must use Vue 3 Composition API** with `<script setup>` syntax.
3. **All icons must use MDI** (e.g., `mdi-home`) via the `@mdi/font` package — do not use any other icon set.
4. **Charts must use `vue-chartjs`** with `chart.js` registered globally. Register `Chart.js` components (CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend, Filler) in `main.js` or in each chart component. Note: the Radar chart on the Preferences page requires `RadialLinearScale`.
5. **Responsive design:** All pages must look good on both desktop (1200px+) and mobile (375px+). Use Vuetify's grid system (`v-row`, `v-col`) with appropriate breakpoint props.
6. **No placeholder content.** Every card, table, list, and chart must be populated with realistic mock data.
7. **Navigation drawer** should highlight the active route using Vue Router's current route name.
8. **Consistent spacing:** Use `class="pa-4"` or `class="ma-4"` for card padding/margins. Use `class="mb-6"` between major sections.
9. **Cart functionality must be global.** The cart drawer in `CartDrawer.vue` should be included in `App.vue` and controlled by the `cartStore`. The cart icon badge in the app bar should reactively update.
10. **Food emoji placeholders:** Since we are not using real images, use large food emojis (font-size 64px) centered on colored background divs as visual placeholders for menu items. Each category should have a distinct background color.
11. **Context-aware recommendations on the Home page:** The "Picked For You" section should use simple logic — check the current hour (`new Date().getHours()`) and the mock weather to select appropriate items (e.g., cold drinks if sunny and afternoon, hearty items if evening).
12. **Active order tracker animation:** Add a simple CSS `@keyframes pulse` animation to the current step icon in the order stepper to draw attention to the active stage.
```
