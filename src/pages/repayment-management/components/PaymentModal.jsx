import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentModal = ({ isOpen, onClose, payment, walletBalance, onConfirmPayment }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(null);
  const [step, setStep] = useState('review'); // review, processing, success, error

  const networks = [
    {
      id: 'solana',
      name: 'Solana',
      icon: 'Zap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      gasToken: 'SOL',
      estimatedGas: 0.0001,
      processingTime: '1-2 seconds'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: 'Hexagon',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      gasToken: 'ETH',
      estimatedGas: 0.002,
      processingTime: '2-5 minutes'
    }
  ];

  const selectedNetworkData = networks.find(n => n.id === selectedNetwork);

  useEffect(() => {
    if (isOpen && payment) {
      // Simulate gas estimation
      const timer = setTimeout(() => {
        setGasEstimate(selectedNetworkData.estimatedGas);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, payment, selectedNetwork, selectedNetworkData]);

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Call the parent's payment handler
      await onConfirmPayment({
        ...payment,
        network: selectedNetwork,
        gasUsed: gasEstimate,
        timestamp: new Date().toISOString()
      });
      
      setStep('success');
    } catch (error) {
      console.error('Payment failed:', error);
      setStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep('review');
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen || !payment) return null;

  const totalAmount = payment.amount + (gasEstimate || 0);
  const hasInsufficientBalance = walletBalance < totalAmount;
  const isOverdue = payment.status === 'overdue';
  const lateFee = isOverdue ? payment.amount * 0.05 : 0; // 5% late fee
  const finalAmount = payment.amount + lateFee;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {step === 'review' && 'Confirm Payment'}
            {step === 'processing' && 'Processing Payment'}
            {step === 'success' && 'Payment Successful'}
            {step === 'error' && 'Payment Failed'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded-md transition-smooth"
            disabled={isProcessing}
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {step === 'review' && (
            <>
              {/* Payment Details */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment</span>
                  <span className="font-medium text-foreground">#{payment.installment}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Due Date</span>
                  <span className="font-medium text-foreground">{payment.dueDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Principal</span>
                  <span className="font-mono text-foreground">${payment.principal.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interest</span>
                  <span className="font-mono text-foreground">${payment.interest.toLocaleString()}</span>
                </div>
                
                {isOverdue && (
                  <div className="flex items-center justify-between text-error">
                    <span className="text-sm">Late Fee (5%)</span>
                    <span className="font-mono">${lateFee.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total Amount</span>
                    <span className="font-mono font-bold text-foreground text-lg">${finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Network
                </label>
                <div className="space-y-2">
                  {networks.map(network => (
                    <button
                      key={network.id}
                      onClick={() => setSelectedNetwork(network.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                        selectedNetwork === network.id
                          ? 'border-primary bg-primary/10' :'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded ${network.bgColor}`}>
                          <Icon name={network.icon} size={16} className={network.color} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-foreground">{network.name}</div>
                          <div className="text-xs text-muted-foreground">{network.processingTime}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-foreground">~{network.estimatedGas} {network.gasToken}</div>
                        <div className="text-xs text-muted-foreground">Gas fee</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Balance Check */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Wallet Balance</span>
                  <span className="font-mono text-foreground">${walletBalance.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Payment + Gas</span>
                  <span className="font-mono text-foreground">${totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className={`font-mono ${hasInsufficientBalance ? 'text-error' : 'text-success'}`}>
                    ${(walletBalance - totalAmount).toLocaleString()}
                  </span>
                </div>
                
                {hasInsufficientBalance && (
                  <div className="mt-3 flex items-center space-x-2 text-error">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="text-sm">Insufficient balance for this transaction</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={hasInsufficientBalance}
                  iconName="CreditCard"
                  iconPosition="left"
                  fullWidth
                >
                  Confirm Payment
                </Button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Processing Payment</h3>
              <p className="text-muted-foreground mb-4">
                Please confirm the transaction in your wallet and wait for blockchain confirmation.
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground capitalize">{selectedNetwork}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="text-foreground">{selectedNetworkData.processingTime}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Your payment has been processed successfully and recorded on the blockchain.
              </p>
              <Button
                onClick={handleClose}
                iconName="Check"
                iconPosition="left"
                fullWidth
              >
                Done
              </Button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="XCircle" size={32} className="text-error" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Payment Failed</h3>
              <p className="text-muted-foreground mb-4">
                The payment could not be processed. Please check your wallet balance and try again.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep('review')}
                  iconName="RotateCcw"
                  iconPosition="left"
                  fullWidth
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;