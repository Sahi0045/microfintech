import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'reputation', label: 'Reputation', icon: 'Star' },
    { id: 'transactions', label: 'Transactions', icon: 'History' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-smooth border-b-2 ${
              activeTab === tab.id
                ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;