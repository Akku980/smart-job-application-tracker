-- ============================================================
-- Smart Job Application Tracker - Views & Stored Procedures
-- Author: Aakash
-- ============================================================

USE job_tracker;

-- ------------------------------------------------------------
-- VIEW 1: Full application details (main Power BI source)
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW vw_application_details AS
SELECT
    ja.application_id,
    c.company_name,
    c.industry,
    c.location AS company_location,
    c.company_size,
    jr.role_title,
    jr.role_type,
    jr.domain,
    jr.min_salary,
    jr.max_salary,
    s.status_name AS current_status,
    rv.version_name AS resume_used,
    ja.applied_date,
    ja.source,
    ja.location AS applied_location,
    ja.is_remote,
    DATE_FORMAT(ja.applied_date, '%Y-%m') AS applied_month,
    MONTHNAME(ja.applied_date) AS month_name,
    YEAR(ja.applied_date) AS applied_year
FROM Job_Applications ja
JOIN Companies c ON ja.company_id = c.company_id
JOIN Job_Roles jr ON ja.role_id = jr.role_id
JOIN Application_Status s ON ja.status_id = s.status_id
LEFT JOIN Resume_Versions rv ON ja.resume_id = rv.resume_id;

-- ------------------------------------------------------------
-- VIEW 2: Interview summary per application
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW vw_interview_summary AS
SELECT
    ja.application_id,
    c.company_name,
    jr.role_title,
    s.status_name,
    COUNT(i.interview_id) AS total_rounds,
    SUM(CASE WHEN i.result = 'Passed' THEN 1 ELSE 0 END) AS rounds_passed,
    MAX(i.interview_date) AS latest_interview_date,
    GROUP_CONCAT(i.interview_type ORDER BY i.interview_round SEPARATOR ' → ') AS interview_flow
FROM Job_Applications ja
JOIN Companies c ON ja.company_id = c.company_id
JOIN Job_Roles jr ON ja.role_id = jr.role_id
JOIN Application_Status s ON ja.status_id = s.status_id
LEFT JOIN Interviews i ON i.application_id = ja.application_id
GROUP BY ja.application_id, c.company_name, jr.role_title, s.status_name;

-- ------------------------------------------------------------
-- VIEW 3: Monthly KPI summary
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW vw_monthly_kpi AS
SELECT
    DATE_FORMAT(ja.applied_date, '%Y-%m') AS month,
    COUNT(*) AS total_applied,
    SUM(CASE WHEN s.status_name = 'Offer'       THEN 1 ELSE 0 END) AS offers,
    SUM(CASE WHEN s.status_name = 'Interview'   THEN 1 ELSE 0 END) AS interviews,
    SUM(CASE WHEN s.status_name = 'Rejected'    THEN 1 ELSE 0 END) AS rejections,
    SUM(CASE WHEN s.status_name = 'Ghosted'     THEN 1 ELSE 0 END) AS ghosted,
    ROUND(SUM(CASE WHEN s.status_name = 'Offer' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS offer_rate
FROM Job_Applications ja
JOIN Application_Status s ON ja.status_id = s.status_id
GROUP BY month
ORDER BY month;

-- ------------------------------------------------------------
-- STORED PROCEDURE 1: Get all applications by status
-- ------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE GetApplicationsByStatus(IN p_status VARCHAR(40))
BEGIN
    SELECT
        ja.application_id,
        c.company_name,
        jr.role_title,
        jr.role_type,
        ja.applied_date,
        ja.source,
        ja.location
    FROM Job_Applications ja
    JOIN Companies c ON ja.company_id = c.company_id
    JOIN Job_Roles jr ON ja.role_id = jr.role_id
    JOIN Application_Status s ON ja.status_id = s.status_id
    WHERE s.status_name = p_status
    ORDER BY ja.applied_date DESC;
END $$

-- ------------------------------------------------------------
-- STORED PROCEDURE 2: Monthly summary report
-- ------------------------------------------------------------
CREATE PROCEDURE GetMonthlySummary(IN p_month VARCHAR(7))  -- format: 'YYYY-MM'
BEGIN
    SELECT
        COUNT(*) AS total_applications,
        SUM(CASE WHEN s.status_name = 'Offer'     THEN 1 ELSE 0 END) AS offers,
        SUM(CASE WHEN s.status_name = 'Interview' THEN 1 ELSE 0 END) AS interviews,
        SUM(CASE WHEN s.status_name = 'Rejected'  THEN 1 ELSE 0 END) AS rejections,
        SUM(CASE WHEN s.status_name = 'Ghosted'   THEN 1 ELSE 0 END) AS ghosted
    FROM Job_Applications ja
    JOIN Application_Status s ON ja.status_id = s.status_id
    WHERE DATE_FORMAT(ja.applied_date, '%Y-%m') = p_month;
END $$

-- ------------------------------------------------------------
-- STORED PROCEDURE 3: Company response tracker
-- ------------------------------------------------------------
CREATE PROCEDURE GetCompanyResponseRate()
BEGIN
    SELECT
        c.company_name,
        COUNT(ja.application_id) AS total_applied,
        SUM(CASE WHEN s.status_name NOT IN ('Applied', 'Ghosted') THEN 1 ELSE 0 END) AS responded,
        ROUND(
            SUM(CASE WHEN s.status_name NOT IN ('Applied', 'Ghosted') THEN 1 ELSE 0 END)
            * 100.0 / COUNT(ja.application_id), 1
        ) AS response_rate_pct
    FROM Job_Applications ja
    JOIN Companies c ON ja.company_id = c.company_id
    JOIN Application_Status s ON ja.status_id = s.status_id
    GROUP BY c.company_id, c.company_name
    HAVING total_applied >= 2
    ORDER BY response_rate_pct DESC;
END $$

DELIMITER ;

-- Sample usage:
-- CALL GetApplicationsByStatus('Interview');
-- CALL GetMonthlySummary('2025-01');
-- CALL GetCompanyResponseRate();
