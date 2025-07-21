import React from 'react';

const FundingProgressBar = ({ currentAmount, targetAmount, fundingProgress }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Funding Progress</span>
        <span className="font-medium text-foreground">{fundingProgress}% Complete</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${Math.min(fundingProgress, 100)}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          ${currentAmount.toLocaleString()}
        </span>
        <span className="text-muted-foreground">
          of ${targetAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default FundingProgressBar;