import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const StickyActionBar = ({ onFundLoan, onBookmark, isBookmarked, loanAmount, fundingProgress }) => {
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  const handleBookmark = async () => {
    setIsBookmarkLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onBookmark();
      setIsBookmarkLoading(false);
    }, 500);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated lg:hidden">
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Loan Amount</div>
          <div className="font-semibold text-foreground">
            ${loanAmount.toLocaleString()}
          </div>
          <div className="text-xs text-primary">
            {fundingProgress}% funded
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBookmark}
            loading={isBookmarkLoading}
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            className="px-3"
          />
          
          <Button
            variant="default"
            onClick={onFundLoan}
            iconName="DollarSign"
            iconPosition="left"
          >
            Fund Loan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyActionBar;