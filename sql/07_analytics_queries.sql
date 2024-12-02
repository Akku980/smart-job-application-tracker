-- ============================================================
-- Smart Job Application Tracker - Analytics Queries
-- Author: Aakash
-- These queries power the Power BI dashboards
-- ============================================================

USE job_tracker;

-- ------------------------------------------------------------
-- 1. Total applications overview
-- ------------------------------------------------------------
SELECT
    COUNT(*) AS total_applications,
    SUM(CASE WHEN s.status_name = 'Offer'      THEN 1 ELSE 0 END) AS total_offers,
    SUM(CASE WHEN s.status_name = 'Rejected'   THEN 1 ELSE 0 END) AS total_rejections,
    SUM(CASE WHEN s.status_name = 'Interview'  THEN 1 ELSE 0 END) AS in_interview,
    SUM(CASE WHEN s.status_name = 'Applied'    THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN s.status_name = 'Ghosted'    THEN 1 ELSE 0 END) AS ghosted,
    ROUND(SUM(CASE WHEN s.status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS offer_rate_pct,
    ROUND(SUM(CASE WHEN s.status_name IN ('Interview','Offer','Shortlisted') THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS response_rate_pct
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id;

-- ------------------------------------------------------------
-- 2. Monthly application count (trend analysis)
-- ------------------------------------------------------------
SELECT
    DATE_FORMAT(applied_date, '%Y-%m') AS month,
    COUNT(*) AS applications_sent,
    SUM(CASE WHEN s.status_name = 'Offer'    THEN 1 ELSE 0 END) AS offers,
    SUM(CASE WHEN s.status_name = 'Rejected' THEN 1 ELSE 0 END) AS rejections
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY month
ORDER BY month;

-- ------------------------------------------------------------
-- 3. Top companies by application count
-- ------------------------------------------------------------
SELECT
    c.company_name,
    c.industry,
    c.location,
    COUNT(ja.application_id) AS total_applied,
    SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews_got,
    SUM(CASE WHEN s.status_name = 'Offer'     THEN 1 ELSE 0 END) AS offers_got,
    ROUND(SUM(CASE WHEN s.status_name != 'Ghosted' AND s.status_name != 'Applied' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS response_rate
FROM Job_Applications ja
JOIN Companies c ON ja.company_id = c.company_id
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY c.company_id, c.company_name, c.industry, c.location
ORDER BY total_applied DESC
LIMIT 15;

-- ------------------------------------------------------------
-- 4. Application source effectiveness
-- ------------------------------------------------------------
SELECT
    source,
    COUNT(*) AS total,
    SUM(CASE WHEN s.status_name = 'Offer'     THEN 1 ELSE 0 END) AS offers,
    SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews,
    ROUND(SUM(CASE WHEN s.status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS offer_rate
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY source
ORDER BY offer_rate DESC;

-- ------------------------------------------------------------
-- 5. Role domain performance
-- ------------------------------------------------------------
SELECT
    jr.domain,
    jr.role_type,
    COUNT(ja.application_id) AS applications,
    SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews,
    SUM(CASE WHEN s.status_name = 'Offer'     THEN 1 ELSE 0 END) AS offers,
    ROUND(AVG(jr.min_salary + jr.max_salary) / 2, 0) AS avg_salary_range
FROM Job_Applications ja
JOIN Job_Roles jr ON ja.role_id = jr.role_id
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY jr.domain, jr.role_type
ORDER BY interviews DESC;

-- ------------------------------------------------------------
-- 6. Interview round analysis
-- ------------------------------------------------------------
SELECT
    i.interview_type,
    i.interview_round,
    COUNT(*) AS total_interviews,
    SUM(CASE WHEN i.result = 'Passed'  THEN 1 ELSE 0 END) AS passed,
    SUM(CASE WHEN i.result = 'Failed'  THEN 1 ELSE 0 END) AS failed,
    SUM(CASE WHEN i.result = 'Waiting' THEN 1 ELSE 0 END) AS waiting,
    ROUND(SUM(CASE WHEN i.result = 'Passed' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pass_rate
FROM Interviews i
GROUP BY i.interview_type, i.interview_round
ORDER BY i.interview_round, pass_rate DESC;

-- ------------------------------------------------------------
-- 7. Location-wise application breakdown
-- ------------------------------------------------------------
SELECT
    ja.location,
    COUNT(*) AS applications,
    SUM(CASE WHEN s.status_name = 'Offer'    THEN 1 ELSE 0 END) AS offers,
    SUM(CASE WHEN s.status_name = 'Rejected' THEN 1 ELSE 0 END) AS rejections,
    ja.is_remote
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY ja.location, ja.is_remote
ORDER BY applications DESC;

-- ------------------------------------------------------------
-- 8. Resume version performance
-- ------------------------------------------------------------
SELECT
    rv.version_name,
    rv.focus_area,
    COUNT(ja.application_id) AS times_used,
    SUM(CASE WHEN s.status_name = 'Shortlisted' THEN 1 ELSE 0 END) AS shortlists,
    SUM(CASE WHEN s.status_name = 'Interview'   THEN 1 ELSE 0 END) AS interviews,
    SUM(CASE WHEN s.status_name = 'Offer'       THEN 1 ELSE 0 END) AS offers,
    ROUND(SUM(CASE WHEN s.status_name IN ('Shortlisted','Interview','Offer') THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS success_rate
FROM Job_Applications ja
JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY rv.resume_id, rv.version_name, rv.focus_area
ORDER BY success_rate DESC;

-- ------------------------------------------------------------
-- 9. Follow-up effectiveness
-- ------------------------------------------------------------
SELECT
    f.method,
    COUNT(*) AS total_followups,
    SUM(f.response_received) AS responses_got,
    ROUND(SUM(f.response_received) * 100.0 / COUNT(*), 1) AS response_rate
FROM Follow_Up_Tracker f
GROUP BY f.method;

-- ------------------------------------------------------------
-- 10. Weekly application pace
-- ------------------------------------------------------------
SELECT
    YEAR(applied_date) AS yr,
    WEEK(applied_date) AS wk,
    COUNT(*) AS apps_that_week
FROM Job_Applications
GROUP BY yr, wk
ORDER BY yr, wk;

-- ------------------------------------------------------------
-- 11. Status distribution full breakdown
-- ------------------------------------------------------------
SELECT
    s.status_name,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Job_Applications), 1) AS percentage
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY s.status_name
ORDER BY count DESC;

-- ------------------------------------------------------------
-- 12. Days between application and interview (response time)
-- ------------------------------------------------------------
SELECT
    c.company_name,
    ja.applied_date,
    MIN(i.interview_date) AS first_interview_date,
    DATEDIFF(MIN(i.interview_date), ja.applied_date) AS days_to_response
FROM Job_Applications ja
JOIN Companies c ON ja.company_id = c.company_id
JOIN Interviews i ON i.application_id = ja.application_id
GROUP BY ja.application_id, c.company_name, ja.applied_date
ORDER BY days_to_response ASC
LIMIT 20;
