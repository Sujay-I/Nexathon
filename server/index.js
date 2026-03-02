import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const dbPath = join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Initialize JSON Database if not exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ grants: [] }, null, 2));
}

// Helper to read/write DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// API Endpoints
app.get('/api/grants', (req, res) => {
    try {
        const data = readDB();
        res.json(data.grants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/grants', (req, res) => {
    const { id, title, description, category, totalAmount, deadline, sponsorWallet, txId } = req.body;
    try {
        const data = readDB();
        const newGrant = {
            id: id || `grant-${Date.now()}`,
            title,
            description,
            category,
            totalAmount,
            deadline,
            sponsorWallet,
            txId,
            createdAt: new Date().toISOString()
        };
        data.grants.unshift(newGrant); // Add to beginning
        writeDB(data);
        res.status(201).json(newGrant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Vitta Backend running at http://localhost:${port}`);
});
