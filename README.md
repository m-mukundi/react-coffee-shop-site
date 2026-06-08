# Coffee R Us

A modern, full-featured coffee e-commerce storefront built with React and Vite. Browse specialty roasts by origin and roast level, view detailed product pages, and manage the product catalog through a built-in admin portal.

## Live Demo

> **Deployed App:** _[Add deployed link here]_

---

## Features

- **Home Page** — Hero section with store info and featured roasts
- **Shop Page** — Full product catalog with search and filter by origin and roast level
- **Product Detail Page** — Individual product view with full description and details
- **Admin Portal** — Add new products, edit existing ones, and delete products from the catalog
- **Persistent State** — Product data managed via `json-server` REST API backed by `db.json`

## Tech Stack

| Tool              | Purpose                       |
| ----------------- | ----------------------------- |
| React 19          | UI framework                  |
| React Router v7   | Client-side routing           |
| Vite              | Build tool and dev server     |
| Tailwind CSS      | Utility-first styling         |
| json-server       | Local REST API / mock backend |
| React Context API | Global state management       |

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AddProductForm.jsx   # Form to create a new product
│   │   └── ProductEditCard.jsx  # Inline edit/delete for existing products
│   ├── FilterSidebar.jsx        # Origin and roast filter panel
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── NavBar.jsx
│   ├── ProductCard.jsx          # Product grid card
│   └── SearchBar.jsx
├── context/
│   └── StoreContext.jsx         # Global state — coffees, store info, CRUD actions
├── hooks/
│   └── useProducts.js           # Search and filter logic
├── pages/
│   ├── AdminPage.jsx
│   ├── HomePage.jsx
│   ├── ProductDetailPage.jsx
│   └── ShopPage.jsx
├── App.jsx
└── main.jsx
db.json                          # json-server data source
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/m-mukundi/react-coffee-shop-site.git
cd react-coffee-shop-site

# Install dependencies
npm install
```

### Running Locally

The app requires **two terminals** running simultaneously — one for the frontend and one for the mock API.

**Terminal 1 — Start the JSON Server (API):**

```bash
npm run server
```

This starts json-server on `http://localhost:3001`.

**Terminal 2 — Start the Dev Server (Frontend):**

```bash
npm run dev
```

This starts the Vite dev server, typically on `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

## Routes

| Path            | Page            |
| --------------- | --------------- |
| `/`             | Home            |
| `/shop`         | Product catalog |
| `/products/:id` | Product detail  |
| `/admin`        | Admin portal    |

## Author

Mercy Mukundi
