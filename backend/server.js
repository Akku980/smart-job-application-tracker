const express = require('express');
const cors = require('cors');
require('dotenv').config();

const applicationsRouter = require('./routes/applications');
const statsRouter = require('./routes/stats');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/applications', applicationsRouter);
app.use('/api/stats', statsRouter);

app.get('/', (req, res) => res.json({ message: 'Job Tracker API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
