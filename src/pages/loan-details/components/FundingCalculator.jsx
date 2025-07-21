import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FundingCalculator = ({ loanAmount, interestRate, term, onFundingSubmit }) => {
  const [fundingAmount, setFundingAmount] = useState('');
  const [calculatedReturns, setCalculatedReturns] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (fundingAmount && parseFloat(fundingAmount) > 0) {
      calculateReturns();
    } else {
      setCalculatedReturns(null);
    }
  }, [fundingAmount, interestRate, term]);

  const calculateReturns = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const amount = parseFloat(fundingAmount);
      const monthlyRate = interestRate / 100 / 12;
      const totalInterest = amount * (interestRate / 100) * (term / 12);
      const totalReturn = amount + totalInterest;
      const monthlyReturn = totalReturn / term;
      
      setCalculatedReturns({
        principal: amount,
        totalInterest,
        totalReturn,
        monthlyReturn,
        roi: (totalInterest / amount) * 100
      });
      setIsCalculating(false);
    }, 500);
  };

  const handleFundingSubmit = () => {
    if (calculatedReturns && onFundingSubmit) {
      onFundingSubmit({
        amount: calculatedReturns.principal,
        expectedReturn: calculatedReturns.totalReturn
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="Calculator" size={20} />
        <span>Funding Calculator</span>
      </h3>
      
      <div className="space-y-4">
        <Input
          label="Funding Amount (USDC)"
          type="number"
          placeholder="Enter amount to fund"
          value={fundingAmount}
          onChange={(e) => setFundingAmount(e.target.value)}
          description={`Maximum: $${loanAmount.toLocaleString()}`}
        />
        
        {isCalculating && (
          <div className="flex items-center justify-center py-4">
            <Icon name="Loader2" size={20} className="animate-spin text-primary" />
          </div>
        )}
        
        {calculatedReturns && !isCalculating && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground">Expected Returns</h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Principal</div>
                <div className="font-medium text-foreground">
                  ${calculatedReturns.principal.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Interest</div>
                <div className="font-medium text-success">
                  ${calculatedReturns.totalInterest.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Return</div>
                <div className="font-medium text-primary">
                  ${calculatedReturns.totalReturn.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Monthly Payment</div>
                <div className="font-medium text-foreground">
                  ${calculatedReturns.monthlyReturn.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ROI</span>
                <span className="font-medium text-success">
                  {calculatedReturns.roi.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button
            variant="default"
            fullWidth
            onClick={handleFundingSubmit}
            disabled={!calculatedReturns}
            iconName="DollarSign"
            iconPosition="left"
          >
            Fund This Loan
          </Button>
          
          <div className="text-xs text-muted-foreground text-center">
            Gas fees: ~$2.50 • Network: Solana
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingCalculator;