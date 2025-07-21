import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import WelcomeCard from './components/WelcomeCard';
import QuickActionsCard from './components/QuickActionsCard';
import StatsOverviewCard from './components/StatsOverviewCard';
import RecentActivityCard from './components/RecentActivityCard';
import NetworkStatusCard from './components/NetworkStatusCard';
import UpcomingPaymentsCard from './components/UpcomingPaymentsCard';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('borrower'); // 'borrower' or 'lender'
  const [userName, setUserName] = useState('');
  const [walletBalance, setWalletBalance] = useState('0.00');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app this would come from authentication/profile
      const mockUserData = {
        role: localStorage.getItem('userRole') || 'borrower',
        name: localStorage.getItem('userName') || 'Maria Santos',
        walletBalance: localStorage.getItem('walletBalance') || '1,234.56'
      };
      
      setUserRole(mockUserData.role);
      setUserName(mockUserData.name);
      setWalletBalance(mockUserData.walletBalance);
      
      // Mock stats based on user role
      if (mockUserData.role === 'borrower') {
        setStats({
          activeLoans: '2',
          totalBorrowed: '3,500',
          reputationScore: '4.8',
          nextPayment: '450'
        });
      } else {
        setStats({
          activeInvestments: '8',
          totalInvested: '12,750',
          monthlyReturns: '287',
          successRate: '94.2'
        });
      }
      
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const toggleUserRole = () => {
    const newRole = userRole === 'borrower' ? 'lender' : 'borrower';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    // Update mock name based on role
    const newName = newRole === 'borrower' ? 'Maria Santos' : 'David Chen';
    setUserName(newName);
    localStorage.setItem('userName', newName);
    
    // Update stats
    if (newRole === 'borrower') {
      setStats({
        activeLoans: '2',
        totalBorrowed: '3,500',
        reputationScore: '4.8',
        nextPayment: '450'
      });
    } else {
      setStats({
        activeInvestments: '8',
        totalInvested: '12,750',
        monthlyReturns: '287',
        successRate: '94.2'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="h-48 bg-muted rounded-lg"></div>
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Floating SVGs for Depth */}
      <svg className="absolute left-0 top-0 w-96 h-96 opacity-20 animate-float-slow pointer-events-none z-0" viewBox="0 0 400 400" fill="none"><ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#dashGrad1)" /><defs><linearGradient id="dashGrad1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#927A5E" stopOpacity="0.18" /><stop offset="1" stopColor="#D4493D" stopOpacity="0.12" /></linearGradient></defs></svg>
      <svg className="absolute right-0 bottom-0 w-96 h-96 opacity-20 animate-float-slow pointer-events-none z-0" style={{animationDelay: '2s'}} viewBox="0 0 400 400" fill="none"><ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#dashGrad2)" /><defs><linearGradient id="dashGrad2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1E1E1E" stopOpacity="0.18" /><stop offset="1" stopColor="#927A5E" stopOpacity="0.12" /></linearGradient></defs></svg>
      <Header />
      <div className="container mx-auto px-4 py-8 relative z-10 animate-fadeInUp">
        <NavigationBreadcrumbs />
        {/* Role Toggle for Demo */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-800">
                <strong>Demo Mode:</strong> Switch between borrower and lender views
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Current role: <span className="capitalize font-medium">{userRole}</span>
              </p>
            </div>
            <button
              onClick={toggleUserRole}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-smooth text-sm font-medium"
            >
              Switch to {userRole === 'borrower' ? 'Lender' : 'Borrower'}
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Welcome Section */}
            <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <WelcomeCard 
                userRole={userRole}
                userName={userName}
                walletBalance={walletBalance}
              />
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <StatsOverviewCard 
                userRole={userRole}
                stats={stats}
              />
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.5s'}}>
              <RecentActivityCard userRole={userRole} />
            </div>
          </div>
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <QuickActionsCard userRole={userRole} />
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.7s'}}>
              <UpcomingPaymentsCard userRole={userRole} />
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.8s'}}>
              <NetworkStatusCard />
            </div>
          </div>
        </div>
        {/* Mobile-specific bottom spacing */}
        <div className="h-20 lg:hidden"></div>
      </div>
    </div>
  );
};

export default Dashboard;