import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TransactionHistory = ({ transactions }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterNetwork, setFilterNetwork] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'loan_request', label: 'Loan Requests' },
    { value: 'loan_funding', label: 'Loan Funding' },
    { value: 'repayment', label: 'Repayments' },
    { value: 'interest', label: 'Interest Earned' }
  ];

  const networkOptions = [
    { value: 'all', label: 'All Networks' },
    { value: 'solana', label: 'Solana' },
    { value: 'ethereum', label: 'Ethereum' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date (Newest)' },
    { value: 'amount', label: 'Amount (Highest)' },
    { value: 'type', label: 'Type' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'loan_request': return 'FileText';
      case 'loan_funding': return 'DollarSign';
      case 'repayment': return 'ArrowUpRight';
      case 'interest': return 'TrendingUp';
      default: return 'Activity';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'loan_request': return 'text-primary';
      case 'loan_funding': return 'text-success';
      case 'repayment': return 'text-warning';
      case 'interest': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getNetworkIcon = (network) => {
    return network === 'solana' ? 'Zap' : 'Hexagon';
  };

  const getNetworkColor = (network) => {
    return network === 'solana' ? 'text-purple-600' : 'text-blue-600';
  };

  const filteredTransactions = transactions
    .filter(tx => filterType === 'all' || tx.type === filterType)
    .filter(tx => filterNetwork === 'all' || tx.network === filterNetwork)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Amount', 'Network', 'Transaction Hash', 'Status'],
      ...filteredTransactions.map(tx => [
        new Date(tx.date).toLocaleDateString(),
        tx.type.replace('_', ' '),
        tx.amount,
        tx.network,
        tx.hash,
        tx.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
              className="w-full sm:w-40"
            />
            
            <Select
              options={networkOptions}
              value={filterNetwork}
              onChange={setFilterNetwork}
              placeholder="Filter by network"
              className="w-full sm:w-40"
            />
            
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-40"
            />
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={exportTransactions}
              className="w-full sm:w-auto"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-card border border-border rounded-lg">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-muted/50 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Type Icon */}
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon
                        name={getTypeIcon(transaction.type)}
                        size={20}
                        className={getTypeColor(transaction.type)}
                      />
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">
                          {transaction.description}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Icon
                            name={getNetworkIcon(transaction.network)}
                            size={14}
                            className={getNetworkColor(transaction.network)}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {transaction.network}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <button
                          onClick={() => window.open(transaction.explorerUrl, '_blank')}
                          className="flex items-center space-x-1 hover:text-primary transition-smooth"
                        >
                          <span className="font-mono">{transaction.hash.slice(0, 8)}...{transaction.hash.slice(-6)}</span>
                          <Icon name="ExternalLink" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount and Status */}
                  <div className="text-right">
                    <div className="font-semibold text-foreground mb-1">
                      ${transaction.amount.toLocaleString()}
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${
                      transaction.status === 'completed'
                        ? 'bg-success/10 text-success'
                        : transaction.status === 'pending' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-success'
                          : transaction.status === 'pending' ?'bg-warning' :'bg-error'
                      }`} />
                      <span className="capitalize">{transaction.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredTransactions.length > 0 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="left">
            Load More Transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;