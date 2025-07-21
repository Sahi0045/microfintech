import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartContractPanel = ({ formData, onSubmit, isSubmitting }) => {
  const [gasEstimate, setGasEstimate] = useState(null);
  const [networkFee, setNetworkFee] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Check wallet connection status
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      setWalletConnected(connected);
    };

    checkWalletConnection();
    
    // Listen for wallet connection changes
    const handleStorageChange = () => {
      checkWalletConnection();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // Listen for network changes
    const handleNetworkChange = (event) => {
      setSelectedNetwork(event.detail.network);
      calculateGasFees(event.detail.network);
    };

    window.addEventListener('networkChanged', handleNetworkChange);
    
    // Get initial network
    const savedNetwork = localStorage.getItem('selectedNetwork') || 'solana';
    setSelectedNetwork(savedNetwork);
    calculateGasFees(savedNetwork);

    return () => window.removeEventListener('networkChanged', handleNetworkChange);
  }, [formData]);

  const calculateGasFees = async (network) => {
    // Simulate gas estimation based on network
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (network === 'solana') {
      setGasEstimate('~0.00025 SOL');
      setNetworkFee('$0.01');
    } else {
      setGasEstimate('~0.0045 ETH');
      setNetworkFee('$12.50');
    }
  };

  const getContractActions = () => {
    return [
      {
        step: 1,
        action: 'Create Loan Request',
        description: 'Deploy loan request to smart contract',
        gasUsage: selectedNetwork === 'solana' ? '~5,000 compute units' : '~45,000 gas'
      },
      {
        step: 2,
        action: 'Upload Metadata',
        description: 'Store loan details on IPFS/Arweave',
        gasUsage: selectedNetwork === 'solana' ? '~2,000 compute units' : '~21,000 gas'
      },
      {
        step: 3,
        action: 'Set Loan Terms',
        description: 'Configure repayment schedule and interest',
        gasUsage: selectedNetwork === 'solana' ? '~3,000 compute units' : '~32,000 gas'
      }
    ];
  };

  const getNetworkInfo = () => {
    if (selectedNetwork === 'solana') {
      return {
        name: 'Solana',
        icon: 'Zap',
        color: 'text-purple-600',
        benefits: ['Ultra-low fees', 'Fast confirmation', 'High throughput'],
        contractAddress: 'DeFi1oan2Micro3Finance4Program5Address6789'
      };
    } else {
      return {
        name: 'Ethereum',
        icon: 'Hexagon',
        color: 'text-blue-600',
        benefits: ['Established ecosystem', 'High security', 'Wide adoption'],
        contractAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4'
      };
    }
  };

  const networkInfo = getNetworkInfo();
  const contractActions = getContractActions();

  const handleContractSubmission = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!isFormValid()) {
      alert('Please complete all required fields before submitting');
      return;
    }

    onSubmit();
  };

  const isFormValid = () => {
    const requiredFields = [
      'amount', 'purpose', 'termLength', 'businessName', 'businessType',
      'industry', 'employeeCount', 'yearsInBusiness', 'monthlyRevenue',
      'businessDescription'
    ];

    return requiredFields.every(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ) && formData.documents && formData.documents.length > 0;
  };

  return (
    <div className="space-y-6 bg-card/80 border border-primary rounded-2xl shadow-xl p-8 animate-fadeInUp">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 border-2 border-success rounded-xl shadow-lg animate-popIn">
          <Icon name="Zap" size={22} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Smart Contract Deployment</h3>
      </div>

      {/* Network Information */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name={networkInfo.icon} size={16} className={networkInfo.color} />
            <span>{networkInfo.name} Network</span>
          </h4>
          
          {walletConnected ? (
            <div className="flex items-center space-x-2 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-warning">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm font-medium">Not Connected</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {networkInfo.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="text-success" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Contract Address:</span>
          <span className="font-mono ml-1">{networkInfo.contractAddress}</span>
        </div>
      </div>

      {/* Gas Fee Estimation */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Fuel" size={16} />
          <span>Transaction Fees</span>
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimated Gas</span>
            <span className="text-sm font-medium text-foreground font-mono">
              {gasEstimate || 'Calculating...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network Fee</span>
            <span className="text-sm font-medium text-foreground">
              {networkFee || 'Calculating...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm font-medium text-foreground">Total Cost</span>
            <span className="text-sm font-bold text-primary">
              {networkFee || 'Calculating...'}
            </span>
          </div>
        </div>

        <div className="mt-3 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            Fees may vary based on network congestion. Final amount will be confirmed in your wallet.
          </p>
        </div>
      </div>

      {/* Contract Actions */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="List" size={16} />
          <span>Deployment Steps</span>
        </h4>

        <div className="space-y-3">
          {contractActions.map((action) => (
            <div key={action.step} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {action.step}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{action.action}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
                <p className="text-xs text-muted-foreground font-mono">{action.gasUsage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Information */}
      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Security & Transparency</span>
        </h4>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Smart contract audited and verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>All transactions recorded on blockchain</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Documents stored on decentralized storage</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Automated repayment enforcement</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-4">
        {!walletConnected && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-warning flex items-center space-x-2">
              <Icon name="AlertTriangle" size={14} />
              <span>Please connect your wallet to submit the loan request</span>
            </p>
          </div>
        )}

        {!isFormValid() && walletConnected && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive flex items-center space-x-2">
              <Icon name="AlertCircle" size={14} />
              <span>Please complete all required fields and upload documents</span>
            </p>
          </div>
        )}

        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleContractSubmission}
          loading={isSubmitting}
          disabled={!walletConnected || !isFormValid()}
          iconName="Send"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          {isSubmitting ? 'Deploying to Blockchain...' : 'Submit Loan Request'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree to the platform terms and smart contract conditions
        </p>
      </div>
    </div>
  );
};

export default SmartContractPanel;