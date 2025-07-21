import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const WalletStatusIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check for existing wallet connection
    const savedWallet = localStorage.getItem('walletConnected');
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    
    if (savedWallet === 'true' && savedAddress) {
      setIsConnected(true);
      setWalletAddress(savedAddress);
      setBalance(savedBalance || '0.00');
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4';
      const mockBalance = '1,234.56';
      
      setIsConnected(true);
      setWalletAddress(mockAddress);
      setBalance(mockBalance);
      
      // Save to localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletBalance', mockBalance);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0.00');
    setShowDropdown(false);
    
    // Clear localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    // Could add toast notification here
  };

  if (!isConnected) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={connectWallet}
        loading={isConnecting}
        iconName="Wallet"
        iconPosition="left"
        className="hidden sm:flex"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20 hover:bg-success/20 transition-smooth"
      >
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs font-mono">{formatAddress(walletAddress)}</span>
          <span className="text-xs font-medium">${balance}</span>
        </div>
        <Icon name="ChevronDown" size={14} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-popover-foreground">Wallet Connected</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">Active</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Address</span>
                <button
                  onClick={copyAddress}
                  className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-smooth"
                >
                  <span className="font-mono">{formatAddress(walletAddress)}</span>
                  <Icon name="Copy" size={12} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Balance</span>
                <span className="text-sm font-medium font-mono">${balance}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                iconName="LogOut"
                iconPosition="left"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Disconnect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletStatusIndicator;