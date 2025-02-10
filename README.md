# Smart Job Application Tracker 💼

A full-stack web application to track job applications, monitor interview progress, and analyze your job search with visual dashboards.

Built this because tracking applications across random notes and spreadsheets was getting messy. Wanted something where I could actually see patterns — which companies respond, which platforms work, how many applications I'm sending per month.

🔗 **Repository:** https://github.com/Akku980/smart-job-application-tracker

---

## What it does

- ➕ **Add** job applications with company, role, status, source, location
- 📋 **View & filter** all applications by status or search by company/role
- ✏️ **Update** application status as it progresses (Applied → Interview → Offer)
- 🗑️ **Delete** irrelevant entries
- 📊 **Dashboard** with live charts — status breakdown, monthly trends, top companies, source effectiveness
- 🗄️ **SQL database** with 10 normalized tables powering everything

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Recharts |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Analytics | Power BI, SQL Views & Procedures |
| Dataset | Python (generated), CSV |
| Version Control | Git + GitHub |

---

## Project Structure

```
smart-job-application-tracker/
│
├── frontend/                    ← React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Dashboard.js     ← Charts + KPIs
│   │   │   ├── ApplicationsTable.js
│   │   │   └── AddApplication.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                     ← Node.js + Express API
│   ├── routes/
│   │   ├── applications.js      ← CRUD endpoints
│   │   └── stats.js             ← Analytics endpoints
│   ├── config/db.js
│   ├── server.js
│   └── package.json
│
├── sql/
│   ├── 01_schema.sql            ← 10-table normalized schema
│   ├── 02_seed_data.sql         ← Companies, roles, statuses
│   ├── 03_generate_applications.py
│   ├── 04_insert_applications.sql  ← 400 records
│   ├── 05_insert_interviews.sql    ← 250 records
│   ├── 06_insert_followups.sql     ← 136 records
│   ├── 07_analytics_queries.sql    ← 12 business queries
│   └── 08_views_procedures.sql     ← 3 views + 3 stored procedures
│
├── dataset/
│   ├── applications_raw.csv
│   ├── interviews_raw.csv
│   └── followups_raw.csv
│
├── powerbi/
│   └── dashboard_setup.md
│
├── documentation/
│   ├── db_design.md
│   └── website_setup.md
│
├── screenshots/
└── README.md
```

---

## How to Run

### 1. Set up the database
```bash
mysql -u root -p < sql/01_schema.sql
mysql -u root -p job_tracker < sql/02_seed_data.sql
mysql -u root -p job_tracker < sql/04_insert_applications.sql
mysql -u root -p job_tracker < sql/05_insert_interviews.sql
mysql -u root -p job_tracker < sql/06_insert_followups.sql
```

### 2. Start backend
```bash
cd backend
cp .env.example .env      # add your MySQL password
npm install
npm run dev               # runs on http://localhost:5000
```

### 3. Start frontend
```bash
cd frontend
npm install
npm start                 # opens http://localhost:3000
```

---

## Database Design

10 tables with foreign key relationships and 3NF normalization:

```
Companies ──────────────────────────── Job_Applications ── Interviews
Job_Roles  ─────────────────────────── │                ── Follow_Up_Tracker
Application_Status ─────────────────── │                ── Application_Skills
Resume_Versions ────────────────────── │
Recruiters ─────────────────────────── │
Skills (via Application_Skills) ───────┘
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/applications | All applications (with joins) |
| POST | /api/applications | Add new application |
| PUT | /api/applications/:id | Update status/notes |
| DELETE | /api/applications/:id | Delete application |
| GET | /api/stats/overview | KPI numbers |
| GET | /api/stats/by-status | Status distribution |
| GET | /api/stats/monthly | Monthly trend data |
| GET | /api/stats/top-companies | Top 10 companies |
| GET | /api/stats/by-source | Source breakdown |

---

## SQL Highlights

**Monthly application trends:**
```sql
SELECT DATE_FORMAT(applied_date, '%Y-%m') AS month, COUNT(*) AS applications_sent
FROM Job_Applications GROUP BY month ORDER BY month;
```

**Source effectiveness:**
```sql
SELECT source,
  ROUND(SUM(CASE WHEN status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS offer_rate
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY source ORDER BY offer_rate DESC;
```

**Resume version performance:**
```sql
SELECT rv.version_name, COUNT(*) AS times_used,
  SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews
FROM Job_Applications ja
JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY rv.version_name;
```

---

## Sample Dataset

| File | Records |
|------|---------|
| Job applications | 400 |
| Interview rounds | 250 |
| Follow-ups | 136 |

Companies: TCS, Infosys, Zoho, Razorpay, Swiggy, Flipkart, Amazon India, Google India, and 40+ more  
Date range: Aug 2024 – May 2025

---

## What I learned

- Building a full REST API with Node.js + Express
- Connecting React frontend to a backend API
- Normalized relational database design
- SQL views, stored procedures, JOIN-heavy analytics queries
- Recharts for data visualization in React

---

## Future improvements

- User login / authentication
- Deploy to cloud (Render + PlanetScale)
- Email reminders for follow-ups
- Import applications from Gmail automatically
- Skills gap analysis feature

---

## Resume Description

> **Smart Job Application Tracker** | React · Node.js · MySQL · SQL · Power BI  
> - Built a full-stack web application to track job applications with CRUD operations and live dashboard analytics  
> - Designed a normalized relational database (10 tables) with SQL views and stored procedures for business insights  
> - Created REST API with Node.js/Express and React frontend with Recharts visualizations

---

*Built by Aakash — CSE Student, SRM Institute*
