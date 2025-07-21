import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeCard = ({ userRole, userName, walletBalance }) => {
  const navigate = useNavigate();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    
    return `${greeting}, ${userName}!`;
  };

  const getPrimaryAction = () => {
    if (userRole === 'borrower') {
      return {
        label: 'Create New Loan Request',
        icon: 'Plus',
        path: '/create-loan-request',
        variant: 'accent'
      };
    } else {
      return {
        label: 'Browse Investment Opportunities',
        icon: 'Search',
        path: '/loan-details',
        variant: 'accent'
      };
    }
  };

  const getSecondaryAction = () => {
    if (userRole === 'borrower') {
      return {
        label: 'View Profile',
        icon: 'User',
        path: '/user-profile',
        variant: 'secondary'
      };
    } else {
      return {
        label: 'Portfolio Overview',
        icon: 'PieChart',
        path: '/user-profile',
        variant: 'secondary'
      };
    }
  };

  const primaryAction = getPrimaryAction();
  const secondaryAction = getSecondaryAction();

  return (
    <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-8 shadow-elevated hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {getWelcomeMessage()}
            </h2>
            <p className="text-muted-foreground">
              Welcome back to your {userRole} dashboard. Here's your current status.
            </p>
          </div>
          
          {/* Wallet Balance */}
          <div className="flex items-center space-x-3 p-4 bg-accent/10 rounded-xl border border-accent/20">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-xl">
              <Icon name="Wallet" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="text-xl font-bold text-accent">${walletBalance} USDT</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-3">
          <Button
            variant="accent"
            size="lg"
            elevation="elevated"
            onClick={() => navigate(primaryAction.path)}
            iconName={primaryAction.icon}
            iconPosition="left"
            shimmer={true}
            className="w-full sm:w-auto lg:w-48"
          >
            {primaryAction.label}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            elevation="soft"
            onClick={() => navigate(secondaryAction.path)}
            iconName={secondaryAction.icon}
            iconPosition="left"
            shimmer={false}
            className="w-full sm:w-auto lg:w-48"
          >
            {secondaryAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;