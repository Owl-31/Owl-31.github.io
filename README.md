# Aniket Singh — Architecture Portfolio

A static portfolio site (HTML/CSS/JS) deployed via GitHub Pages.

## Editing content

All content lives in the `data/` folder as plain JSON — no build step required:

- `data/profile.json` — name, hero text, objective, about copy, contact details, CV link
- `data/experience.json` — professional experience and education entries (edit dates/roles here)
- `data/projects.json` — project list with cover image, gallery images and metadata
- `data/skills.json` — software/tools list and the skills note

Edit a JSON file, commit, and the site updates.

## Local preview

The page loads content with `fetch()`, which browsers block on the `file://`
protocol. Run a tiny local server instead of double-clicking `index.html`:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. On GitHub Pages it works without any setup.
