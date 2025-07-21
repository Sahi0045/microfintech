import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityCard = ({ userRole }) => {
  const borrowerActivities = [
    {
      id: 1,
      type: 'loan_funded',
      title: 'Loan Request Funded',
      description: 'Your $1,500 loan request has been fully funded by 3 lenders',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      txHash: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4'
    },
    {
      id: 2,
      type: 'payment_made',
      title: 'Payment Processed',
      description: 'Monthly payment of $450 successfully processed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: 'CreditCard',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      txHash: '0x8f3e2a1b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f'
    },
    {
      id: 3,
      type: 'reputation_update',
      title: 'Reputation Score Updated',
      description: 'Your reputation increased to 4.8/5.0 after successful payment',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: 'Star',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 4,
      type: 'document_verified',
      title: 'Documents Verified',
      description: 'Your KYC documents have been successfully verified',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      icon: 'Shield',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const lenderActivities = [
    {
      id: 1,
      type: 'investment_return',
      title: 'Investment Return Received',
      description: 'Received $127 return from Maria Santos loan repayment',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      icon: 'TrendingUp',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b'
    },
    {
      id: 2,
      type: 'loan_funded',
      title: 'Loan Investment Made',
      description: 'Invested $500 in Ahmed Hassan\'s business expansion loan',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      icon: 'HandCoins',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      txHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c'
    },
    {
      id: 3,
      type: 'portfolio_milestone',
      title: 'Portfolio Milestone',
      description: 'Your total investments have reached $12,750 USDC',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: 'Target',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'loan_completed',
      title: 'Loan Fully Repaid',
      description: 'Sarah Johnson has completed her loan with 12.5% return',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      icon: 'CheckCircle2',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  const activities = userRole === 'borrower' ? borrowerActivities : lenderActivities;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const openBlockchainExplorer = (txHash) => {
    if (txHash) {
      // Mock blockchain explorer URL
      window.open(`https://solscan.io/tx/${txHash}`, '_blank');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${activity.bgColor} flex-shrink-0`}>
              <Icon name={activity.icon} size={16} className={activity.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    {activity.txHash && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <button
                          onClick={() => openBlockchainExplorer(activity.txHash)}
                          className="text-xs text-primary hover:text-primary/80 transition-smooth flex items-center space-x-1"
                        >
                          <Icon name="ExternalLink" size={10} />
                          <span>View TX</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;