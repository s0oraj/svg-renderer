# Advanced SVG Renderer

A powerful vanilla JavaScript SVG renderer capable of rendering complex SVG files directly to HTML5 Canvas with support for zoom, pan, and interactive controls.

## Features

- ✅ **Live SVG Editor** - Type or paste SVG code and see it render in real-time
- ✅ Render complex SVG files to Canvas
- ✅ Support for basic shapes (rect, circle, ellipse, line, polyline, polygon)
- ✅ Path rendering using Canvas Path2D
- ✅ Text rendering with custom fonts
- ✅ Image embedding support
- ✅ Transform support (translate, rotate, scale, matrix)
- ✅ Grouped elements (g tags)
- ✅ Style attributes and fill/stroke properties
- ✅ Zoom control (0.1x to 5x)
- ✅ Pan functionality with mouse drag
- ✅ Download rendered SVG
- ✅ Responsive canvas with DPI scaling
- ✅ Scroll wheel zoom support

## Getting Started

### Quick Start with Python

If you have Python installed, run:

```bash
python -m http.server 8000
```

Then open your browser to `http://localhost:8000`

### Quick Start with Node.js

If you have Node.js installed:

```bash
npx http-server -p 8000
```

Then open your browser to `http://localhost:8000`

### Using npm scripts

```bash
npm run dev      # Start server and open in browser
npm run serve    # Start server only
```

## Usage

1. **Type SVG Code**: Paste or type SVG code in the left editor panel – it renders in real-time
2. **Load SVG File**: Click "Load SVG File" to upload a .svg file (auto-populates the editor)
3. **Zoom**: Use the zoom slider or scroll wheel to zoom in/out
4. **Pan**: Click and drag on the canvas to pan around
5. **Reset**: Click "Reset View" to return to default zoom and position
6. **Download**: Click "Download SVG" to download the current SVG code
7. **Clear**: Click "Clear" to remove the current SVG

## Quick Example

Try pasting this into the editor:

```xml
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="80" height="60" fill="#3498db" stroke="#2c3e50" stroke-width="2"/>
  <circle cx="150" cy="50" r="30" fill="#e74c3c"/>
  <text x="100" y="180" font-size="16" fill="#2c3e50" text-anchor="middle">Hello SVG!</text>
</svg>
```

It renders instantly as you type!

```
svg-renderer/
├── index.html          # Main HTML page
├── styles.css          # Styling
├── package.json        # Project metadata
├── README.md          # This file
└── src/
    ├── main.js        # Application entry point and event handling
    └── renderer.js    # SVG rendering engine
```

## SVG Support

Currently supports:
- Basic shapes: `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`
- Paths: `<path>` with d attributes
- Text: `<text>` with basic font styling
- Images: `<image>` with href
- Groups: `<g>` with transforms
- Styling: fill, stroke, stroke-width, opacity, font-family, font-size
- Transforms: translate, rotate, scale, matrix

## Extending the Renderer

To add support for additional SVG elements or features:

1. Add a new method in `SVGRenderer` class: `renderNewElement(element)`
2. Add a case in the `renderSVGElement` switch statement
3. Implement the rendering logic using Canvas API

Example:
```javascript
renderMyShape(element) {
    this.ctx.save();
    this.applyStyles(element);
    
    // Your rendering code here
    
    this.ctx.restore();
}
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Advanced Library Integration

You can enhance this renderer by installing additional libraries:

```bash
npm install snap.svg     # For advanced SVG manipulation
npm install two.js       # For 2D drawing library
npm install fabric.js    # For interactive canvas library
```

Then import and use them in your code as needed.

## Performance Tips

- For very large SVGs, consider breaking them into smaller components
- Use `transform: translate3d` for smoother panning
- Reduce SVG complexity before loading if rendering is slow
- Consider using WebGL for extremely complex scenes

## License

MIT
