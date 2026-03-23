# GetRolling Site

Marketing landing site built with Next.js App Router. The project is organized around an `app`-first structure where page composition, section UI, content, behavior hooks, and lightweight API logic are separated by responsibility.

## Tech Stack

- Next.js `16.1.7`
- React `18.3.1`
- React DOM `18.3.1`
- npm scripts from `package.json`

## Project Structure

```text
.
├── app/
│   ├── api/contact/route.js
│   ├── components/
│   │   ├── floating-contact-cta.js
│   │   ├── topbar.js
│   │   └── sections/
│   ├── content/
│   ├── hooks/
│   ├── lib/
│   ├── constants.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── docs/
├── next.config.js
└── package.json
```

### Core Paths

- `app/page.js` - main page orchestration and section composition.
- `app/layout.js` - root layout and metadata wiring.
- `app/globals.css` - global and section styling.
- `app/constants.js` - re-export layer for content/config modules.
- `app/components/` - reusable UI plus section-level rendering components.
- `app/content/` - copy, labels, and section content/configuration.
- `app/hooks/` - UI behavior hooks (navigation/visibility state logic).
- `app/lib/` - utility logic (analytics helpers, form validation, fit-check scoring).
- `app/api/contact/route.js` - contact form API endpoint.
- `docs/` - release and operational documentation.

## How the Page Is Assembled

1. `app/content/*` defines content and section configuration.
2. `app/constants.js` re-exports content for centralized imports.
3. `app/page.js` composes top-level sections and wires handlers/state.
4. Section components render UI from content + props.
5. Contact form submits to `app/api/contact/route.js`.

## Local Development

```bash
npm run dev
npm run build
npm run start
```

## Maintenance Guide

- **Update copy/content** in `app/content/*`.
- **Update layout or visuals** in `app/components/*` and `app/globals.css`.
- **Update interactive behavior/state** in `app/hooks/*` and `app/lib/*`.
- **Update backend form handling** in `app/api/contact/route.js`.
- **Update rollout guidance** in `docs/*`.
