# Meals Explorer

Meals Explorer adalah aplikasi frontend berbasis `Next.js` untuk menampilkan daftar ingredient, daftar meal berdasarkan ingredient, dan detail meal dari API [TheMealDB](https://www.themealdb.com/api.php).

Project ini dibuat dengan fokus pada:

- UI modern dan responsive
- struktur folder yang rapi dan mudah di-audit
- penggunaan `shadcn/ui`, `@tanstack/react-query`, dan `axios`

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `shadcn/ui`
- `@tanstack/react-query`
- `axios`

## Fitur

- Halaman `Ingredients`
- Search ingredient di sisi frontend
- Filter chip ingredient type di sisi frontend
- Pagination di halaman ingredient agar rendering tetap ringan
- Halaman `Ingredients Detail` berdasarkan ingredient terpilih
- Search meal di sisi frontend
- Pagination di halaman meal agar tidak lag
- Halaman `Meal Detail`
- Embedded YouTube tutorial jika tersedia
- Responsive untuk desktop, tablet, dan mobile

## API Endpoint

- List Ingredients:
  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Filter by Ingredient:
  `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`
- Meal Detail:
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`

## Cara Menjalankan Project

Pastikan environment sudah memiliki:

- `Node.js 20+`
- `npm 10+`

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Project akan berjalan di:

```bash
http://localhost:3000
```

## Build Production

Untuk memastikan project siap dijalankan reviewer atau untuk audit:

```bash
npm run format
npm run lint
npm run build
npm run start
```

Jika ingin hanya menjalankan hasil production build:

```bash
npm run build
npm run start
```

## Langkah Audit Setelah Clone Repository

Setelah clone repository, langkah minimum agar project bisa langsung diperiksa:

```bash
git clone <repository-url>
cd cmlabs-frontend-parttime-test
npm install
npm run dev
```

Langkah validasi tambahan:

```bash
npm run format
npm run lint
```

## Struktur Project

```bash
src/
  app/                    # App Router pages
  components/
    layout/               # Navbar, footer, shell, pagination
    providers/            # Global providers
    ui/                   # shadcn/ui components
  features/
    ingredients/          # Ingredient domain
    meals/                # Meal domain
  lib/                    # Utils, axios client, query client
```

## Catatan Implementasi

- Semua warna mengikuti global CSS / design tokens project.
- Data fetching menggunakan `axios` dan `@tanstack/react-query`.
- Pagination dilakukan di frontend untuk mengurangi beban render list panjang.
- Image remote dari `themealdb.com` sudah diizinkan melalui `next.config.ts`.

## Deploy

Project ini dirancang untuk mudah di-deploy ke `Vercel`.

Dummy deployment link:

- Vercel:
  [https://meals-explorer-demo.vercel.app](https://meals-explorer-demo.vercel.app)

Catatan:

- Link di atas adalah placeholder/dummy link.
- Nanti dapat diganti setelah deployment final dilakukan oleh pemilik project.
