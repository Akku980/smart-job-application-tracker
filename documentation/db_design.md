# Database Design Notes
## Smart Job Application Tracker

### Why these tables?

I started with a single flat table for applications but realized it had a lot of repeated data (company name, role title, etc. repeated for every row). So I normalized it into separate tables.

### Normalization level: 3NF

- **1NF** — Each column has atomic values, no repeating groups
- **2NF** — Non-key columns fully depend on the primary key
- **3NF** — No transitive dependencies (company info lives in Companies table, not in Job_Applications)

### Table responsibilities

| Table | What it stores |
|-------|---------------|
| Companies | Company info — name, industry, location, size |
| Job_Roles | Role details — title, type (internship/FT), domain, salary range |
| Application_Status | Lookup table — Applied, Rejected, Interview, Offer, etc. |
| Resume_Versions | Tracks which resume version was used and how it performed |
| Skills | Skill catalog — SQL, Python, Power BI etc. |
| Recruiters | Recruiter contact info linked to companies |
| Job_Applications | Main table — links all the above together |
| Interviews | Interview rounds for each application |
| Follow_Up_Tracker | Follow-up messages sent after applying |
| Application_Skills | Which skills were required vs which I had (many-to-many) |

### Key design choices

**Application_Status as lookup table:**
Instead of storing "Rejected" as text in every row, I store a `status_id` that references the lookup. This means if I want to rename a status or add a new one, I change it in one place.

**Resume_Versions table:**
This was the most useful addition. By tracking which resume version was used per application, the analytics query in `07_analytics_queries.sql` shows which version had the best shortlist/offer rate.

**Application_Skills junction table:**
Many-to-many relationship between applications and skills. The `is_matched` flag (0/1) tracks whether I had the required skill — useful for gap analysis.

### ERD (text representation)

```
Companies (company_id PK)
    ↑
    │ FK
Job_Applications (application_id PK)
    ├── role_id → Job_Roles (role_id PK)
    ├── status_id → Application_Status (status_id PK)
    ├── resume_id → Resume_Versions (resume_id PK)
    ├── recruiter_id → Recruiters (recruiter_id PK)
    │                       ↑ FK company_id → Companies
    ↓
Interviews (interview_id PK, application_id FK)
Follow_Up_Tracker (followup_id PK, application_id FK)
Application_Skills (id PK, application_id FK, skill_id FK → Skills)
```
