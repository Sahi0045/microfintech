import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistorySection = ({ paymentHistory, onViewReceipt, onExportHistory }) => {
  const [filter, setFilter] = useState('all'); // all, paid, failed
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getNetworkIcon = (network) => {
    switch (network) {
      case 'solana':
        return 'Zap';
      case 'ethereum':
        return 'Hexagon';
      default:
        return 'Link';
    }
  };

  const getNetworkColor = (network) => {
    switch (network) {
      case 'solana':
        return 'text-purple-600';
      case 'ethereum':
        return 'text-blue-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredHistory = paymentHistory.filter(payment => {
    if (filter === 'all') return true;
    if (filter === 'paid') return payment.status === 'completed';
    if (filter === 'failed') return payment.status === 'failed';
    return true;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortBy === 'date') {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
            <p className="text-sm text-muted-foreground mt-1">
              View all completed and failed payment transactions
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Filter Buttons */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'paid', label: 'Paid' },
                { key: 'failed', label: 'Failed' }
              ].map(filterOption => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-smooth ${
                    filter === filterOption.key
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onExportHistory}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Payment History</h4>
          <p className="text-muted-foreground">
            {filter === 'all' ?'No payments have been processed yet.'
              : `No ${filter} payments found.`
            }
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                    >
                      <span>Date</span>
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
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Network</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Transaction</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((payment) => (
                  <tr key={payment.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                    <td className="p-4">
                      <div className="text-sm text-foreground">{payment.date}</div>
                      <div className="text-xs text-muted-foreground">{payment.time}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono font-medium text-foreground">${payment.amount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Payment #{payment.installment}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Icon name={getNetworkIcon(payment.network)} size={16} className={getNetworkColor(payment.network)} />
                        <span className="text-sm text-foreground capitalize">{payment.network}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {payment.txHash.slice(0, 8)}...{payment.txHash.slice(-6)}
                        </span>
                        <button
                          onClick={() => window.open(payment.explorerUrl, '_blank')}
                          className="text-primary hover:text-primary/80 transition-smooth"
                        >
                          <Icon name="ExternalLink" size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                        <Icon name={getStatusIcon(payment.status)} size={12} />
                        <span className="capitalize">{payment.status}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {payment.status === 'completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewReceipt(payment)}
                            iconName="FileText"
                            iconPosition="left"
                          >
                            Receipt
                          </Button>
                        )}
                        {payment.status === 'failed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('View error details')}
                            iconName="AlertCircle"
                            iconPosition="left"
                          >
                            Details
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
            {sortedHistory.map((payment) => (
              <div key={payment.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={getNetworkIcon(payment.network)} size={16} className={getNetworkColor(payment.network)} />
                    <span className="font-medium text-foreground">Payment #{payment.installment}</span>
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                    <Icon name={getStatusIcon(payment.status)} size={12} />
                    <span className="capitalize">{payment.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <div className="font-medium text-foreground">{payment.date}</div>
                    <div className="text-xs text-muted-foreground">{payment.time}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount</span>
                    <div className="font-mono font-medium text-foreground">${payment.amount.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {payment.txHash.slice(0, 8)}...{payment.txHash.slice(-6)}
                    </span>
                    <button
                      onClick={() => window.open(payment.explorerUrl, '_blank')}
                      className="text-primary hover:text-primary/80 transition-smooth"
                    >
                      <Icon name="ExternalLink" size={12} />
                    </button>
                  </div>
                  
                  {payment.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReceipt(payment)}
                      iconName="FileText"
                      iconPosition="left"
                    >
                      Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistorySection;