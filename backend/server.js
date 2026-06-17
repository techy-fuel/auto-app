require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/ai', require('./routes/ai'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => res.json({ status: 'AutoPilot CRM Backend Running' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
