import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentScheduleTable = ({ payments, userType, onMakePayment, onViewDetails }) => {
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success/10 text-success border-success/20';
      case 'overdue':
        return 'bg-error/10 text-error border-error/20';
      case 'upcoming':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'pending':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle';
      case 'overdue':
        return 'AlertCircle';
      case 'upcoming':
        return 'Clock';
      case 'pending':
        return 'Timer';
      default:
        return 'Circle';
    }
  };

  const sortedPayments = [...payments].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortBy === 'dueDate') {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    }
    
    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Payment Schedule</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Track your payment timeline and manage upcoming payments
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('installment')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Payment #</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Due Date</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Amount</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Principal</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Interest</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment) => (
              <tr key={payment.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <span className="font-medium text-foreground">#{payment.installment}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{payment.dueDate}</div>
                  <div className="text-xs text-muted-foreground">{payment.daysToDue}</div>
                </td>
                <td className="p-4">
                  <span className="font-mono font-medium text-foreground">${payment.amount.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-muted-foreground">${payment.principal.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-muted-foreground">${payment.interest.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                    <Icon name={getStatusIcon(payment.status)} size={12} />
                    <span className="capitalize">{payment.status}</span>
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {userType === 'borrower' && payment.status === 'upcoming' && (
                      <Button
                        size="sm"
                        onClick={() => onMakePayment(payment)}
                        iconName="CreditCard"
                        iconPosition="left"
                      >
                        Pay Now
                      </Button>
                    )}
                    {payment.status === 'paid' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(payment)}
                        iconName="ExternalLink"
                        iconPosition="left"
                      >
                        Receipt
                      </Button>
                    )}
                    {payment.status === 'overdue' && userType === 'borrower' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onMakePayment(payment)}
                        iconName="AlertTriangle"
                        iconPosition="left"
                      >
                        Pay Late
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedPayments.map((payment) => (
          <div key={payment.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Payment #{payment.installment}</span>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                <Icon name={getStatusIcon(payment.status)} size={12} />
                <span className="capitalize">{payment.status}</span>
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Due Date</span>
                <div className="font-medium text-foreground">{payment.dueDate}</div>
                <div className="text-xs text-muted-foreground">{payment.daysToDue}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Amount</span>
                <div className="font-mono font-medium text-foreground">${payment.amount.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Principal</span>
                <div className="font-mono text-foreground">${payment.principal.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Interest</span>
                <div className="font-mono text-foreground">${payment.interest.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2">
              {userType === 'borrower' && payment.status === 'upcoming' && (
                <Button
                  size="sm"
                  onClick={() => onMakePayment(payment)}
                  iconName="CreditCard"
                  iconPosition="left"
                  fullWidth
                >
                  Pay Now
                </Button>
              )}
              {payment.status === 'paid' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(payment)}
                  iconName="ExternalLink"
                  iconPosition="left"
                  fullWidth
                >
                  View Receipt
                </Button>
              )}
              {payment.status === 'overdue' && userType === 'borrower' && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onMakePayment(payment)}
                  iconName="AlertTriangle"
                  iconPosition="left"
                  fullWidth
                >
                  Pay Late Fee
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentScheduleTable;