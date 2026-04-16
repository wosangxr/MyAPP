const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ── Middlewares ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ── Page Routes ──
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/jobs', (req, res) => res.sendFile(path.join(__dirname, 'jobs.html')));
app.get('/applicants', (req, res) => res.sendFile(path.join(__dirname, 'applicants.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'profile.html')));

// ── Health Check ──
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        app: 'Company Test (Static)',
        backend: process.env.API_URL || 'http://localhost:3001/api',
        note: 'API requests are handled by the central backend server'
    });
});

// ── Start Server ──
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`🚀 Company Test server running on http://localhost:${port}`);
    console.log(`📦 Backend API: ${process.env.API_URL || 'http://localhost:3001/api'}`);
    console.log(`🔐 Auth: Firebase (configured in frontend)`);
});
