# Festive Post Generator

A fully client-side web app to create stunning festive social media posts with custom logos, text effects, live preview, and instant downloads.

## Features

- **Zero Dependencies Setup:** Entirely browser-based; no server or installation required.
- **Advanced Text Styling:** Font family, size, rotation, alignment, outline width, shadow (blur/offset/color).
- **Logo Management:** Upload PNG/JPG/SVG logos with opacity control and canvas positioning.
- **Image Filters:** Grayscale, sepia, and invert effects for template backgrounds.
- **Template Gallery:** Browse and filter by category with lazy-loaded thumbnails.
- **Live Preview:** See all changes in real-time on the 1080×1080 canvas.
- **Save & Load:** Export designs as JSON and resume editing anytime.
- **Export Formats:** Download as PNG or JPEG with quality control.
- **Responsive Design:** Optimized for desktop, tablet, and mobile.
- **Accessible:** Full keyboard navigation, ARIA labels, and focus indicators.

## Quick Start

1. **Open:** Double-click `index.html` or drag it to your browser.
2. **Add Logo:** Upload or drag-and-drop PNG, JPG, or SVG.
3. **Add Text:** Type in the text field or click canvas to select existing text.
4. **Style:** Use left panel to adjust font, size, color, shadows, outlines, rotation.
5. **Template:** Search or browse templates by category.
6. **Effects:** Apply filters (grayscale, sepia, invert) to backgrounds.
7. **Save (Optional):** Click "Save Design" to export as JSON for later.
8. **Download:** Choose format and click "Download Post".

## Tips

- *Range sliders* display live values (e.g., "60px", "45deg") as you adjust.
- *Keyboard users* can Tab through controls and press Enter/Space to activate.
- *Multiple text boxes*: Click "Add New Text Box" to layer additional text.
- *Logo selection*: Uploaded logos become the active object; adjust opacity for backgrounds.
- *Search templates* by name or filter by category (Holiday, New Year, etc.).

## Customization

### Adding Templates

1. Create a 1080×1080 (or larger) template image.
2. Place it in `templates/` folder.
3. Add entry to `templates/templates.json`:

```json
{
  "name": "My Holiday Template",
  "thumbnail": "templates/my-template-thumb.png",
  "path": "templates/my-template.png",
  "category": "Holiday"
}
```

- `name`: Displayed in gallery
- `thumbnail`: Preview image (lazy-loaded)
- `path`: Full-resolution template
- `category`: Filter grouping

### Styling

Edit `style.css` to customize:

- **Color theme:** Update `:root` CSS variables (e.g., `--accent: #c93f2d`)
- **Typography:** Add Google Fonts or change font families
- **Layout:** Adjust flexbox/grid properties and breakpoints
- **Components:** Tweak padding/margins on `.control-group`, buttons, etc.

## Project Structure

```
festive-post/
├── index.html                 # App entry point
├── style.css                  # Responsive, theme-aware styles
├── script.js                  # Module coordinator
├── package.json               # Build & dependency config
├── js/
│   ├── textControls.js        # Text styling & layer management
│   ├── imageControls.js       # Logo upload & filters
│   ├── templateHandler.js     # Template loading & display
│   ├── saveLoadHandler.js     # JSON import/export
│   └── downloadHandler.js     # PNG/JPEG export
├── templates/
│   ├── templates.json         # Metadata & categories
│   ├── template1.png
│   └── template2.png
├── assets/                    # Static images & fonts
├── dist/                      # Minified build (npm run build)
└── README.md
```

## Build & Development

```bash
npm install          # Install dev tools (terser, css-minify)
npm run dev          # Display development instructions
npm run build        # Minify JS/CSS to /dist
npm test             # Test placeholder
```

## Technologies

- **HTML5:** Semantic, accessible markup
- **CSS3:** Modern layout (grid/flexbox), CSS variables, responsive design
- **JavaScript (ES6+ Modules):** Clean, event-driven architecture
- **[Fabric.js](https://fabricjs.com/):** Canvas rendering & manipulation
- **Google Fonts:** Playfair Display, Manrope

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Modern mobile browsers

## Performance

- **Lazy-loaded templates:** IntersectionObserver defers image loading
- **Client-side only:** No external API calls (except Fabric.js CDN)
- **Optimized canvas:** 1080×1080 at 80% quality
- **Minified build:** Terser compresses JS; css-minify compresses CSS

## Code Quality

- **Modular architecture:** Separation of concerns across document handlers
- **Error handling:** Graceful fallbacks for failed uploads/loads/exports
- **Accessibility:** Full keyboard support, ARIA labels, focus management
- **Safe JSON parsing:** Try/catch around design file imports

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

ISC (see [LICENSE](LICENSE))

---

**Built with ❤️ for festive creatives everywhere.**
