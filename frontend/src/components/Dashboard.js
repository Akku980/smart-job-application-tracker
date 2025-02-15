import React, { useEffect, useState } from 'react';
import { MOCK_OVERVIEW, MOCK_BY_STATUS, MOCK_MONTHLY, MOCK_COMPANIES, MOCK_SOURCES } from '../api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';

const STATUS_COLORS = {
  Applied:'#4361ee', Shortlisted:'#f8961e', Interview:'#4cc9f0',
  Offer:'#2dc653', Rejected:'#ef233c', Ghosted:'#adb5bd', Withdrawn:'#9d4edd'
};

const KPI = ({ label, value, sub, color }) => (
  <div className="kpi-card" style={{ borderTop: `3px solid ${color||'#4361ee'}` }}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value" style={{ color: color||'#1a1a2e' }}>{value ?? '—'}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

export default function Dashboard() {
  const [overview]  = useState(MOCK_OVERVIEW);
  const [byStatus]  = useState(MOCK_BY_STATUS);
  const [monthly]   = useState(MOCK_MONTHLY);
  const [companies] = useState(MOCK_COMPANIES);
  const [sources]   = useState(MOCK_SOURCES);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">Your job search at a glance — {overview.total_applications} applications tracked</div>
        </div>
        <div style={{fontSize:'12px',color:'#aaa',background:'#f8f9fa',padding:'6px 12px',borderRadius:'8px'}}>
          📊 Demo data — connect MySQL for live data
        </div>
      </div>

      <div className="kpi-grid">
        <KPI label="Total Applications" value={overview.total_applications} color="#4361ee" />
        <KPI label="Offers Received"    value={overview.total_offers}       color="#2dc653" sub={`${overview.offer_rate}% offer rate`} />
        <KPI label="In Interview"       value={overview.in_interview}       color="#4cc9f0" sub={`${overview.response_rate}% response rate`} />
        <KPI label="Rejected"           value={overview.total_rejections}   color="#ef233c" />
        <KPI label="Pending / Applied"  value={overview.pending}            color="#f8961e" />
        <KPI label="Ghosted"            value={overview.ghosted}            color="#adb5bd" />
      </div>

      <div className="charts-row">
        <div className="card">
          <h3 style={{fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byStatus} dataKey="count" nameKey="status_name" cx="50%" cy="50%" outerRadius={80}
                label={({status_name,percent})=>`${status_name} ${(percent*100).toFixed(0)}%`}>
                {byStatus.map(e=><Cell key={e.status_name} fill={STATUS_COLORS[e.status_name]||'#ccc'}/>)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>Monthly Applications</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Line type="monotone" dataKey="count" stroke="#4361ee" strokeWidth={2} dot={{r:3}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row">
        <div className="card">
          <h3 style={{fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>Top Companies Applied</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={companies} layout="vertical">
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis dataKey="company_name" type="category" tick={{fontSize:11}} width={100}/>
              <Tooltip/>
              <Bar dataKey="applications" fill="#4361ee" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>Applications by Source</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sources}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="source" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Bar dataKey="count" fill="#4cc9f0" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
