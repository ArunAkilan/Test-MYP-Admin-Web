import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const tabNames = ['Overview', 'Users', 'Settings', 'Reports'];

const Tabs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  // Load saved tab on first render
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && tabNames.includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  // Recheck token on every tab change
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(`[Tab Switch] Checking token... Current token: ${token}`);

    if (token !== 'demo-token') {
      console.warn('Invalid or missing token! Redirecting to login...');
      navigate('/login');
    }

    // Save the current tab
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab, navigate]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {tabNames.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: tab === activeTab ? '#ddd' : '#fff',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>{activeTab} Content</h3>
        <p>This is the {activeTab} tab.</p>
      </div>
    </div>
  );
};

export default Tabs;
