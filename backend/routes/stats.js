const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET overview KPIs
router.get('/overview', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(*) AS total_applications,
        SUM(CASE WHEN s.status_name = 'Offer'       THEN 1 ELSE 0 END) AS total_offers,
        SUM(CASE WHEN s.status_name = 'Rejected'    THEN 1 ELSE 0 END) AS total_rejections,
        SUM(CASE WHEN s.status_name = 'Interview'   THEN 1 ELSE 0 END) AS in_interview,
        SUM(CASE WHEN s.status_name = 'Applied'     THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN s.status_name = 'Ghosted'     THEN 1 ELSE 0 END) AS ghosted,
        ROUND(SUM(CASE WHEN s.status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS offer_rate,
        ROUND(SUM(CASE WHEN s.status_name IN ('Interview','Offer','Shortlisted') THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS response_rate
      FROM Job_Applications ja
      JOIN Application_Status s ON ja.status_id = s.status_id
    `);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET status breakdown
router.get('/by-status', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.status_name, COUNT(*) AS count
      FROM Job_Applications ja
      JOIN Application_Status s ON ja.status_id = s.status_id
      GROUP BY s.status_name ORDER BY count DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET monthly trend
router.get('/monthly', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE_FORMAT(applied_date, '%Y-%m') AS month, COUNT(*) AS count
      FROM Job_Applications
      GROUP BY month ORDER BY month
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET top companies
router.get('/top-companies', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.company_name, COUNT(*) AS applications
      FROM Job_Applications ja
      JOIN Companies c ON ja.company_id = c.company_id
      GROUP BY c.company_name ORDER BY applications DESC LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET source breakdown
router.get('/by-source', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT source, COUNT(*) AS count FROM Job_Applications
      GROUP BY source ORDER BY count DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
