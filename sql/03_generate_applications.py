import csv, random
from datetime import date, timedelta

random.seed(42)

companies = list(range(1, 51))
roles = list(range(1, 21))
resumes = [1, 2, 3, 4]
statuses = {
    1: 'Applied', 2: 'Shortlisted', 3: 'Interview',
    4: 'Offer', 5: 'Rejected', 6: 'Ghosted', 7: 'Withdrawn'
}
sources = ['LinkedIn', 'Naukri', 'Company Site', 'Referral', 'Internshala', 'AngelList', 'Campus Drive']
locations = ['Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Gurgaon', 'Noida', 'Remote']

start_date = date(2024, 8, 1)
end_date = date(2025, 5, 1)

def random_date(start, end):
    delta = end - start
    return start + timedelta(days=random.randint(0, delta.days))

# Weighted status distribution — realistic for job hunting
status_weights = [30, 15, 20, 5, 22, 6, 2]  # Applied dominates, Offer is rare

applications = []
for i in range(1, 401):
    company_id = random.choice(companies)
    role_id = random.choice(roles)
    resume_id = random.choice(resumes)
    recruiter_id = random.choice([None, None, None, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    status_id = random.choices(list(statuses.keys()), weights=status_weights, k=1)[0]
    applied_date = random_date(start_date, end_date)
    source = random.choice(sources)
    location = random.choice(locations)
    is_remote = 1 if location == 'Remote' else 0
    applications.append([i, company_id, role_id, resume_id, recruiter_id,
                         status_id, applied_date, source, location, is_remote])

with open('/home/claude/sjat/dataset/applications_raw.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['application_id','company_id','role_id','resume_id','recruiter_id',
                'status_id','applied_date','source','location','is_remote'])
    w.writerows(applications)

# Generate interviews for shortlisted / interview / offer applications
interviews = []
iid = 1
for app in applications:
    app_id, status_id = app[0], app[5]
    if status_id in [2, 3, 4]:
        rounds = 1 if status_id == 2 else random.randint(1, 3)
        for r in range(1, rounds + 1):
            itype = random.choice(['HR', 'Technical', 'Assignment', 'Final'])
            idate = app[6] + timedelta(days=random.randint(7, 30))
            mode = random.choice(['Online', 'Phone', 'In-person'])
            result = 'Passed' if (status_id == 4 and r == rounds) else random.choice(['Passed', 'Waiting', 'Failed'])
            interviews.append([iid, app_id, r, itype, idate, mode, result])
            iid += 1

with open('/home/claude/sjat/dataset/interviews_raw.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['interview_id','application_id','interview_round','interview_type',
                'interview_date','interview_mode','result'])
    w.writerows(interviews)

# Generate follow-ups
followups = []
fid = 1
for app in applications:
    if random.random() < 0.35:  # 35% of apps got a follow-up
        fdate = app[6] + timedelta(days=random.randint(10, 25))
        method = random.choice(['Email', 'LinkedIn', 'Email'])
        response = random.choice([0, 0, 1])
        followups.append([fid, app[0], fdate, method, response])
        fid += 1

with open('/home/claude/sjat/dataset/followups_raw.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['followup_id','application_id','followup_date','method','response_received'])
    w.writerows(followups)

print(f"Generated {len(applications)} applications, {len(interviews)} interviews, {len(followups)} follow-ups")
