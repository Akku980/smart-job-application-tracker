import React from 'react';

export default function Navbar({ page, setPage }) {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #eee',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>💼</span>
        <span style={{ fontWeight: '700', fontSize: '16px', color: '#1a1a2e' }}>
          Job Application Tracker
        </span>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {[
          { key: 'dashboard',    label: '📊 Dashboard' },
          { key: 'applications', label: '📋 Applications' },
          { key: 'add',         label: '➕ Add New' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: page === key ? '#4361ee' : 'transparent',
              color: page === key ? '#fff' : '#555',
              fontWeight: page === key ? '600' : '400',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
