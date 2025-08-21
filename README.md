## Portfolio

Live: https://yehoanatnezra.github.io/Portfolio/

### Stack
- React 18 + Vite
- Modular CSS (base/layout/components/pages)
- Motion animations
- GitHub Pages deployment (base path configured)

### Local Development
```bash
npm install
npm run dev
```

### Build & Preview
```bash
npm run build
npm run preview
```

### Deploy (GitHub Pages)
Just push to the default branch (configured with base `/Portfolio/`). If using an action, ensure `npm ci && npm run build` then publish `dist`.

### Structure
```
src/
	pages/        # Route pages (Home, Projects, Athletic, Resume)
	components/   # Reusable UI pieces
	styles/       # Modular CSS files
public/photos/  # Assets (organized into subfolders)
```

### Notes
- Asset paths use `import.meta.env.BASE_URL` for GitHub Pages compatibility.
- Background carousel adapts portrait vs landscape images on mobile.

### License
Add a license of your choice (MIT recommended) if you want others to reuse code.
