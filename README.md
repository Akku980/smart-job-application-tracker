# Smart Job Application Tracker 📊

A personal project I built to actually solve a problem I was facing — tracking job applications was becoming a mess across notes, spreadsheets, and my head. So I decided to build a proper system using SQL and Power BI.

This project helped me practice real SQL skills (joins, aggregations, views, stored procedures) and Power BI dashboards while solving something genuinely useful for my job hunt.

---

## What this project does

Tracks everything related to job applications in one place:

- Which companies I applied to and for what roles
- Current status of each application (applied / shortlisted / interview / offer / rejected / ghosted)
- Interview rounds and results
- Which resume version I used for each application
- Follow-up tracking
- Analytics to understand patterns — which sources work best, which months I applied most, etc.

---

## Tech Stack

| Tool | Use |
|------|-----|
| MySQL | Database, schema, all queries |
| Power BI Desktop | Dashboards and visual analytics |
| Excel / CSV | Sample dataset |
| GitHub | Version control and portfolio hosting |
| Python | Dataset generation script |

---

## Project Structure

```
smart-job-application-tracker/
│
├── dataset/
│   ├── applications_raw.csv      # 400 application records
│   ├── interviews_raw.csv        # 250 interview records
│   └── followups_raw.csv         # 136 follow-up records
│
├── sql/
│   ├── 01_schema.sql             # Full database schema with FK constraints
│   ├── 02_seed_data.sql          # Companies, roles, skills, statuses
│   ├── 03_generate_applications.py  # Python script to generate realistic data
│   ├── 04_insert_applications.sql   # 400 application INSERT statements
│   ├── 05_insert_interviews.sql     # 250 interview INSERT statements
│   ├── 06_insert_followups.sql      # 136 follow-up INSERT statements
│   ├── 07_analytics_queries.sql     # 12 business insight queries
│   └── 08_views_procedures.sql      # 3 views + 3 stored procedures
│
├── powerbi/
│   └── dashboard_setup.md        # Dashboard setup guide + DAX measures
│
├── screenshots/
│   └── (add your dashboard screenshots here)
│
├── documentation/
│   └── db_design.md              # Database design notes
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## Database Design

10 tables with proper normalization and foreign key relationships:

```
Companies ──────────────────────────────┐
Job_Roles ───────────────────────────── Job_Applications ── Interviews
Resume_Versions ─────────────────────── │                ── Follow_Up_Tracker
Application_Status ──────────────────── │                ── Application_Skills
Recruiters ──────────────────────────── │
Skills (via Application_Skills) ────────┘
```

Key design decisions:
- `Application_Status` as a separate lookup table (easy to add new statuses)
- `Resume_Versions` table to track which resume worked best
- `Application_Skills` as a junction table for many-to-many skills matching
- All date fields stored as `DATE` type for easy aggregation in Power BI

---

## SQL Highlights

### Business Insight Queries (from `07_analytics_queries.sql`)

**Monthly application trends:**
```sql
SELECT DATE_FORMAT(applied_date, '%Y-%m') AS month,
       COUNT(*) AS applications_sent
FROM Job_Applications
GROUP BY month ORDER BY month;
```

**Which source platform works best:**
```sql
SELECT source,
       COUNT(*) AS total,
       ROUND(SUM(CASE WHEN status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS offer_rate
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY source ORDER BY offer_rate DESC;
```

**Resume version performance:**
```sql
SELECT rv.version_name,
       COUNT(*) AS times_used,
       SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews
FROM Job_Applications ja
JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY rv.version_name;
```

---

## Power BI Dashboards

5 dashboard pages:

1. **Overview** — KPI cards (total apps, offer rate, response rate), status donut chart, source bar chart
2. **Company Analysis** — Top companies, location map, industry slicer
3. **Timeline & Trends** — Monthly line chart, month vs status breakdown
4. **Interview Analytics** — Funnel chart, round-wise pass rate, conversion rate
5. **Resume & Skills** — Which resume version performed best, domain breakdown

DAX measures used for KPIs like offer rate, response rate, interview conversion rate — all documented in `/powerbi/dashboard_setup.md`.

---

## How to Run This

### Option A — MySQL + Power BI
```bash
# 1. Create database
mysql -u root -p < sql/01_schema.sql

# 2. Load reference data
mysql -u root -p job_tracker < sql/02_seed_data.sql

# 3. Load application data
mysql -u root -p job_tracker < sql/04_insert_applications.sql
mysql -u root -p job_tracker < sql/05_insert_interviews.sql
mysql -u root -p job_tracker < sql/06_insert_followups.sql

# 4. Run analytics
mysql -u root -p job_tracker < sql/07_analytics_queries.sql
```

Then open Power BI Desktop → Get Data → MySQL → connect to `job_tracker`.

### Option B — CSV only (no MySQL needed)
- Import the 3 CSV files from `/dataset/` directly into Power BI using Get Data → Text/CSV
- Follow the setup guide in `/powerbi/dashboard_setup.md`

---

## Dataset Overview

| File | Records | Description |
|------|---------|-------------|
| applications_raw.csv | 400 | Job applications Aug 2024 – May 2025 |
| interviews_raw.csv | 250 | Interview rounds for shortlisted apps |
| followups_raw.csv | 136 | Follow-up emails/messages sent |

**Companies:** TCS, Infosys, Zoho, Razorpay, Swiggy, Flipkart, Amazon, Google India, and 40+ more

**Status distribution (approx):**
- Applied: ~30%
- Rejected: ~22%
- Interview: ~20%
- Shortlisted: ~15%
- Offer: ~5%
- Ghosted: ~6%
- Withdrawn: ~2%

---

## What I learned

- Designing normalized relational databases (not just flat tables)
- Writing JOIN queries across 4-5 tables
- Using GROUP BY with CASE statements for pivot-style analytics
- Creating views to simplify Power BI data loading
- Writing basic stored procedures
- Connecting MySQL to Power BI and building DAX measures

---

## Future improvements

- Add a web front-end (maybe Flask) to log applications without SQL
- Auto-import from Gmail when I get rejection/interview emails
- Add a "skills gap" analysis — which skills I'm missing vs what companies want
- Email reminders for follow-ups

---

## Resume Description

> **Smart Job Application Tracker** (SQL · Power BI · MySQL)
> - Designed a relational database (10 tables) to track job applications, interview progress, and outcomes
> - Wrote optimized SQL queries, views, and stored procedures to extract business insights
> - Built Power BI dashboards to visualize application trends, offer rates, and resume performance

---

*Built by Aakash — 2nd year CSE student, SRM Institute*
