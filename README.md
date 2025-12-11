<p align="center">
  <img src="frontend/src/assets/hair.png" alt="Conan Classics Rebirth" width="120" />
</p>

<h1 align="center">Conan Classics Rebirth</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
</p>

<p align="center">
  A search engine for Conan Classics, replacing the broken search on conanclassic.com.<br/>
  Built for fans who just want to binge-watch some classic Conan moments.
</p>

## 🚧 Coming Soon

- Documentation for the most important API queries to conanclassic.com

## Tech Stack

- **Frontend:** Vue 3, TypeScript, Tailwind CSS, Vite
- **Backend:** Supabase (PostgreSQL)
- **UI Components:** shadcn/vue, Reka UI
- **State Management:** Pinia

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local development)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/conanclassicsrebirth.git
cd conanclassicsrebirth
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |

## Supabase Development

### Start local Supabase

```bash
supabase start
```

This starts the local Supabase stack (PostgreSQL, Auth, Storage, etc.).

### Run migrations

```bash
supabase db reset
```

This resets the database and applies all migrations from `supabase/migrations/`.

### Generate TypeScript types

```bash
supabase gen types typescript --local > frontend/src/models/supabase.types.ts
```

### Stop Supabase

```bash
supabase stop
```

## Project Structure

```
conanclassicsrebirth/
├── frontend/               # Vue frontend application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── i18n/           # Internationalization
│   │   ├── shadcn/         # shadcn UI components
│   │   ├── stores/         # Pinia stores
│   │   └── views/          # Page views
│   └── ...
└── supabase/               # Supabase configuration
    └── migrations/         # Database migrations
```

## Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-username/conanclassicsrebirth/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Browser and OS information

### Suggesting Features

Open an issue with the `enhancement` label describing:

- The feature you'd like to see
- Why it would be useful
- Any implementation ideas you have

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes with a descriptive message
5. Push to your fork and submit a pull request

## FAQ

### Where do the videos stream from?

The videos stream directly from the Conan Classics servers. This search engine does not store any videos.

### Why doesn't the video work in my browser?

Due to technical limitations, videos must be played through your browser's native video player. Some browsers don't support the required video format. Only **Safari** and recent **Chrome-based browsers** are currently supported.

### Why are only some videos watchable?

Due to the Conan Classics server interface being quite broken, only ~3,000 of the 15,000 video links were recoverable. Non-watchable search results will redirect you to the video on the Conan Classics website.

### Is this project affiliated with Team Coco?

No. This project has no affiliation with Team Coco. It was born of a far more tragic, and frankly, far more petty origin story: a single, faithful pizza night where the Conan Classics website cruelly denied my right to binge-watch.

## License

This project is licensed under the [MIT License](LICENSE).
