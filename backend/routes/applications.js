const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all applications with joined data
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        ja.application_id,
        c.company_name,
        jr.role_title,
        jr.role_type,
        jr.domain,
        s.status_name,
        ja.applied_date,
        ja.source,
        ja.location,
        ja.is_remote,
        ja.notes,
        rv.version_name AS resume_version
      FROM Job_Applications ja
      JOIN Companies c ON ja.company_id = c.company_id
      JOIN Job_Roles jr ON ja.role_id = jr.role_id
      JOIN Application_Status s ON ja.status_id = s.status_id
      LEFT JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id
      ORDER BY ja.applied_date DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single application
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ja.*, c.company_name, jr.role_title, jr.role_type, jr.domain,
             s.status_name, rv.version_name AS resume_version
      FROM Job_Applications ja
      JOIN Companies c ON ja.company_id = c.company_id
      JOIN Job_Roles jr ON ja.role_id = jr.role_id
      JOIN Application_Status s ON ja.status_id = s.status_id
      LEFT JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id
      WHERE ja.application_id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new application
router.post('/', async (req, res) => {
  const { company_name, role_title, role_type, domain, status_name,
          applied_date, source, location, is_remote, notes, resume_version } = req.body;
  try {
    // Get or create company
    let [companies] = await db.query('SELECT company_id FROM Companies WHERE company_name = ?', [company_name]);
    let company_id;
    if (companies.length > 0) {
      company_id = companies[0].company_id;
    } else {
      const [result] = await db.query('INSERT INTO Companies (company_name) VALUES (?)', [company_name]);
      company_id = result.insertId;
    }

    // Get or create role
    let [roles] = await db.query('SELECT role_id FROM Job_Roles WHERE role_title = ?', [role_title]);
    let role_id;
    if (roles.length > 0) {
      role_id = roles[0].role_id;
    } else {
      const [result] = await db.query(
        'INSERT INTO Job_Roles (role_title, role_type, domain) VALUES (?, ?, ?)',
        [role_title, role_type || 'full-time', domain || 'General']
      );
      role_id = result.insertId;
    }

    // Get status id
    const [statuses] = await db.query('SELECT status_id FROM Application_Status WHERE status_name = ?', [status_name || 'Applied']);
    const status_id = statuses[0]?.status_id || 1;

    // Get resume id
    let resume_id = null;
    if (resume_version) {
      const [resumes] = await db.query('SELECT resume_id FROM Resume_Versions WHERE version_name = ?', [resume_version]);
      resume_id = resumes[0]?.resume_id || null;
    }

    const [result] = await db.query(
      `INSERT INTO Job_Applications 
       (company_id, role_id, status_id, resume_id, applied_date, source, location, is_remote, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [company_id, role_id, status_id, resume_id, applied_date, source, location, is_remote ? 1 : 0, notes]
    );
    res.status(201).json({ application_id: result.insertId, message: 'Application added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update status
router.put('/:id', async (req, res) => {
  const { status_name, notes } = req.body;
  try {
    const [statuses] = await db.query('SELECT status_id FROM Application_Status WHERE status_name = ?', [status_name]);
    if (statuses.length === 0) return res.status(400).json({ error: 'Invalid status' });
    await db.query(
      'UPDATE Job_Applications SET status_id = ?, notes = ? WHERE application_id = ?',
      [statuses[0].status_id, notes, req.params.id]
    );
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE application
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM Follow_Up_Tracker WHERE application_id = ?', [req.params.id]);
    await db.query('DELETE FROM Interviews WHERE application_id = ?', [req.params.id]);
    await db.query('DELETE FROM Application_Skills WHERE application_id = ?', [req.params.id]);
    await db.query('DELETE FROM Job_Applications WHERE application_id = ?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET lookup data for dropdowns
router.get('/meta/lookups', async (req, res) => {
  try {
    const [statuses] = await db.query('SELECT status_name FROM Application_Status');
    const [resumes]  = await db.query('SELECT version_name FROM Resume_Versions');
    const [companies]= await db.query('SELECT company_name FROM Companies ORDER BY company_name');
    res.json({ statuses, resumes, companies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
