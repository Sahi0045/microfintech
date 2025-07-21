import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverviewCard = ({ userRole, stats }) => {
  const borrowerStats = [
    {
      label: 'Active Loans',
      value: stats.activeLoans || '2',
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+1 this month'
    },
    {
      label: 'Total Borrowed',
      value: `$${stats.totalBorrowed || '3,500'}`,
      icon: 'DollarSign',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: 'USDC'
    },
    {
      label: 'Reputation Score',
      value: stats.reputationScore || '4.8',
      icon: 'Star',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '/5.0'
    },
    {
      label: 'Next Payment',
      value: stats.nextPayment || '$450',
      icon: 'Calendar',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'Due in 5 days'
    }
  ];

  const lenderStats = [
    {
      label: 'Active Investments',
      value: stats.activeInvestments || '8',
      icon: 'TrendingUp',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+2 this month'
    },
    {
      label: 'Total Invested',
      value: `$${stats.totalInvested || '12,750'}`,
      icon: 'DollarSign',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: 'USDC'
    },
    {
      label: 'Monthly Returns',
      value: `$${stats.monthlyReturns || '287'}`,
      icon: 'PieChart',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+12.3%'
    },
    {
      label: 'Success Rate',
      value: stats.successRate || '94.2%',
      icon: 'Target',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: 'Repayment rate'
    }
  ];

  const displayStats = userRole === 'borrower' ? borrowerStats : lenderStats;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Overview</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayStats.map((stat, index) => (
          <div key={index} className="p-6 bg-card/80 rounded-2xl shadow-xl border border-border flex flex-col gap-2 items-start animate-fadeInUp" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
            <div className="flex items-center justify-between w-full mb-2">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${stat.bgColor} animate-popIn`}>
                <Icon name={stat.icon} size={28} className={stat.color} />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{stat.change}</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground font-mono tracking-tight">{stat.value}</p>
              <p className="text-base text-muted-foreground font-semibold mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverviewCard;