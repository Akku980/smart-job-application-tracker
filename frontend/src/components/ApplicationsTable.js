import React, { useState } from 'react';
import { MOCK_APPLICATIONS } from '../api';

export default function ApplicationsTable({ onEdit, onRefresh }) {
  const [apps, setApps] = useState(MOCK_APPLICATIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All','Applied','Shortlisted','Interview','Offer','Rejected','Ghosted','Withdrawn'];

  const filtered = apps.filter(a => {
    const matchStatus = statusFilter === 'All' || a.status_name === statusFilter;
    const matchSearch = !search ||
      a.company_name.toLowerCase().includes(search.toLowerCase()) ||
      a.role_title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this application?')) return;
    setApps(apps.filter(a => a.application_id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">All Applications</div>
          <div className="page-sub">{filtered.length} records shown</div>
        </div>
      </div>

      <div className="filter-row">
        <input className="search-bar" placeholder="Search company or role..."
          value={search} onChange={e=>setSearch(e.target.value)}/>
        {statuses.map(s=>(
          <button key={s} className="btn btn-sm" onClick={()=>setStatusFilter(s)}
            style={{background:statusFilter===s?'#4361ee':'#f1f3f9',color:statusFilter===s?'#fff':'#555'}}>
            {s}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          {filtered.length===0 ? (
            <div className="empty-state"><div style={{fontSize:'40px',marginBottom:'10px'}}>📭</div><div>No applications found</div></div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Company</th><th>Role</th><th>Type</th>
                  <th>Status</th><th>Source</th><th>Location</th><th>Applied Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app,i)=>(
                  <tr key={app.application_id}>
                    <td style={{color:'#aaa',fontSize:'12px'}}>{i+1}</td>
                    <td style={{fontWeight:'500'}}>{app.company_name}</td>
                    <td>{app.role_title}</td>
                    <td><span style={{fontSize:'12px',background:'#f0f2ff',color:'#4361ee',padding:'2px 8px',borderRadius:'10px'}}>{app.role_type}</span></td>
                    <td><span className={`badge badge-${app.status_name}`}>{app.status_name}</span></td>
                    <td style={{fontSize:'13px',color:'#666'}}>{app.source}</td>
                    <td style={{fontSize:'13px',color:'#666'}}>{app.location}{app.is_remote?' 🏠':''}</td>
                    <td style={{fontSize:'13px',color:'#888'}}>{new Date(app.applied_date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</td>
                    <td>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button className="btn btn-secondary btn-sm" onClick={()=>onEdit(app)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(app.application_id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
