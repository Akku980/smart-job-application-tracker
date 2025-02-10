# Running the Website Locally

## Prerequisites
- Node.js (v16 or above) — download from nodejs.org
- MySQL installed and running
- Git

---

## Step 1 — Set up the database

```bash
mysql -u root -p < sql/01_schema.sql
mysql -u root -p job_tracker < sql/02_seed_data.sql
mysql -u root -p job_tracker < sql/04_insert_applications.sql
mysql -u root -p job_tracker < sql/05_insert_interviews.sql
mysql -u root -p job_tracker < sql/06_insert_followups.sql
```

---

## Step 2 — Start the backend

```bash
cd backend
cp .env.example .env
# Edit .env and set your MySQL password
npm install
npm run dev
```

Backend runs at: http://localhost:5000

---

## Step 3 — Start the frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: http://localhost:3000

---

## What you can do on the website

| Feature | Where |
|---|---|
| View all KPIs + charts | Dashboard page |
| See all 400 applications | Applications page |
| Filter by status | Applications page |
| Search by company/role | Applications page |
| Add a new application | Add New page |
| Edit application status | Click Edit in table |
| Delete an application | Click Delete in table |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/applications | All applications |
| POST | /api/applications | Add new |
| PUT | /api/applications/:id | Update status |
| DELETE | /api/applications/:id | Delete |
| GET | /api/stats/overview | KPI numbers |
| GET | /api/stats/by-status | Status breakdown |
| GET | /api/stats/monthly | Monthly trend |
| GET | /api/stats/top-companies | Top companies |
| GET | /api/stats/by-source | Source breakdown |
