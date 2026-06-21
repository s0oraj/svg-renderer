import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

let browser = null;

// Initialize browser on startup
async function initBrowser() {
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('Puppeteer browser initialized');
    } catch (error) {
        console.error('Failed to initialize browser:', error);
        process.exit(1);
    }
}

// SVG to PDF conversion endpoint
app.post('/export-pdf', async (req, res) => {
    try {
        const { svg } = req.body;
        
        if (!svg || !svg.trim()) {
            return res.status(400).json({ error: 'No SVG content provided' });
        }

        // Ensure browser is ready
        if (!browser) {
            await initBrowser();
        }

        // Create a new page
        const page = await browser.newPage();

        // Create HTML content with SVG
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        background: white;
                    }
                    svg {
                        max-width: 100%;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                ${svg}
            </body>
            </html>
        `;

        // Set page content
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px'
            },
            printBackground: true
        });

        await page.close();

        // Send PDF
        res.contentType('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="rendered.pdf"');
        res.send(pdfBuffer);

    } catch (error) {
        console.error('PDF export error:', error);
        res.status(500).json({ 
            error: 'Failed to export PDF',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'SVG Renderer server is running' });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
    await initBrowser();
    
    app.listen(PORT, () => {
        console.log(`SVG Renderer server running on http://localhost:${PORT}`);
        console.log('PDF export endpoint: POST /export-pdf');
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
