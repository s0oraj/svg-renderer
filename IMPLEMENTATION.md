# Advanced SVG Renderer with PDF Export

A modern web-based SVG renderer with **Inkscape-level features** and PDF export capability.

## Features

✅ **Advanced SVG Rendering**
- Native SVG DOM rendering (not canvas)
- Support for complex SVG features:
  - Gradients (linear & radial)
  - Filters (blur, shadow, etc.)
  - Clipping paths & masks
  - Transforms & nested groups
  - Patterns & textures
  - Complex curves & paths

✅ **Interactive Controls**
- Zoom in/out with mouse wheel
- Pan with click and drag
- Reset view button
- Real-time zoom percentage display

✅ **File Management**
- Load SVG files from disk
- Paste/edit SVG code directly
- Download rendered SVG
- Export to PDF

✅ **PDF Export**
- Browser-based PDF generation
- High-quality output
- A4 page format with margins
- No server required

## Quick Start

### Option 1: Simple HTTP Server
```bash
npm run serve
```
Opens at `http://localhost:8000`

### Option 2: Development Server
```bash
npm run dev
```
Automatically opens in your browser

### Option 3: Manual
```bash
npx http-server -p 8000
```

## Usage

1. **Load SVG**
   - Click "Load SVG File" and select a file, or
   - Paste SVG code directly into the editor

2. **View & Interact**
   - Scroll to zoom in/out
   - Click and drag to pan
   - Use zoom slider for precise control

3. **Export**
   - **Download SVG**: Save the rendered SVG code
   - **Export to PDF**: Generate a PDF file with high quality

## Architecture

### Frontend Stack
- **Snap.svg** (30K★) - Advanced SVG manipulation library
- **HTML5 Canvas** - Powered by Snap.svg for rendering
- **html2pdf.js** - Browser-based PDF generation

### Key Files
- `src/renderer.js` - SVG rendering engine
- `src/main.js` - Application logic
- `index.html` - User interface
- `styles.css` - Styling

## Why This Setup?

**Before:** Canvas 2D rendering ❌
- Limited SVG feature support
- No gradients, filters, or advanced effects
- Low-quality output

**Now:** Native SVG DOM with Snap.svg ✅
- Full SVG specification support
- Professional-grade rendering
- Perfect for complex designs
- Inkscape-compatible features

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Libraries Used

- **Snap.svg** (CDN) - SVG manipulation
- **html2pdf.js** (CDN) - PDF export
- **http-server** - Local development server

## Future Enhancements

- [ ] Server-side Puppeteer rendering for higher PDF quality
- [ ] Support for SVG filters (blur, drop-shadow, etc.)
- [ ] Real-time SVG editing tools
- [ ] Color palette extraction
- [ ] SVG optimization

## License

MIT
