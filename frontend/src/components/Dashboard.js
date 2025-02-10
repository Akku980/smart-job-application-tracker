import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from 'recharts';

const STATUS_COLORS = {
  Applied: '#4361ee', Shortlisted: '#f8961e', Interview: '#4cc9f0',
  Offer: '#2dc653', Rejected: '#ef233c', Ghosted: '#adb5bd', Withdrawn: '#9d4edd'
};

const KPI = ({ label, value, sub, color }) => (
  <div className="kpi-card" style={{ borderTop: `3px solid ${color || '#4361ee'}` }}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value" style={{ color: color || '#1a1a2e' }}>{value ?? '—'}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

export default function Dashboard() {
  const [overview, setOverview]   = useState(null);
  const [byStatus, setByStatus]   = useState([]);
  const [monthly,  setMonthly]    = useState([]);
  const [companies,setCompanies]  = useState([]);
  const [sources,  setSources]    = useState([]);
  const [loading,  setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/stats/overview'),
      axios.get('/api/stats/by-status'),
      axios.get('/api/stats/monthly'),
      axios.get('/api/stats/top-companies'),
      axios.get('/api/stats/by-source'),
    ]).then(([ov, st, mo, co, so]) => {
      setOverview(ov.data);
      setByStatus(st.data);
      setMonthly(mo.data);
      setCompanies(co.data);
      setSources(so.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#aaa' }}>
      Loading dashboard...
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">Your job search at a glance</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPI label="Total Applications" value={overview?.total_applications} color="#4361ee" />
        <KPI label="Offers Received"    value={overview?.total_offers}       color="#2dc653" sub={`${overview?.offer_rate}% offer rate`} />
        <KPI label="In Interview"       value={overview?.in_interview}       color="#4cc9f0" sub={`${overview?.response_rate}% response rate`} />
        <KPI label="Rejected"           value={overview?.total_rejections}   color="#ef233c" />
        <KPI label="Pending / Applied"  value={overview?.pending}            color="#f8961e" />
        <KPI label="Ghosted"            value={overview?.ghosted}            color="#adb5bd" />
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byStatus} dataKey="count" nameKey="status_name" cx="50%" cy="50%" outerRadius={80} label={({ status_name, percent }) => `${status_name} ${(percent * 100).toFixed(0)}%`}>
                {byStatus.map((entry) => (
                  <Cell key={entry.status_name} fill={STATUS_COLORS[entry.status_name] || '#ccc'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Monthly Applications</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4361ee" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Top Companies Applied</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={companies} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="company_name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="applications" fill="#4361ee" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Applications by Source</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sources}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="source" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#4cc9f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
