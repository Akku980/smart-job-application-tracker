# Power BI Dashboard Setup Guide
## Smart Job Application Tracker

---

## Step 1 — Connect Power BI to MySQL

1. Open Power BI Desktop
2. Click **Get Data → MySQL Database**
3. Enter:
   - Server: `localhost`
   - Database: `job_tracker`
4. Click **OK** → sign in if prompted
5. Select these tables/views:
   - `vw_application_details` ← main fact view
   - `vw_monthly_kpi`
   - `vw_interview_summary`
   - `Companies`
   - `Job_Roles`
   - `Application_Status`
   - `Resume_Versions`
   - `Follow_Up_Tracker`

> **Alternative:** If MySQL isn't available, import the CSV files from `/dataset/` using **Get Data → Text/CSV**

---

## Step 2 — Data Model Relationships

Set these relationships in the **Model view**:

| From Table | Column | To Table | Column |
|---|---|---|---|
| Job_Applications | company_id | Companies | company_id |
| Job_Applications | role_id | Job_Roles | role_id |
| Job_Applications | status_id | Application_Status | status_id |
| Job_Applications | resume_id | Resume_Versions | resume_id |
| Interviews | application_id | Job_Applications | application_id |
| Follow_Up_Tracker | application_id | Job_Applications | application_id |

All relationships are **Many-to-One** from the left table to the right.

---

## Step 3 — DAX Measures to Create

Create a new table called `_Measures` and add these:

```dax
Total Applications = COUNTROWS(Job_Applications)

Total Offers = CALCULATE(COUNTROWS(Job_Applications), Application_Status[status_name] = "Offer")

Offer Rate % = DIVIDE([Total Offers], [Total Applications], 0) * 100

Total Interviews = CALCULATE(COUNTROWS(Job_Applications), Application_Status[status_name] = "Interview")

Response Rate % = 
DIVIDE(
    CALCULATE(COUNTROWS(Job_Applications), 
        Application_Status[status_name] IN {"Shortlisted","Interview","Offer"}),
    [Total Applications], 0
) * 100

Ghosted Count = CALCULATE(COUNTROWS(Job_Applications), Application_Status[status_name] = "Ghosted")

Rejection Count = CALCULATE(COUNTROWS(Job_Applications), Application_Status[status_name] = "Rejected")

Interview Conversion Rate % = DIVIDE([Total Interviews], [Total Applications], 0) * 100
```

---

## Step 4 — Dashboard Pages

### Page 1: Application Overview
| Visual | Fields |
|---|---|
| KPI Card | Total Applications |
| KPI Card | Total Offers |
| KPI Card | Offer Rate % |
| KPI Card | Response Rate % |
| Donut Chart | Status distribution (status_name, count) |
| Bar Chart | Applications by source |
| Slicer | applied_month |
| Slicer | role_type (internship / full-time) |

---

### Page 2: Company Analysis
| Visual | Fields |
|---|---|
| Bar Chart (horizontal) | Top 10 companies by application count |
| Table | company_name, total_applied, interviews, offers, response_rate |
| Map Visual | Applications by location |
| Slicer | industry |
| Slicer | company_size |

---

### Page 3: Timeline & Trends
| Visual | Fields |
|---|---|
| Line Chart | Monthly applications (applied_month, count) |
| Clustered Bar | Month vs status breakdown |
| Area Chart | Offers + Interviews trend over months |
| Table | vw_monthly_kpi all columns |

---

### Page 4: Interview Analytics
| Visual | Fields |
|---|---|
| Funnel Chart | Applied → Shortlisted → Interview → Offer |
| Bar Chart | Interview type vs pass rate |
| Table | vw_interview_summary |
| KPI Card | Interview Conversion Rate % |
| Slicer | interview_type |

---

### Page 5: Resume & Skills
| Visual | Fields |
|---|---|
| Bar Chart | Resume version vs success_rate |
| Table | version_name, times_used, shortlists, interviews, offers |
| Bar Chart | Top domains applied |
| KPI Card | Most effective resume version |

---

## Step 5 — Formatting Tips

- Use theme color: **#0F52BA** (professional blue)
- Font: Segoe UI throughout
- KPI cards: bold number, small label below
- Add company logo placeholder in header
- Page background: light grey (#F5F5F5)
- Add a title text box on every page: "Smart Job Application Tracker"

---

## CSV Import (if not using MySQL)

If importing CSVs instead of MySQL:

1. Import `applications_raw.csv` as the main table
2. Import `interviews_raw.csv`
3. Import `followups_raw.csv`
4. Merge/join them in Power Query using `application_id`

The column names match exactly — no transformation needed.
