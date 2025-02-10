import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ApplicationsTable from './components/ApplicationsTable';
import AddApplication from './components/AddApplication';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [editApp, setEditApp] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh(r => r + 1);

  return (
    <div className="app-shell">
      <Navbar page={page} setPage={setPage} />
      <main className="main-content">
        {page === 'dashboard'    && <Dashboard key={refresh} />}
        {page === 'applications' && <ApplicationsTable key={refresh} onEdit={app => { setEditApp(app); setPage('add'); }} onRefresh={triggerRefresh} />}
        {page === 'add'          && <AddApplication editApp={editApp} onDone={() => { setEditApp(null); setPage('applications'); triggerRefresh(); }} />}
      </main>
    </div>
  );
}
