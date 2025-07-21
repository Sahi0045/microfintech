import React from 'react';
import Icon from '../../../components/AppIcon';

const LoanStatusBadge = ({ status, fundingProgress }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active Funding',
          icon: 'TrendingUp',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
          borderColor: 'border-success/20'
        };
      case 'funded':
        return {
          label: 'Fully Funded',
          icon: 'CheckCircle',
          bgColor: 'bg-primary/10',
          textColor: 'text-primary',
          borderColor: 'border-primary/20'
        };
      case 'repaying':
        return {
          label: 'Repaying',
          icon: 'Clock',
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
          borderColor: 'border-warning/20'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: 'CheckCircle2',
          bgColor: 'bg-accent/10',
          textColor: 'text-accent',
          borderColor: 'border-accent/20'
        };
      default:
        return {
          label: 'Pending',
          icon: 'Clock',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          borderColor: 'border-border'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      <Icon name={config.icon} size={14} />
      <span className="text-sm font-medium">{config.label}</span>
      {status === 'active' && (
        <span className="text-xs opacity-75">({fundingProgress}%)</span>
      )}
    </div>
  );
};

export default LoanStatusBadge;