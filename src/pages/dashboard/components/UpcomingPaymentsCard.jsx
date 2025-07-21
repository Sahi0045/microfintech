import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPaymentsCard = ({ userRole }) => {
  const navigate = useNavigate();

  const borrowerPayments = [
    {
      id: 1,
      loanId: 'LOAN-2024-001',
      amount: '$450.00',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      lender: 'Global Impact Fund',
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: 2,
      loanId: 'LOAN-2024-002',
      amount: '$275.50',
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      lender: 'Sarah Johnson',
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: 3,
      loanId: 'LOAN-2023-045',
      amount: '$180.00',
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      lender: 'Michael Chen',
      status: 'upcoming',
      priority: 'low'
    }
  ];

  const lenderReturns = [
    {
      id: 1,
      loanId: 'LOAN-2024-003',
      amount: '$127.50',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      borrower: 'Maria Santos',
      status: 'expected',
      priority: 'high'
    },
    {
      id: 2,
      loanId: 'LOAN-2024-007',
      amount: '$89.25',
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      borrower: 'Ahmed Hassan',
      status: 'expected',
      priority: 'medium'
    },
    {
      id: 3,
      loanId: 'LOAN-2024-012',
      amount: '$234.75',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      borrower: 'Elena Rodriguez',
      status: 'expected',
      priority: 'medium'
    }
  ];

  const payments = userRole === 'borrower' ? borrowerPayments : lenderReturns;

  const formatDaysUntilDue = (dueDate) => {
    const now = new Date();
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 7) return `Due in ${diffDays} days`;
    return `Due in ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle2';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {userRole === 'borrower' ? 'Upcoming Payments' : 'Expected Returns'}
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/repayment-management')}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {payments.map((payment) => (
          <div key={payment.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-foreground font-mono">
                    {payment.loanId}
                  </span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(payment.priority)}`}>
                    <Icon name={getStatusIcon(payment.priority)} size={10} />
                    <span className="capitalize">{payment.priority}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-foreground font-mono">
                    {payment.amount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDaysUntilDue(payment.dueDate)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {userRole === 'borrower' ? `To: ${payment.lender}` : `From: ${payment.borrower}`}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Due: {payment.dueDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              {userRole === 'borrower' && (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate('/repayment-management')}
                  iconName="CreditCard"
                  iconPosition="left"
                  iconSize={14}
                  shimmer={true}
                  className="ml-4"
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {payments.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {userRole === 'borrower' ? 'No upcoming payments' : 'No expected returns'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingPaymentsCard;