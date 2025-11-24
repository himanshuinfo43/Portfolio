# Himanshu Portfolio

A professional, accessible, and responsive personal portfolio website scaffold. Customize content, colors, and assets to reflect your profile.

## Features
- Semantic HTML structure with landmark roles
- Responsive mobile-first layout (CSS Grid / Flexbox)
- Dark/Light theme toggle (persisted via `localStorage`)
- Accessible navigation (skip link, focus styles, ARIA attributes)
- Projects grid, experience timeline, skill tag groups
- Contact form with client-side validation (integrate Formspree or backend later)
- Scroll reveal animations using IntersectionObserver (prefers-reduced-motion respected)
- SEO + social meta tags (Open Graph & Twitter)
- Performance mindful: lazy images, preloaded portrait

## Structure
```
index.html        # Main HTML document
styles.css        # Global styles (variables, layout, components)
script.js         # Interactivity (theme, nav, form, reveal)
assets/           # Add images (profile.jpg, project-*.jpg, favicon, og-image)
```

## Getting Started
1. Replace placeholder text (search for `TODO:` comments in `index.html` & this file).
2. Add your portrait at `assets/profile.jpg` (recommended 360x360 or square).
3. Update project images: `assets/project-1.jpg`, etc.
4. Provide Open Graph image `assets/og-image.jpg` (1200x630 recommended).
5. Set correct social/profile links in the footer.
6. Add your CV PDF at `assets/Himanshu-CV.pdf` or adjust the link.
7. Configure contact form action: sign up at [Formspree](https://formspree.io) or replace with custom backend endpoint.

## Customization
- Colors: Edit CSS variables in `styles.css` under `:root` and `.light-theme`.
- Fonts: Include custom font imports at top of `styles.css` or `<head>`.
- Animations: Adjust `.reveal` transition or remove if unwanted.
- Sections: Add/remove skill groups or timeline items as needed.

## Accessibility & Performance Tips
- Test color contrast after customizing colors (aim for WCAG AA: contrast ratio ≥ 4.5:1 for body text).
- Always supply descriptive `alt` text for project images.
- Minify CSS/JS for production or serve via HTTP/2 with proper caching.
- Consider adding `aria-current="page"` to active nav links if using multi-page structure later.

## Deployment
You can host this easily on:
- GitHub Pages
- Vercel
- Netlify
- Azure Static Web Apps

### Example Build (Static)
No build step required; deploy as-is.

## Optional Enhancements
- Integrate a backend (Node/Express or serverless) for form handling.
- Add project filtering (tags + interactive UI).
- Include blog section (Markdown + static site generator like Next.js).
- Add automated Lighthouse CI for performance regressions.
- Internationalization support (i18n) with language switcher.

## License
No license specified yet. Add one (e.g., MIT) if you plan to share publicly.

## Attribution
Generated scaffold. Personalize content to reflect your unique work and achievements.
