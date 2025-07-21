import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentSummaryStats = ({ stats, userType }) => {
  const statCards = [
    {
      title: 'Total Paid',
      value: `$${stats.totalPaid.toLocaleString()}`,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      description: `${stats.paidCount} payments completed`
    },
    {
      title: 'Remaining Balance',
      value: `$${stats.remainingBalance.toLocaleString()}`,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      description: `${stats.remainingCount} payments left`
    },
    {
      title: userType === 'borrower' ? 'Next Payment' : 'Next Expected',
      value: `$${stats.nextPayment.toLocaleString()}`,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      description: stats.nextPaymentDate
    },
    {
      title: 'Overdue Amount',
      value: `$${stats.overdueAmount.toLocaleString()}`,
      icon: 'AlertTriangle',
      color: stats.overdueAmount > 0 ? 'text-error' : 'text-muted-foreground',
      bgColor: stats.overdueAmount > 0 ? 'bg-error/10' : 'bg-muted/10',
      borderColor: stats.overdueAmount > 0 ? 'border-error/20' : 'border-border',
      description: stats.overdueAmount > 0 ? `${stats.overdueCount} overdue payments` : 'No overdue payments'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border rounded-lg p-4 transition-smooth hover:shadow-soft ${stat.borderColor}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            {stat.title === 'Overdue Amount' && stats.overdueAmount > 0 && (
              <div className="flex items-center space-x-1 text-xs text-error">
                <Icon name="AlertCircle" size={12} />
                <span>Action Required</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
          
          {/* Progress indicator for specific stats */}
          {stat.title === 'Total Paid' && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{Math.round((stats.totalPaid / (stats.totalPaid + stats.remainingBalance)) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.round((stats.totalPaid / (stats.totalPaid + stats.remainingBalance)) * 100)}%`
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {stat.title === 'Next Payment' && stats.daysUntilNext && (
            <div className="mt-3 flex items-center space-x-2">
              <Icon name="Clock" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {stats.daysUntilNext > 0 ? `${stats.daysUntilNext} days remaining` : 'Due today'}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentSummaryStats;