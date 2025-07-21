import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletConnectionModal = ({ isOpen, onClose, onWalletConnected }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  const wallets = [
    {
      id: 'phantom',
      name: 'Phantom',
      blockchain: 'Solana',
      icon: 'Zap',
      description: 'Fast & low-cost transactions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      available: true
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      blockchain: 'Ethereum',
      icon: 'Hexagon',
      description: 'Secure & established',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      available: true
    }
  ];

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setConnectionError('');
  };

  const handleConnect = async () => {
    if (!selectedWallet) return;

    setIsConnecting(true);
    setConnectionError('');

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful connection
      const mockWalletData = {
        address: selectedWallet.id === 'phantom' ?'DhiRocket123...xyz789' :'0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
        balance: '1,234.56',
        network: selectedWallet.blockchain.toLowerCase()
      };

      // Save to localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockWalletData.address);
      localStorage.setItem('walletBalance', mockWalletData.balance);
      localStorage.setItem('selectedNetwork', mockWalletData.network);
      localStorage.setItem('walletType', selectedWallet.id);

      onWalletConnected(mockWalletData);
      onClose();
    } catch (error) {
      setConnectionError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div className="bg-card/80 dark:bg-card/70 border border-border rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-2xl relative" style={{boxShadow: '0 8px 40px 0 rgba(0,0,0,0.35)'}}>
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{background: 'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(212,73,61,0.06) 100%)'}} />
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground mb-6">
            Choose your preferred wallet to connect to the DeFi Microfinance platform.
          </p>

          {/* Wallet Options */}
          <div className="space-y-3 mb-6">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet)}
                disabled={!wallet.available}
                className={`w-full flex items-center space-x-4 p-5 rounded-2xl border-2 transition-all duration-200 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-[1.03] focus:scale-[1.03] active:scale-100 border-border hover:border-accent/60 relative overflow-hidden group ${
                  selectedWallet?.id === wallet.id
                    ? 'border-accent bg-accent/10 dark:bg-accent/20 shadow-elevated'
                    : 'hover:bg-accent/10'
                } ${!wallet.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${wallet.bgColor} shadow-md`}>
                  <Icon name={wallet.icon} size={26} className={wallet.color} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground text-lg">{wallet.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{wallet.blockchain}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{wallet.description}</span>
                </div>
                {selectedWallet?.id === wallet.id && (
                  <span className="absolute top-2 right-2 bg-success w-4 h-4 rounded-full flex items-center justify-center shadow animate-popIn">
                    <Icon name="Check" size={12} className="text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Connection Error */}
          {connectionError && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <span className="text-sm text-destructive">{connectionError}</span>
              </div>
            </div>
          )}

          {/* Connect Button */}
          <Button
            variant="default"
            size="lg"
            onClick={handleConnect}
            disabled={!selectedWallet || isConnecting}
            loading={isConnecting}
            iconName="Wallet"
            iconPosition="left"
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Security Notice</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We never store your private keys. Your wallet connection is secure and 
                  you maintain full control of your funds at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionModal;