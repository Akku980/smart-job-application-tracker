import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SOURCES = ['LinkedIn', 'Naukri', 'Company Site', 'Referral', 'Internshala', 'AngelList', 'Campus Drive'];
const DOMAINS  = ['Data Analytics', 'Software Dev', 'Web Dev', 'Data Science', 'ML/AI', 'Business Analysis', 'Consulting', 'IT', 'Operations', 'General'];
const STATUSES = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Rejected', 'Ghosted', 'Withdrawn'];
const LOCATIONS = ['Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Gurgaon', 'Noida', 'Remote'];

export default function AddApplication({ editApp, onDone }) {
  const isEdit = !!editApp;

  const [form, setForm] = useState({
    company_name:   editApp?.company_name   || '',
    role_title:     editApp?.role_title     || '',
    role_type:      editApp?.role_type      || 'full-time',
    domain:         editApp?.domain         || 'General',
    status_name:    editApp?.status_name    || 'Applied',
    applied_date:   editApp?.applied_date?.slice(0,10) || new Date().toISOString().slice(0,10),
    source:         editApp?.source         || 'LinkedIn',
    location:       editApp?.location       || 'Chennai',
    is_remote:      editApp?.is_remote      || false,
    notes:          editApp?.notes          || '',
    resume_version: editApp?.resume_version || '',
  });

  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.company_name.trim()) return setError('Company name is required');
    if (!form.role_title.trim())   return setError('Role title is required');
    setError('');
    setSaving(true);
    try {
      if (isEdit) {
        await axios.put(`/api/applications/${editApp.application_id}`, {
          status_name: form.status_name,
          notes: form.notes,
        });
      } else {
        await axios.post('/api/applications', form);
      }
      onDone();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">{isEdit ? 'Edit Application' : 'Add New Application'}</div>
          <div className="page-sub">{isEdit ? `Updating ${editApp.company_name}` : 'Log a new job application'}</div>
        </div>
        <button className="btn btn-secondary" onClick={onDone}>← Back</button>
      </div>

      <div className="card">
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input value={form.company_name} onChange={e => set('company_name', e.target.value)}
              placeholder="e.g. Zoho, Infosys" disabled={isEdit} />
          </div>

          <div className="form-group">
            <label>Role Title *</label>
            <input value={form.role_title} onChange={e => set('role_title', e.target.value)}
              placeholder="e.g. Data Analyst Intern" disabled={isEdit} />
          </div>

          <div className="form-group">
            <label>Role Type</label>
            <select value={form.role_type} onChange={e => set('role_type', e.target.value)} disabled={isEdit}>
              <option value="internship">Internship</option>
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Domain</label>
            <select value={form.domain} onChange={e => set('domain', e.target.value)} disabled={isEdit}>
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Current Status</label>
            <select value={form.status_name} onChange={e => set('status_name', e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Applied Date</label>
            <input type="date" value={form.applied_date} onChange={e => set('applied_date', e.target.value)} disabled={isEdit} />
          </div>

          <div className="form-group">
            <label>Source Platform</label>
            <select value={form.source} onChange={e => set('source', e.target.value)} disabled={isEdit}>
              {SOURCES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <select value={form.location} onChange={e => set('location', e.target.value)} disabled={isEdit}>
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Resume Version</label>
            <input value={form.resume_version} onChange={e => set('resume_version', e.target.value)}
              placeholder="e.g. v2_data" disabled={isEdit} />
          </div>

          <div className="form-group" style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="remote" checked={form.is_remote} onChange={e => set('is_remote', e.target.checked)} disabled={isEdit} />
            <label htmlFor="remote" style={{ fontSize: '14px', color: '#444', cursor: 'pointer' }}>Remote position</label>
          </div>

          <div className="form-group form-full">
            <label>Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
              placeholder="Any notes — referral contact, JD details, salary mentioned..." />
          </div>
        </div>

        <div style={{ marginTop: '22px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : isEdit ? '✅ Update Status' : '➕ Add Application'}
          </button>
          <button className="btn btn-secondary" onClick={onDone}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
