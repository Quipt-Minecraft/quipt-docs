# QUIPT Documentation Site (Docusaurus)

This directory contains the documentation suite for QUIPT, configured for execution with [Docusaurus](https://docusaurus.io/).

## Local Development

To run this documentation locally:

```bash
# Navigate to the documentation directory
cd documentation

# Install dependencies
npm install

# Start development server
npm run start
```

The site will open automatically at `http://localhost:3000`.

## Production Build

To compile static assets for deployment:

```bash
npm run build
```

The static website output will be located in `documentation/build/`.

## Directory Layout

- `docs/`: Markdown / MDX documentation source files with Docusaurus frontmatter metadata.
  - `core/`: Core runtime, lifecycle, server, configuration, event bus, and registries.
  - `modules/`: Platform-specific integrations (Paper, Fabric, Velocity, Discord Bot, Common).
  - `features/`: Server features (Resource pack management, command system, chat utils, parties).
  - `developer/`: Developer guides, plugin creation, custom command creation, API reference.
  - `operations/`: Building, testing, publishing, and security operations.
- `src/css/`: Custom stylesheets and CSS variable overrides.
- `docusaurus.config.js`: Central Docusaurus configuration (presets, themes, navbar, metadata).
- `sidebars.js`: Navigation sidebar structure and categories.
