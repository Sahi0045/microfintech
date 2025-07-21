import React from 'react';
import Icon from '../../../components/AppIcon';


const LoanPreviewPanel = ({ formData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const calculateLoanMetrics = () => {
    const principal = parseFloat(formData.amount) || 0;
    const months = parseInt(formData.termLength) || 0;
    const interestRate = 12.5; // Mock interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    if (principal > 0 && months > 0) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
      const totalRepayment = monthlyPayment * months;
      const totalInterest = totalRepayment - principal;
      
      return {
        monthlyPayment,
        totalRepayment,
        totalInterest,
        interestRate
      };
    }
    
    return {
      monthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
      interestRate: 0
    };
  };

  const metrics = calculateLoanMetrics();
  
  const getRiskLevel = () => {
    const amount = parseFloat(formData.amount) || 0;
    const revenue = parseFloat(formData.monthlyRevenue) || 0;
    const years = parseFloat(formData.yearsInBusiness) || 0;
    
    if (amount > revenue * 3 || years < 1) return { level: 'High', color: 'text-destructive', bg: 'bg-destructive/10' };
    if (amount > revenue * 1.5 || years < 2) return { level: 'Medium', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'Low', color: 'text-success', bg: 'bg-success/10' };
  };

  const risk = getRiskLevel();
  
  const getCompletionPercentage = () => {
    const requiredFields = [
      'amount', 'purpose', 'termLength', 'businessName', 'businessType', 
      'industry', 'employeeCount', 'yearsInBusiness', 'monthlyRevenue', 
      'businessDescription'
    ];
    
    const completedFields = requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ).length;
    
    const documentsScore = (formData.documents && formData.documents.length > 0) ? 1 : 0;
    const totalFields = requiredFields.length + 1;
    
    return Math.round(((completedFields + documentsScore) / totalFields) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="space-y-6">
      {/* Completion Status */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-semibold text-foreground">Application Progress</h3>
          <span className="text-sm font-medium text-primary">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Complete all sections to submit your loan request
        </p>
      </div>

      {/* Loan Summary */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="text-md font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="DollarSign" size={16} />
          <span>Loan Summary</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Requested Amount</span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(formData.amount)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Term Length</span>
            <span className="text-sm font-medium text-foreground">
              {formData.termLength ? `${formData.termLength} months` : 'Not selected'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Interest Rate</span>
            <span className="text-sm font-medium text-foreground">
              {metrics.interestRate}% APR
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Monthly Payment</span>
            <span className="text-sm font-medium text-primary">
              {formatCurrency(metrics.monthlyPayment)}
            </span>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-sm font-medium text-foreground">Total Repayment</span>
            <span className="text-sm font-bold text-foreground">
              {formatCurrency(metrics.totalRepayment)}
            </span>
          </div>
        </div>
      </div>

      {/* Business Overview */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="text-md font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Building2" size={16} />
          <span>Business Overview</span>
        </h3>
        
        <div className="space-y-3">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Business Name</span>
            <p className="text-sm font-medium text-foreground">
              {formData.businessName || 'Not provided'}
            </p>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Industry</span>
            <p className="text-sm font-medium text-foreground">
              {formData.industry || 'Not selected'}
            </p>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Revenue</span>
            <p className="text-sm font-medium text-foreground">
              {formatCurrency(formData.monthlyRevenue)}
            </p>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Years in Business</span>
            <p className="text-sm font-medium text-foreground">
              {formData.yearsInBusiness || 'Not provided'} years
            </p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="text-md font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span>Risk Assessment</span>
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risk Level</span>
          <div className={`px-3 py-1 rounded-full ${risk.bg}`}>
            <span className={`text-sm font-medium ${risk.color}`}>
              {risk.level}
            </span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Based on loan amount, business revenue, and experience
        </div>
      </div>

      {/* Documents Status */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="text-md font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={16} />
          <span>Documents</span>
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Uploaded Files</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">
              {formData.documents ? formData.documents.length : 0}
            </span>
            {formData.documents && formData.documents.length > 0 && (
              <Icon name="CheckCircle" size={16} className="text-success" />
            )}
          </div>
        </div>
        
        {formData.documents && formData.documents.length > 0 && (
          <div className="mt-3 space-y-1">
            {formData.documents.slice(0, 3).map((doc, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                <Icon name="File" size={12} />
                <span className="truncate">{doc.name}</span>
              </div>
            ))}
            {formData.documents.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{formData.documents.length - 3} more files
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lender View Preview */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="text-md font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Eye" size={16} />
          <span>How Lenders See This</span>
        </h3>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Loan purpose: {formData.purpose || 'Not specified'}</p>
          <p>• Business type: {formData.businessType || 'Not specified'}</p>
          <p>• Risk level: {risk.level}</p>
          <p>• Documentation: {formData.documents ? 'Complete' : 'Incomplete'}</p>
        </div>
      </div>
    </div>
  );
};

export default LoanPreviewPanel;