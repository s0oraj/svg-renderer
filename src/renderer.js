export class SVGRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.svgElement = null;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.svgContent = null;
        this.viewBox = { x: 0, y: 0, width: 800, height: 600 };
        
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center';
        this.container.style.justifyContent = 'center';
        
        window.addEventListener('resize', () => this.resizeContainer());
    }

    resizeContainer() {
        if (this.svgElement) {
            this.updateSVGDisplay();
        }
    }

    render(svgText) {
        this.svgContent = svgText;
        this.parseAndRender();
    }

    parseAndRender() {
        if (!this.svgContent) return;

        try {
            // Parse SVG string
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(this.svgContent, 'text/xml');
            
            if (xmlDoc.getElementsByTagName('parsererror').length) {
                console.error('Invalid SVG');
                return;
            }

            this.svgElement = xmlDoc.documentElement;
            
            // Extract viewBox or dimensions
            const viewBox = this.svgElement.getAttribute('viewBox');
            const width = this.svgElement.getAttribute('width') || 800;
            const height = this.svgElement.getAttribute('height') || 600;
            
            if (viewBox) {
                const parts = viewBox.split(/\s+/);
                this.viewBox = {
                    x: parseFloat(parts[0]),
                    y: parseFloat(parts[1]),
                    width: parseFloat(parts[2]),
                    height: parseFloat(parts[3])
                };
            } else {
                this.viewBox = {
                    x: 0,
                    y: 0,
                    width: parseFloat(width),
                    height: parseFloat(height)
                };
            }

            this.updateSVGDisplay();
            this.resetView();
        } catch (error) {
            console.error('Render error:', error);
        }
    }

    updateSVGDisplay() {
        if (!this.svgElement) return;

        // Clear container
        this.container.innerHTML = '';

        // Create wrapper for SVG with transform
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.transformOrigin = 'center center';
        wrapper.id = 'svg-wrapper';

        // Clone the SVG element
        const svgClone = this.svgElement.cloneNode(true);
        
        // Ensure viewBox is set
        if (!svgClone.getAttribute('viewBox')) {
            svgClone.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
        }

        // Set display properties
        svgClone.style.width = '80%';
        svgClone.style.height = '80%';
        svgClone.style.maxWidth = '100%';
        svgClone.style.maxHeight = '100%';
        svgClone.style.background = 'white';

        wrapper.appendChild(svgClone);
        this.container.appendChild(wrapper);

        this.redraw();
    }

    redraw() {
        const wrapper = document.getElementById('svg-wrapper');
        if (!wrapper) return;

        const scale = this.zoom;
        const translateX = this.panX;
        const translateY = this.panY;

        wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    setZoom(zoomLevel) {
        this.zoom = parseFloat(zoomLevel);
        this.redraw();
    }

    pan(deltaX, deltaY) {
        this.panX += deltaX;
        this.panY += deltaY;
        this.redraw();
    }

    resetView() {
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.redraw();
    }

    getSVGString() {
        return this.svgContent;
    }

    clear() {
        this.svgContent = null;
        this.svgElement = null;
        this.container.innerHTML = '';
    }
}
