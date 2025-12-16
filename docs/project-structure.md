# Project Structure - Prompt AI

**Last Updated:** 2025-12-13
**Version:** 1.0

---

## Directory Organization

```
prompt-ai/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles + Tailwind
│   ├── prompts/                 # Prompts routes
│   │   ├── page.tsx            # List all prompts
│   │   └── [id]/page.tsx       # Prompt detail
│   └── guides/                  # Guides routes
│       └── page.tsx
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   ├── prompts/                 # Prompt components
│   │   ├── PromptCard.tsx
│   │   ├── PromptDetail.tsx
│   │   ├── PromptList.tsx
│   │   └── SearchBar.tsx
│   └── layout/                  # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── CategoryTabs.tsx
│
├── lib/                         # Utils & helpers
│   ├── utils.ts                # cn() helper
│   ├── prompts/                # Prompt utilities
│   │   ├── parser.ts           # Parse .md → JSON
│   │   ├── types.ts            # TypeScript types
│   │   └── data.ts             # Data access
│   └── search.ts               # Fuse.js search
│
├── data/                        # Parsed JSON data
│   ├── prompts/
│   │   ├── image.json
│   │   └── office.json
│   └── guides/
│       ├── image-tips.json
│       └── office-tips.json
│
├── prompt/                      # Source .md files
│   ├── image/
│   │   ├── anh-chan-dung.md
│   │   └── mẹo-customize-promt.md
│   └── office/
│       ├── cong-viec-van-phong.md
│       └── meo-toi-uu-prompt-office.md
│
├── docs/                        # Documentation
│   ├── FINAL_DESIGN_SYSTEM.md
│   ├── PLAN_PROMPT_AI_WEBSITE.md
│   ├── UI_MOCKUP_CLEAN.md
│   └── project-structure.md    # This file
│
├── public/                      # Static assets
│   ├── images/
│   └── fonts/
│
├── tailwind.config.ts          # Tailwind config
├── components.json             # shadcn config
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md                    # Project overview
```

---

## Component Hierarchy

```
App (layout.tsx)
└── Page
    ├── Header
    │   ├── Logo
    │   ├── SearchBar
    │   └── CategoryTabs
    │
    ├── Main Content
    │   └── PromptList
    │       └── PromptCard (multiple)
    │           ├── Placeholder Image
    │           ├── Title
    │           ├── Description
    │           ├── Tags
    │           └── CopyButton
    │
    └── Footer
```

---

## File Naming Conventions

- **Components:** PascalCase (PromptCard.tsx)
- **Utils:** camelCase (utils.ts, parser.ts)
- **Routes:** lowercase (prompts/[id]/page.tsx)
- **CSS:** kebab-case (globals.css)
- **Config:** kebab-case (tailwind.config.ts)

---

## Import Aliases

```typescript
// tsconfig.json paths
{
  "@/*": "./*",
  "@/components": "./components",
  "@/lib": "./lib",
  "@/app": "./app"
}

// Example usage
import { cn } from "@/lib/utils"
import { PromptCard } from "@/components/prompts/PromptCard"
```

---

## Key Directories Explained

| Directory | Purpose | Status |
|-----------|---------|--------|
| `app/` | Next.js pages & routes | ✅ Setup |
| `components/` | Reusable UI components | ⏳ To build |
| `lib/` | Utilities & helpers | 🔧 In progress |
| `data/` | Parsed JSON from .md files | ⏳ To generate |
| `prompt/` | Source .md files (read-only) | ✅ Ready |
| `docs/` | Design & planning docs | ✅ Complete |
| `public/` | Static assets | ✅ Ready |

---

## Next Steps

1. ✅ Create project structure
2. ⏳ Parse .md files → JSON
3. ⏳ Build core components
4. ⏳ Implement pages
5. ⏳ Add search & filters
6. ⏳ Deploy to Vercel
