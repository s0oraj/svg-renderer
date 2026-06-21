import { SVGRenderer } from './renderer.js';

class App {
    constructor() {
        this.renderer = new SVGRenderer('svgContainer');
        this.svgData = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // SVG Editor
        const svgEditor = document.getElementById('svgEditor');
        svgEditor.addEventListener('input', () => this.renderFromEditor());

        // File input
        document.getElementById('svgFile').addEventListener('change', (e) => this.handleFileUpload(e));

        // Zoom control
        const zoomSlider = document.getElementById('zoomLevel');
        zoomSlider.addEventListener('input', (e) => {
            const zoom = parseFloat(e.target.value);
            this.renderer.setZoom(zoom);
            document.getElementById('zoomValue').textContent = Math.round(zoom * 100) + '%';
        });

        // Reset view
        document.getElementById('resetView').addEventListener('click', () => {
            this.renderer.resetView();
            document.getElementById('zoomLevel').value = 1;
            document.getElementById('zoomValue').textContent = '100%';
        });

        // Download SVG
        document.getElementById('downloadSvg').addEventListener('click', () => this.downloadSVG());

        // Export to PDF
        document.getElementById('exportPdf').addEventListener('click', () => this.exportToPDF());

        // Clear editor
        document.getElementById('clearEditor').addEventListener('click', () => {
            svgEditor.value = '';
            this.renderer.clear();
        });

        // Container pan with mouse
        const container = document.getElementById('svgContainer');
        let isGrabbing = false;
        let startX, startY;

        container.addEventListener('mousedown', (e) => {
            isGrabbing = true;
            startX = e.clientX;
            startY = e.clientY;
            container.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isGrabbing) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                this.renderer.pan(deltaX, deltaY);
                startX = e.clientX;
                startY = e.clientY;
            }
        });

        document.addEventListener('mouseup', () => {
            isGrabbing = false;
            container.style.cursor = 'grab';
        });

        // Zoom with scroll wheel
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const currentZoom = parseFloat(document.getElementById('zoomLevel').value);
            const newZoom = Math.max(0.1, Math.min(5, currentZoom * delta));
            document.getElementById('zoomLevel').value = newZoom;
            this.renderer.setZoom(newZoom);
            document.getElementById('zoomValue').textContent = Math.round(newZoom * 100) + '%';
        });
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            this.svgData = event.target.result;
            document.getElementById('svgEditor').value = this.svgData;
            this.renderSVG();
        };
        reader.readAsText(file);
    }

    renderSVG() {
        if (!this.svgData) return;

        try {
            const svgString = this.svgData;
            this.renderer.render(svgString);
        } catch (error) {
            console.error('Error rendering SVG:', error);
            alert('Error rendering SVG file');
        }
    }

    renderFromEditor() {
        const svgCode = document.getElementById('svgEditor').value.trim();
        
        if (!svgCode) {
            this.renderer.clear();
            return;
        }

        try {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
            
            if (svgDoc.getElementsByTagName('parsererror').length) {
                // Silently fail for incomplete code
                return;
            }

            this.renderer.render(svgCode);
        } catch (error) {
            // Silently fail while typing
        }
    }

    downloadSVG() {
        const svgCode = document.getElementById('svgEditor').value;
        if (!svgCode.trim()) {
            alert('No SVG to download');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgCode));
        element.setAttribute('download', 'rendered.svg');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    async exportToPDF() {
        const svgCode = document.getElementById('svgEditor').value;
        if (!svgCode.trim()) {
            alert('No SVG to export');
            return;
        }

        try {
            // Create a temporary container with the SVG
            const container = document.createElement('div');
            container.id = 'pdf-export-temp';
            container.style.padding = '20px';
            container.style.backgroundColor = 'white';
            container.innerHTML = svgCode;
            
            // Temporary add to DOM to calculate dimensions
            document.body.appendChild(container);

            const options = {
                margin: 10,
                filename: 'rendered.pdf',
                image: { type: 'png', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };

            // Use html2pdf to convert SVG to PDF
            await html2pdf().set(options).from(container).save();

            // Remove temporary container
            document.body.removeChild(container);

        } catch (error) {
            console.error('PDF export error:', error);
            alert('Error exporting to PDF: ' + error.message);
        }
    }
}

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
