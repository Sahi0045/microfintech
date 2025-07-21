import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import ProfileInformation from './components/ProfileInformation';
import ReputationDashboard from './components/ReputationDashboard';
import TransactionHistory from './components/TransactionHistory';
import DocumentManager from './components/DocumentManager';
import SettingsPanel from './components/SettingsPanel';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    businessType: "retail",
    businessDescription: `Small retail business specializing in handmade crafts and local artisan products. We've been serving the community for over 5 years and are looking to expand our inventory and reach through microfinance opportunities.`,
    website: "https://sarahscrafts.com",
    publicProfile: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    memberSince: "March 2023",
    did: "did:sol:8K7Qz9X2vN4mP1wR5tY3uE6sA9bC2dF7gH8jK1lM3nO4pQ5r",
    stats: {
      totalLoans: 12,
      successRate: 96,
      reputationScore: 94,
      totalVolume: "45,230"
    }
  });

  const [reputationData, setReputationData] = useState({
    overallScore: 94,
    achievements: [
      {
        id: 1,
        title: "Perfect Repayment",
        description: "100% on-time repayment record",
        icon: "Award",
        color: "text-success",
        bgColor: "bg-success/10",
        earnedDate: "June 2024"
      },
      {
        id: 2,
        title: "Trusted Borrower",
        description: "Completed 10+ successful loans",
        icon: "Shield",
        color: "text-primary",
        bgColor: "bg-primary/10",
        earnedDate: "May 2024"
      },
      {
        id: 3,
        title: "Community Builder",
        description: "Referred 5+ new users",
        icon: "Users",
        color: "text-accent",
        bgColor: "bg-accent/10",
        earnedDate: "April 2024"
      }
    ],
    suggestions: [
      {
        title: "Complete Phone Verification",
        description: "Verify your phone number to increase trust score and unlock higher loan limits",
        scoreIncrease: 3
      },
      {
        title: "Add Business Documentation",
        description: "Upload business registration documents to improve credibility",
        scoreIncrease: 5
      },
      {
        title: "Maintain Active Communication",
        description: "Respond to lender messages within 24 hours to boost communication score",
        scoreIncrease: 2
      }
    ]
  });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "loan_request",
      description: "Inventory Expansion Loan Request",
      amount: 5000,
      date: "2024-07-15T10:30:00Z",
      network: "solana",
      hash: "5KJp9X2vN4mP1wR5tY3uE6sA9bC2dF7gH8jK1lM3nO4pQ5r8S7T6U9V",
      status: "completed",
      explorerUrl: "https://explorer.solana.com/tx/5KJp9X2vN4mP1wR5tY3uE6sA9bC2dF7gH8jK1lM3nO4pQ5r8S7T6U9V"
    },
    {
      id: 2,
      type: "repayment",
      description: "Monthly Repayment - Loan #1247",
      amount: 520,
      date: "2024-07-10T14:15:00Z",
      network: "ethereum",
      hash: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3",
      status: "completed",
      explorerUrl: "https://etherscan.io/tx/0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3"
    },
    {
      id: 3,
      type: "loan_funding",
      description: "Equipment Purchase Loan Funded",
      amount: 3200,
      date: "2024-06-28T09:45:00Z",
      network: "solana",
      hash: "8M9N2pQ5r8S7T6U9V1wX4yZ3aB6cD9eF2gH5iJ8kL1mN4oP7qR0sT3uV6wX9yZ",
      status: "completed",
      explorerUrl: "https://explorer.solana.com/tx/8M9N2pQ5r8S7T6U9V1wX4yZ3aB6cD9eF2gH5iJ8kL1mN4oP7qR0sT3uV6wX9yZ"
    },
    {
      id: 4,
      type: "repayment",
      description: "Final Payment - Loan #1189",
      amount: 1850,
      date: "2024-06-20T16:20:00Z",
      network: "ethereum",
      hash: "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3b8D",
      status: "completed",
      explorerUrl: "https://etherscan.io/tx/0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4C0532925a3b8D"
    },
    {
      id: 5,
      type: "interest",
      description: "Interest Earned - Lending Pool",
      amount: 125,
      date: "2024-06-15T12:00:00Z",
      network: "solana",
      hash: "2dF7gH8jK1lM3nO4pQ5r8S7T6U9V1wX4yZ3aB6cD9eF2gH5iJ8kL1mN4oP7qR0s",
      status: "completed",
      explorerUrl: "https://explorer.solana.com/tx/2dF7gH8jK1lM3nO4pQ5r8S7T6U9V1wX4yZ3aB6cD9eF2gH5iJ8kL1mN4oP7qR0s"
    }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Business Registration Certificate.pdf",
      type: "pdf",
      size: 2048576,
      category: "business",
      uploadDate: "2024-06-15T10:30:00Z",
      ipfsHash: "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o",
      url: "https://example.com/document1.pdf",
      verified: true
    },
    {
      id: 2,
      name: "Tax Return 2023.pdf",
      type: "pdf",
      size: 3145728,
      category: "financial",
      uploadDate: "2024-06-10T14:20:00Z",
      ipfsHash: "QmPChd2hVbrJ1bfo675WPtiqTWENg9emH2aFbf9v9qN2Qb",
      url: "https://example.com/document2.pdf",
      verified: true
    },
    {
      id: 3,
      name: "Driver License.jpg",
      type: "image",
      size: 1048576,
      category: "identity",
      uploadDate: "2024-05-28T09:15:00Z",
      ipfsHash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      verified: true
    },
    {
      id: 4,
      name: "Bank Statement June 2024.pdf",
      type: "pdf",
      size: 1572864,
      category: "financial",
      uploadDate: "2024-07-01T11:45:00Z",
      ipfsHash: "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4",
      url: "https://example.com/document4.pdf",
      verified: false
    }
  ]);

  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    defaultNetwork: 'solana',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      publicProfile: true,
      showStats: true,
      showTransactions: false
    },
    security: {
      twoFactorEnabled: true,
      backupPhrase: "abandon ability able about above absent absorb abstract absurd abuse access accident"
    }
  });

  useEffect(() => {
    // Set page title
    document.title = "User Profile - DeFi Micro";
  }, []);

  const handleEditProfile = () => {
    setActiveTab('profile');
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  const handleDocumentUpload = (newDocument) => {
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleDocumentDelete = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleDocumentShare = (document) => {
    const shareUrl = `${window.location.origin}/shared-document/${document.ipfsHash}`;
    navigator.clipboard.writeText(shareUrl);
  };

  const handleSaveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileInformation
            userProfile={userProfile}
            onSave={handleSaveProfile}
          />
        );
      case 'reputation':
        return (
          <ReputationDashboard
            reputationData={reputationData}
          />
        );
      case 'transactions':
        return (
          <TransactionHistory
            transactions={transactions}
          />
        );
      case 'documents':
        return (
          <DocumentManager
            documents={documents}
            onUpload={handleDocumentUpload}
            onDelete={handleDocumentDelete}
            onShare={handleDocumentShare}
          />
        );
      case 'settings':
        return (
          <SettingsPanel
            settings={settings}
            onSave={handleSaveSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 lg:px-6">
        <NavigationBreadcrumbs />
        
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            userProfile={userProfile}
            onEditProfile={handleEditProfile}
          />
          
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;