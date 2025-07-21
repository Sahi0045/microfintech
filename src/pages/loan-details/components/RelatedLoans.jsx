import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedLoans = ({ loans }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'funded':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="TrendingUp" size={20} />
        <span>Similar Opportunities</span>
      </h3>
      
      <div className="space-y-4">
        {loans.map((loan) => (
          <Link
            key={loan.id}
            to={`/loan-details?id=${loan.id}`}
            className="block p-4 bg-muted/20 rounded-lg border border-border hover:border-primary/20 hover:bg-primary/5 transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <Image
                src={loan.borrower.avatar}
                alt={loan.borrower.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{loan.title}</h4>
                    <p className="text-xs text-muted-foreground">{loan.borrower.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground text-sm">
                      ${loan.amount.toLocaleString()}
                    </div>
                    <div className={`text-xs ${getStatusColor(loan.status)}`}>
                      {loan.fundingProgress}% funded
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Percent" size={10} />
                      <span>{loan.interestRate}% APR</span>
                    </span>
                    <span className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Calendar" size={10} />
                      <span>{loan.term}mo</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={10} className="text-warning" />
                    <span className="text-muted-foreground">{loan.borrower.rating}</span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${loan.fundingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="pt-2 border-t border-border">
        <Link
          to="/marketplace"
          className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          <span>View All Opportunities</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RelatedLoans;