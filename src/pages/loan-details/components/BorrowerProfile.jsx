import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BorrowerProfile = ({ borrower }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="User" size={20} />
        <span>Borrower Profile</span>
      </h3>
      
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={borrower.avatar}
            alt={borrower.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {borrower.didVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="Shield" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-foreground">{borrower.name}</h4>
            {borrower.didVerified && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">
                <Icon name="Shield" size={10} />
                <span>DID Verified</span>
              </span>
            )}
          </div>
          
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} />
              <span>{borrower.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>Member since {borrower.memberSince}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={14} />
              <span>{borrower.businessType}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{borrower.totalLoans}</div>
          <div className="text-xs text-muted-foreground">Total Loans</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">{borrower.repaymentRate}%</div>
          <div className="text-xs text-muted-foreground">Repayment Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{borrower.creditScore}</div>
          <div className="text-xs text-muted-foreground">Credit Score</div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfile;