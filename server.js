require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema
const ChatDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleString('vi-VN') },
    createdAt: { type: Date, default: Date.now }
});

const ChatData = mongoose.model('ChatData', ChatDataSchema);

// Routes

// Get all data
app.get('/api/data', async (req, res) => {
    try {
        const data = await ChatData.find().sort({ createdAt: -1 });
        // Map _id to id for frontend compatibility
        const formattedData = data.map(item => ({
            id: item._id,
            title: item.title,
            content: item.content,
            date: item.date
        }));
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new data
app.post('/api/data', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newData = new ChatData({ title, content });
        await newData.save();
        res.json({
            id: newData._id,
            title: newData.title,
            content: newData.content,
            date: newData.date
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete data
app.delete('/api/data/:id', async (req, res) => {
    try {
        await ChatData.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve frontend files
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
