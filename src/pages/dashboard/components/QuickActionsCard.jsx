import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionsCard = ({ userRole }) => {
  const navigate = useNavigate();

  const borrowerActions = [
    {
      label: 'Create Loan Request',
      description: 'Submit a new loan application',
      icon: 'Plus',
      variant: 'accent',
      elevation: 'soft',
      path: '/create-loan-request'
    },
    {
      label: 'View My Loans',
      description: 'Track your active loans',
      icon: 'FileText',
      variant: 'secondary',
      elevation: 'soft',
      path: '/loan-details'
    },
    {
      label: 'Manage Repayments',
      description: 'Make payments and view history',
      icon: 'CreditCard',
      variant: 'gradient',
      elevation: 'elevated',
      path: '/repayment-management'
    }
  ];

  const lenderActions = [
    {
      label: 'Browse Loans',
      description: 'Find investment opportunities',
      icon: 'Search',
      variant: 'accent',
      elevation: 'soft',
      path: '/loan-details'
    },
    {
      label: 'My Portfolio',
      description: 'Track your investments',
      icon: 'PieChart',
      variant: 'secondary',
      elevation: 'soft',
      path: '/user-profile'
    },
    {
      label: 'Earnings Report',
      description: 'View returns and analytics',
      icon: 'TrendingUp',
      variant: 'gradient',
      elevation: 'elevated',
      path: '/user-profile'
    }
  ];

  const actions = userRole === 'borrower' ? borrowerActions : lenderActions;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-elevated hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl">
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      
      <div className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="group flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all duration-300 border border-transparent hover:border-accent/20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl group-hover:bg-accent/10 transition-colors duration-300">
                <Icon name={action.icon} size={18} className="text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{action.label}</h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </div>
            <Button
              variant={action.variant === 'accent' || action.variant === 'gradient' ? 'accent' : 'outline'}
              size="sm"
              elevation={action.elevation}
              onClick={() => navigate(action.path)}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
              shimmer={action.variant === 'accent' || action.variant === 'gradient'}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Go
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;