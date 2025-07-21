import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoanDetailsForm = ({ formData, onFormChange, errors }) => {
  const [interestRate, setInterestRate] = useState(12.5);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  const loanPurposeOptions = [
    { value: 'inventory', label: 'Inventory Purchase' },
    { value: 'equipment', label: 'Equipment & Machinery' },
    { value: 'expansion', label: 'Business Expansion' },
    { value: 'working-capital', label: 'Working Capital' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'technology', label: 'Technology Upgrade' },
    { value: 'other', label: 'Other Business Needs' }
  ];

  const termLengthOptions = [
    { value: '3', label: '3 months' },
    { value: '6', label: '6 months' },
    { value: '12', label: '12 months' },
    { value: '18', label: '18 months' },
    { value: '24', label: '24 months' }
  ];

  useEffect(() => {
    if (formData.amount && formData.termLength) {
      calculateRepaymentSchedule();
    }
  }, [formData.amount, formData.termLength, interestRate]);

  const calculateRepaymentSchedule = () => {
    const principal = parseFloat(formData.amount) || 0;
    const months = parseInt(formData.termLength) || 0;
    const monthlyRate = interestRate / 100 / 12;
    
    if (principal > 0 && months > 0) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
      
      const schedule = [];
      let remainingBalance = principal;
      
      for (let i = 1; i <= months; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        
        schedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance)
        });
      }
      
      setRepaymentSchedule(schedule);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const totalRepayment = repaymentSchedule.reduce((sum, payment) => sum + payment.payment, 0);
  const totalInterest = totalRepayment - (parseFloat(formData.amount) || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 border-2 border-primary rounded-xl shadow-lg animate-popIn">
          <Icon name="DollarSign" size={22} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Loan Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Loan Amount (USDC)"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => onFormChange('amount', e.target.value)}
          error={errors.amount}
          required
          min="100"
          max="50000"
          description="Minimum $100, Maximum $50,000"
        />

        <Select
          label="Loan Purpose"
          options={loanPurposeOptions}
          value={formData.purpose}
          onChange={(value) => onFormChange('purpose', value)}
          error={errors.purpose}
          required
          placeholder="Select loan purpose"
        />

        <Select
          label="Term Length"
          options={termLengthOptions}
          value={formData.termLength}
          onChange={(value) => onFormChange('termLength', value)}
          error={errors.termLength}
          required
          placeholder="Select repayment term"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Interest Rate</label>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">{interestRate}% APR</span>
            <span className="text-xs text-muted-foreground">Based on risk assessment</span>
          </div>
        </div>
      </div>

      {formData.amount && formData.termLength && (
        <div className="mt-8 p-6 bg-card/80 border border-primary rounded-2xl shadow-xl animate-fadeInUp">
          <h4 className="text-md font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Calculator" size={16} />
            <span>Repayment Preview</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Payment</p>
              <p className="text-lg font-bold text-primary">
                {repaymentSchedule.length > 0 ? formatCurrency(repaymentSchedule[0].payment) : '$0.00'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-warning/5 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Interest</p>
              <p className="text-lg font-bold text-warning">
                {formatCurrency(totalInterest)}
              </p>
            </div>
            
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Repayment</p>
              <p className="text-lg font-bold text-success">
                {formatCurrency(totalRepayment)}
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide p-2 bg-muted rounded">
              <span>Month</span>
              <span>Payment</span>
              <span>Interest</span>
              <span>Balance</span>
            </div>
            {repaymentSchedule.slice(0, 6).map((payment) => (
              <div key={payment.month} className="grid grid-cols-4 gap-2 text-sm p-2 hover:bg-muted/50 rounded">
                <span className="font-medium">{payment.month}</span>
                <span className="font-mono">{formatCurrency(payment.payment)}</span>
                <span className="font-mono text-warning">{formatCurrency(payment.interest)}</span>
                <span className="font-mono">{formatCurrency(payment.balance)}</span>
              </div>
            ))}
            {repaymentSchedule.length > 6 && (
              <div className="text-center py-2">
                <span className="text-xs text-muted-foreground">
                  ... and {repaymentSchedule.length - 6} more payments
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDetailsForm;